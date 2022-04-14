import { Controller, Get, Query } from "@nestjs/common"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { Pack } from "@prisma/client"
import { EmptyDto } from "src/dto/empty.dto"
import { PackTreeEntity } from "src/entities/pack-tree.entity"
import { PackEntity } from "src/entities/pack.entity"
import { TreeifySerializer } from "src/lib/serializers/treeify.serializer"
import { FindManyPacksService } from "src/services/packs/find-many-packs.service"

@ApiTags("Packs")
@Controller("packs")
export class PacksController {
  constructor(
    private readonly findManyPacksService: FindManyPacksService,
    private readonly treeifySerializer: TreeifySerializer<Pack>,
  ) {}

  @Get()
  @ApiOkResponse({ type: PackTreeEntity, isArray: true })
  public async index(@Query() _?: EmptyDto): Promise<PackEntity[]> {
    const packs = await this.findManyPacksService.execute()
    const packsTree = this.treeifySerializer.execute(packs)
    return packsTree.map(pack => new PackTreeEntity(pack))
  }
}
