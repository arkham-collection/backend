/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from "@nestjs/common"
import { Card, Prisma } from "@prisma/client"
import { DatabaseService } from "src/lib/database"
import pipe from "src/utils/pipe"

type QueryObject = Prisma.CardFindManyArgs
type Data = {
  name?: string
  traits?: string[]
  packIds?: string[]
  typeNames?: string[]
  factionNames?: string[]
  encounterNames?: string[]
  sort?: Array<{
    field: string
    value: "asc" | "desc"
  }>
  pagination?: {
    limit: number
    page: number
  }
}
@Injectable()
export class FindManyCardsService {
  constructor(private readonly db: DatabaseService) {}

  public async execute(data: Data = {}): Promise<Card[]> {
    const queryObject: QueryObject = pipe<Data, QueryObject>(data, {})
      .yieldSelf(this.traitsClause)
      .yieldSelf(this.nameClause)
      .yieldSelf(this.packIdsClause)
      .yieldSelf(this.typeNamesClause)
      .yieldSelf(this.factionNamesClause)
      .yieldSelf(this.encounterNamesClause)
      .yieldSelf(this.sortClause)
      .yieldSelf(this.paginationClause).value

    return await this.db.card.findMany(queryObject)
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

  private paginationClause(data: Data, queryObject: QueryObject): QueryObject {
    if (!data.pagination) return queryObject
    return {
      ...queryObject,
      take: data.pagination.limit,
      skip: data.pagination.limit * data.pagination.page,
    }
  }

  private sortClause(data: Data, queryObject: QueryObject): QueryObject {
    if (!data.sort) return queryObject
    const orderBy = data.sort.map(({ field, value }) => ({ [field]: value }))
    return { ...queryObject, orderBy }
  }
}
