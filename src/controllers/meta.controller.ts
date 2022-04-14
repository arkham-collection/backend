import { Controller, Get, Query } from "@nestjs/common"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { Prisma } from "@prisma/client"
import { EmptyDto } from "src/dto/empty.dto"
import { DatabaseService } from "src/lib/database"
import { FindManyTraitsService } from "src/services/traits/find-many-traits.service"

@ApiTags("Meta")
@Controller()
export class MetaController {
  constructor(
    private readonly findManyTraitsService: FindManyTraitsService,
    private readonly db: DatabaseService,
  ) {}

  @Get("traits")
  @ApiOkResponse({ type: String, isArray: true })
  public async getTraits(@Query() _?: EmptyDto): Promise<string[]> {
    return await this.findManyTraitsService.execute()
  }

  @Get("card_names")
  @ApiOkResponse({ type: String, isArray: true })
  public async getCardNames(@Query() _?: EmptyDto): Promise<string[]> {
    const [result] = await this.db.$queryRaw<
      Array<{ names: string[] }>
    >(Prisma.sql`
      WITH names AS (
        SELECT DISTINCT name
        FROM cards
        ORDER BY name
      )
      SELECT ARRAY_AGG(name) AS names
      FROM names
    `)

    return result.names
  }

  @Get("faction_names")
  @ApiOkResponse({ type: String, isArray: true })
  public async getFactionNames(@Query() _?: EmptyDto): Promise<string[]> {
    const [result] = await this.db.$queryRaw<
      Array<{ factionNames: string[] }>
    >(Prisma.sql`
      WITH faction_names AS (
        SELECT DISTINCT faction_name
        FROM cards
        ORDER BY faction_name
      )
      SELECT ARRAY_AGG(faction_name) AS "factionNames"
      FROM faction_names
    `)

    return result.factionNames
  }

  @Get("encounter_names")
  @ApiOkResponse({ type: String, isArray: true })
  public async getEncounterNames(@Query() _?: EmptyDto): Promise<string[]> {
    const [result] = await this.db.$queryRaw<
      Array<{ encouterNames: string[] }>
    >(Prisma.sql`
      WITH encounter_names AS (
        SELECT DISTINCT encounter_name
        FROM cards
        WHERE encounter_name IS NOT NULL
        ORDER BY encounter_name
      )
      SELECT ARRAY_AGG(encounter_name) AS "encouterNames"
      FROM encounter_names
    `)

    return result.encouterNames
  }

  @Get("type_names")
  @ApiOkResponse({ type: String, isArray: true })
  public async getTypeNames(@Query() _?: EmptyDto): Promise<string[]> {
    const [result] = await this.db.$queryRaw<
      Array<{ typeNames: string[] }>
    >(Prisma.sql`
      WITH type_names AS (
        SELECT DISTINCT type_name
        FROM cards
        ORDER BY type_name
      )
      SELECT ARRAY_AGG(type_name) AS "typeNames"
      FROM type_names
    `)

    return result.typeNames
  }
}
