import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { CardsController } from "./controllers/cards.controller"
import { MetaController } from "./controllers/meta.controller"
import { PacksController } from "./controllers/packs.controller"
import { DatabaseModule } from "./lib/database"
import DotenvModule from "./lib/dotenv/dotenv.module"
import { SerializersModule } from "./lib/serializers/serializers.module"
import { CountCardsService } from "./services/cards/count-cards.service"
import { FindManyCardsService } from "./services/cards/find-many-cards.service"
import { FindManyPacksService } from "./services/packs/find-many-packs.service"
import { FindManyTraitsService } from "./services/traits/find-many-traits.service"

@Module({
  imports: [DatabaseModule, DotenvModule, SerializersModule],
  controllers: [CardsController, PacksController, MetaController],
  providers: [
    FindManyCardsService,
    FindManyPacksService,
    FindManyTraitsService,
    CountCardsService,
  ],
})
export class AppModule {
  public static apiTitle: string
  public static apiDescription: string
  public static apiVersion: string

  constructor(readonly configService: ConfigService) {
    AppModule.apiVersion = configService.get<string>("API_VERSION") as string
    AppModule.apiTitle = configService.get<string>("API_TITLE") as string
    AppModule.apiDescription = configService.get<string>(
      "API_DESCRIPTION",
    ) as string
  }
}
