import { Provider } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "src/app.module"

export default async function bootstrapTestModule(
  providers: Provider[] = [],
): Promise<TestingModule> {
  return await Test.createTestingModule({
    imports: [AppModule],
    providers,
  }).compile()
}
