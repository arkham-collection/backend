import { TestingModule } from "@nestjs/testing"
import { FindManyTraitsService } from "src/services/traits/find-many-traits.service"
import bootstrapTestModule from "src/utils/bootstrapTestModule"
import { MetaController } from "../meta.controller"

describe("MetaController", () => {
  let module: TestingModule
  let controller: MetaController

  beforeEach(async () => {
    module = await bootstrapTestModule()
    controller = await module.resolve(MetaController)
  })

  describe("#getTraits", () => {
    it("calls FindManyCardsService", async () => {
      const findManyTraitsService = await module.resolve(FindManyTraitsService)
      jest.spyOn(findManyTraitsService, "execute")
      await controller.getTraits()
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(findManyTraitsService.execute).toBeCalledTimes(1)
    })
  })
})
