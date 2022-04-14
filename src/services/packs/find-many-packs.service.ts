import { Injectable } from "@nestjs/common"
import { Pack } from "@prisma/client"
import { DatabaseService } from "src/lib/database"

@Injectable()
export class FindManyPacksService {
  constructor(private readonly db: DatabaseService) {}

  public async execute(): Promise<Pack[]> {
    return await this.db.pack.findMany({
      orderBy: [{ cyclePosition: "asc" }, { position: "asc" }]
    })
  }
}
