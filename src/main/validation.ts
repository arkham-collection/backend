import { INestApplication, ValidationPipe } from "@nestjs/common"

export default function validation(app: INestApplication): void {
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    disableErrorMessages: false,
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
}
