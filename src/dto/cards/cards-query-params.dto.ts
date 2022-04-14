import { ApiProperty } from "@nestjs/swagger"
import { Transform, Type } from "class-transformer"
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator"
import deserializeSortParams from "src/utils/deserializeSortParams"
import { PaginationParamsDto } from "./pagination-params.dto"
import { SortParamsDto } from "./sort-params.dto"

export class CardsQueryParamsDto {
  @ApiProperty({ type: String, example: "Pickpocketing", required: false })
  @IsString()
  @IsOptional()
  public name: string

  @ApiProperty({
    type: [String],
    required: false,
    example: ["Ally", "Creature"],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public traits: string[]

  @ApiProperty({ type: [String], required: false, example: ["core", "dwl"] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public packIds: string[]

  @ApiProperty({
    type: [String],
    required: false,
    example: ["Guardian", "Seeker"],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public factionNames: string[]

  @ApiProperty({
    type: [String],
    required: false,
    example: ["The Devourer Below"],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public encounterNames: string[]

  @ApiProperty({
    type: [String],
    required: false,
    example: ["Location", "Investigator"],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public typeNames: string[]

  @ApiProperty({ type: PaginationParamsDto, required: false })
  @ValidateNested()
  @IsOptional()
  @Type(() => PaginationParamsDto)
  public pagination: PaginationParamsDto

  @ApiProperty({ type: String, example: "name,-cost", required: false })
  @Type(() => SortParamsDto)
  @ValidateNested()
  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    if (!value) return
    return deserializeSortParams(value).map((sort) => new SortParamsDto(sort))
  })
  public sort: SortParamsDto[]
}
