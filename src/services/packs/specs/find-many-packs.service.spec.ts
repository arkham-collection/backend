import bootstrapTestModule from "src/utils/bootstrapTestModule"
import { FindManyPacksService } from "../find-many-packs.service"

describe("FindManyPacksService", () => {
  let findManyPacksService: FindManyPacksService

  beforeEach(async () => {
    const module = await bootstrapTestModule()
    findManyPacksService = await module.resolve(FindManyPacksService)
  })

  it("returns all cards", async () => {
    const packs = await findManyPacksService.execute()
    expect(packs).toHaveLength(78)
  })
})
