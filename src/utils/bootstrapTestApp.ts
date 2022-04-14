import { INestApplication, Provider } from "@nestjs/common"
import database from "src/main/database"
import serialization from "src/main/serialization"
import validation from "src/main/validation"
import bootstrapTestModule from "./bootstrapTestModule"

export default async function bootstrapTestApp(providers: Provider[] = []): Promise<INestApplication> {
  const testModule = await bootstrapTestModule(providers)
  const app = testModule.createNestApplication()
  database(app)
  validation(app)
  serialization(app)
  return app
}
