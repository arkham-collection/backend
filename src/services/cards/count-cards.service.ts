/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { DatabaseService } from "src/lib/database"
import pipe from "src/utils/pipe"

type QueryObject = Prisma.CardCountArgs
type Data = {
  name?: string
  traits?: string[]
  packIds?: string[]
  typeNames?: string[]
  factionNames?: string[]
  encounterNames?: string[]
}
@Injectable()
export class CountCardsService {
  constructor(private readonly db: DatabaseService) {}

  public async execute(data: Data = {}): Promise<number> {
    const queryObject: QueryObject = pipe<Data, QueryObject>(data, {})
      .yieldSelf(this.nameClause)
      .yieldSelf(this.traitsClause)
      .yieldSelf(this.packIdsClause)
      .yieldSelf(this.typeNamesClause)
      .yieldSelf(this.factionNamesClause)
      .yieldSelf(this.encounterNamesClause).value

    return await this.db.card.count(queryObject)
  }

  private traitsClause(data: Data, queryObject: QueryObject): QueryObject {
    if (!data.traits) return queryObject
    return {
      ...queryObject,
      where: {
        ...queryObject.where,
        traits: { hasEvery: data.traits },
      },
    }
  }

  private nameClause(data: Data, queryObject: QueryObject): QueryObject {
    if (!data.name) return queryObject
    return {
      ...queryObject,
      where: {
        ...queryObject.where,
        name: { equals: data.name },
      },
    }
  }

  private packIdsClause(data: Data, queryObject: QueryObject): QueryObject {
    if (!data.packIds) return queryObject
    return {
      ...queryObject,
      where: {
        ...queryObject.where,
        packId: { in: data.packIds },
      },
    }
  }

  private typeNamesClause(data: Data, queryObject: QueryObject): QueryObject {
    if (!data.typeNames) return queryObject
    return {
      ...queryObject,
      where: {
        ...queryObject.where,
        typeName: { in: data.typeNames },
      },
    }
  }

  private factionNamesClause(
    data: Data,
    queryObject: QueryObject,
  ): QueryObject {
    if (!data.factionNames) return queryObject
    return {
      ...queryObject,
      where: {
        ...queryObject.where,
        factionName: { in: data.factionNames },
      },
    }
  }

  private encounterNamesClause(
    data: Data,
    queryObject: QueryObject,
  ): QueryObject {
    if (!data.encounterNames) return queryObject
    return {
      ...queryObject,
      where: {
        ...queryObject.where,
        encounterName: { in: data.encounterNames },
      },
    }
  }
}
