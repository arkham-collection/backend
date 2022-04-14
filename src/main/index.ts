import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import { join } from "path"
import { AppModule } from "src/app.module"
import database from "./database"
import serialization from "./serialization"
import swagger from "./swagger"
import validation from "./validation"

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  swagger(app)
  database(app)
  validation(app)
  serialization(app)

  app.useStaticAssets(join(__dirname, "../../assets"))
  app.enableCors()
  await app.listen(process.env.PORT ?? 4000)
}

void bootstrap()
