import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { SortParamsDto } from "../sort-params.dto"

function buildDto(data: Record<string, unknown> = {}): SortParamsDto {
  const generatedData = {
    field: "name",
    value: "asc",
  }
  return plainToInstance(SortParamsDto, { ...generatedData, ...data })
}
describe("SortParamsDto", () => {
  describe("#field", () => {
    it("is not empty", async () => {
      const dto = buildDto({ field: undefined })
      const [error] = await validate(dto)
      expect(error.property).toEqual("field")
      expect(error.constraints?.isNotEmpty).toBeDefined()
    })

    it("must be part of enum", async () => {
      const dto = buildDto({ field: "random" })
      const [error] = await validate(dto)
      expect(error.property).toEqual("field")
      expect(error.constraints?.isEnum).toBeDefined()
    })

    it.each([
      "name",
      "cost",
      "quantity",
      "factionName",
      "encounterName",
      "typeName",
      "position",
    ])("allows %s", async (field) => {
      const dto = buildDto({ field })
      const [error] = await validate(dto)
      expect(error).toBeUndefined()
    })
  })

  describe("#value", () => {
    it("is not empty", async () => {
      const dto = buildDto({ value: undefined })
      const [error] = await validate(dto)
      expect(error.property).toEqual("value")
      expect(error.constraints?.isNotEmpty).toBeDefined()
    })

    it("must be part of enum", async () => {
      const dto = buildDto({ value: "random" })
      const [error] = await validate(dto)
      expect(error.property).toEqual("value")
      expect(error.constraints?.isEnum).toBeDefined()
    })

    it.each(["asc", "desc"])("allows %s", async (value) => {
      const dto = buildDto({ value })
      const [error] = await validate(dto)
      expect(error).toBeUndefined()
    })
  })
})
