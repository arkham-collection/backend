import { ClassSerializerInterceptor, INestApplication } from "@nestjs/common"
import { Reflector } from "@nestjs/core"

export default function serialization(app: INestApplication): void {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
}
