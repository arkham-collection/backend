import { IsEnum, IsNotEmpty } from "class-validator"

export class SortParamsDto {
  @IsNotEmpty()
  @IsEnum([
    "name",
    "cost",
    "quantity",
    "factionName",
    "encounterName",
    "typeName",
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
