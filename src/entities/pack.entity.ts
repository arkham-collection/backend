import { ApiProperty } from "@nestjs/swagger"
import { Pack } from "@prisma/client"

export class PackEntity implements Pack {
  @ApiProperty({ example: "core" })
  public id: string

  @ApiProperty({ example: "dwl" })
  public parentId: string

  @ApiProperty({ example: "Core Set" })
  public name: string

  @ApiProperty({ example: 1 })
  public position: number

  @ApiProperty({ example: 1 })
  public cyclePosition: number

  @ApiProperty({ example: "2016-11-10" })
  public availableAt: Date | null

  @ApiProperty({ example: 184 })
  public known: number

  @ApiProperty({ example: 184 })
  public total: number

  constructor(pack: Pack) {
    Object.assign(this, pack)
  }
}
