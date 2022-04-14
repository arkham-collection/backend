import { TestingModule } from "@nestjs/testing"
import { FindManyPacksService } from "src/services/packs/find-many-packs.service"
import bootstrapTestModule from "src/utils/bootstrapTestModule"
import { PacksController } from "../packs.controller"

describe("PacksController", () => {
  let module: TestingModule
  let controller: PacksController

  beforeEach(async () => {
    module = await bootstrapTestModule()
    controller = await module.resolve(PacksController)
  })

  describe("#index", () => {
    it("calls FindManyCardsService", async () => {
      const findManyPacksService = await module.resolve(FindManyPacksService)
      jest.spyOn(findManyPacksService, "execute")
      await controller.index()
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(findManyPacksService.execute).toBeCalledTimes(1)
    })
  })
})
