import { TestingModule } from "@nestjs/testing"
import { CountCardsService } from "src/services/cards/count-cards.service"
import { FindManyCardsService } from "src/services/cards/find-many-cards.service"
import bootstrapTestModule from "src/utils/bootstrapTestModule"
import { CardsController } from "../cards.controller"

describe("CardsController", () => {
  let module: TestingModule
  let controller: CardsController

  beforeEach(async () => {
    module = await bootstrapTestModule()
    controller = await module.resolve(CardsController)
  })

  describe("#index", () => {
    it("calls FindManyCardsService", async () => {
      const findManyCardsService = await module.resolve(FindManyCardsService)
      jest.spyOn(findManyCardsService, "execute")
      await controller.index()
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(findManyCardsService.execute).toBeCalledTimes(1)
    })

    it("calls CountCardsService", async () => {
      const countCardsService = await module.resolve(CountCardsService)
      jest.spyOn(countCardsService, "execute")
      await controller.index()
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(countCardsService.execute).toBeCalledTimes(1)
    })
  })
})
