import { ApiProperty } from "@nestjs/swagger"
import { Card } from "@prisma/client"

export class CardEntity implements Card {
  @ApiProperty({ example: "01001" })
  public id: string

  @ApiProperty({ example: "core" })
  public packId: string

  @ApiProperty({ example: "Roland Banks" })
  public name: string

  @ApiProperty({ example: 0 })
  public cost: number | null

  @ApiProperty({ example: 1 })
  public quantity: number

  @ApiProperty({ example: ["Agency", "Detective"] })
  public traits: string[]

  @ApiProperty({ example: "Guardian" })
  public factionName: string

  @ApiProperty({ example: "The Gathering" })
  public encounterName: string | null

  @ApiProperty({ example: "Investigator" })
  public typeName: string

  @ApiProperty({ example: 1 })
  public position: number

  @ApiProperty({ example: true })
  public doubleSided: boolean

  @ApiProperty({ example: "/bundles/cards/01001.png" })
  public imageSrc: string | null

  @ApiProperty({ example: "/bundles/cards/01001b.png" })
  public backImageSrc: string | null

  constructor(card: Card) {
    Object.assign(this, card)
  }
}
