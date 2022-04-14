import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { CardEntity } from "./card.entity"

export class CardCollectionEntity {
  @ApiProperty({ type: CardEntity, isArray: true })
  @Type(() => CardEntity)
  public data: CardEntity[]

  @ApiProperty({ example: 367 })
  public totalRows: number

  constructor(data: CardCollectionEntity) {
    Object.assign(this, data)
  }
}
