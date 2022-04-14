import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { DatabaseService } from "src/lib/database"

const query = Prisma.sql`
WITH traits as (
  SELECT DISTINCT UNNEST(traits) AS name
  FROM cards
),

ordered_traits as (
  SELECT *
  FROM traits
  ORDER BY name
)

SELECT ARRAY_AGG(name) as array
FROM ordered_traits
`

@Injectable()
export class FindManyTraitsService {
  constructor(private readonly db: DatabaseService) {}

  public async execute(): Promise<string[]> {
    const [traits] = await this.db.$queryRaw<Array<{ array: string[] }>>(query)
    return traits.array
  }
}
