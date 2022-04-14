import { NestExpressApplication } from "@nestjs/platform-express"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { AppModule } from "src/app.module"

export default function openApi(app: NestExpressApplication): void {
  const config = new DocumentBuilder()
    .setTitle(AppModule.apiTitle)
    .setDescription(AppModule.apiDescription)
    .setVersion(AppModule.apiVersion)
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)
}
