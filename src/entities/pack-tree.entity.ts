import { ApiProperty } from "@nestjs/swagger"
import { PackEntity } from "./pack.entity"

export class PackTreeEntity extends PackEntity {
  @ApiProperty({ type: PackTreeEntity, isArray: true, example: [] })
  children: PackTreeEntity[]
}
