import faker from "@faker-js/faker"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class ParamsDto {
  @ApiProperty({ example: faker.datatype.uuid() })
  @IsNotEmpty()
  @IsUUID()
  public id: string
}
