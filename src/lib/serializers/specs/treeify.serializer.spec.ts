import { TreeifySerializer } from "../treeify.serializer"
import { Provider } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { SerializersModule } from "../serializers.module"

export default async function bootstrapSerializerTestModule(providers: Provider[] = []): Promise<TestingModule> {
  return await Test.createTestingModule({ imports: [SerializersModule], providers }).compile()
}

type Record = { id: string, parentId: string | null }
type TreeRecord = Record & { children: TreeRecord[] }
function find(id: string, treeRecords: TreeRecord[]): TreeRecord | undefined {
  return treeRecords.find(t => t.id === id)
}

describe("TreeifySerializer", () => {
  let treeifySerializer: TreeifySerializer<Record>

  beforeAll(async () => {
    const module = await bootstrapSerializerTestModule()
    treeifySerializer = await module.resolve(TreeifySerializer)
  })

  it("build tree structure", () => {
    const data: Record[] = [
      { id: "1", parentId: null },
      { id: "2", parentId: null },
      { id: "3", parentId: "1" },
      { id: "4", parentId: "1" },
      { id: "5", parentId: "4" },
      { id: "6", parentId: "2" },
    ]

    const result = treeifySerializer.execute(data)
    expect(result).toHaveLength(2) // 2 top level
    expect(find("1", result)?.children).toHaveLength(2)
    expect(find("2", result)?.children).toHaveLength(1)

    const parent1Children = find("1", result)?.children
    expect(find("4", parent1Children ?? [])?.children).toHaveLength(1)
  })
})
