import { IsEnum, IsNotEmpty } from "class-validator"

export class SortParamsDto {
  @IsNotEmpty()
  @IsEnum([
    "name",
    "cost",
    "xp",
    "quantity",
    "factionName",
    "encounterName",
    "typeName",
    "packId",
    "position",
  ])
  public field: string

  @IsNotEmpty()
  @IsEnum(["asc", "desc"])
  public value: "asc" | "desc"

  constructor(data: SortParamsDto) {
    Object.assign(this, data)
  }
}
