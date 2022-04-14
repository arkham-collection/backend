import { INestApplication } from "@nestjs/common"
import { DatabaseService } from "src/lib/database"
import { DatabaseInterceptor } from "src/lib/database/database.interceptor"

export default function database(app: INestApplication): void {
  app.get<DatabaseService>(DatabaseService).$enableShutdownHooks(app)
  app.useGlobalInterceptors(new DatabaseInterceptor)
}
