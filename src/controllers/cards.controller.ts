import { Controller, Get, Query } from "@nestjs/common"
import { ApiExtraModels, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger"
import { CardsQueryParamsDto } from "src/dto/cards/cards-query-params.dto"
import { CardCollectionEntity } from "src/entities/card-collection.entity"
import { CountCardsService } from "src/services/cards/count-cards.service"
import { FindManyCardsService } from "src/services/cards/find-many-cards.service"

@ApiTags("Cards")
@Controller("cards")
export class CardsController {
  constructor(
    private readonly findManyCardsService: FindManyCardsService,
    private readonly countCardsService: CountCardsService,
  ) {}

  @Get()
  @ApiOkResponse({ type: CardCollectionEntity })
  @ApiQuery({ type: CardsQueryParamsDto })
  @ApiExtraModels(CardsQueryParamsDto)
  async index(
    @Query() query?: CardsQueryParamsDto,
  ): Promise<CardCollectionEntity> {
    const data = await this.findManyCardsService.execute(query)
    const totalRows = await this.countCardsService.execute(query)
    return new CardCollectionEntity({ data, totalRows })
  }
}
