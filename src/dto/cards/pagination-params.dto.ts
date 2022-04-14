import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber } from "class-validator"

export class PaginationParamsDto {
  @ApiProperty({ type: String, example: "50" })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }: { value: string }) => value && Number(value))
  public limit: number

  @ApiProperty({ type: String, example: "4" })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }: { value: string }) => value && Number(value))
  public page: number
}
