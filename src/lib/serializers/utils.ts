import { Provider } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { SerializersModule } from "./serializers.module"

export default async function bootstrapSerializerTestModule(providers: Provider[] = []): Promise<TestingModule> {
  return await Test.createTestingModule({ imports: [SerializersModule], providers }).compile()
}
