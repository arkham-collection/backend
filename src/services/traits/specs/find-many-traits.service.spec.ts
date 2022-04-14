import bootstrapTestModule from "src/utils/bootstrapTestModule"
import { FindManyTraitsService } from "../find-many-traits.service"

describe("FindManyTraitsService", () => {
  let findManyTraitsService: FindManyTraitsService

  beforeEach(async () => {
    const module = await bootstrapTestModule()
    findManyTraitsService = await module.resolve(FindManyTraitsService)
  })

  it("returns array of strings", async () => {
    const traits = await findManyTraitsService.execute()
    expect(traits).toBeDefined()
    expect(typeof traits[0] === "string").toBeTruthy()
  })
})
