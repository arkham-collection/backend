import { INestApplication, Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

type TableNameSelect = {
  tablename: string
}

@Injectable()
export class DatabaseService extends PrismaClient {
  public $enableShutdownHooks(app: INestApplication): void {
    this.$on("beforeExit", (): void => void app.close())
  }

  public async $truncateAll(): Promise<void> {
    const tableNames = await this.$getTableNames()
    for (const { tablename } of tableNames) {
      if (tablename !== "_prisma_migrations") {
        try {
          await this.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`)
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          console.log({ error })
        }
      }
    }
  }

  public async $getTableNames(): Promise<TableNameSelect[]> {
    return await this.$queryRaw<TableNameSelect[]>`
      SELECT tablename FROM pg_tables WHERE schemaname='public'
    `
  }
}
