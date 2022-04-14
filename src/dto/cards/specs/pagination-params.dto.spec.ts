import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { PaginationParamsDto } from "../pagination-params.dto"

function buildDto(data: Record<string, unknown> = {}): PaginationParamsDto {
  const generatedData = {
    limit: "20",
    page: "2",
  }
  return plainToInstance(PaginationParamsDto, { ...generatedData, ...data })
}

describe("PaginationParamsDto", () => {
  describe("#limit", () => {
    it("transforms into a number", () => {
      const dto = buildDto({ limit: "30" })
      expect(dto.limit).toEqual(30)
    })

    it("is not empty", async () => {
      const dto = buildDto({ limit: null })
      const [error] = await validate(dto)
      expect(error.property).toEqual("limit")
      expect(error.constraints?.isNotEmpty).toBeDefined()
    })

    it("must be a number", async () => {
      const dto = buildDto()
      dto.limit = "20" as unknown as number
      const [error] = await validate(dto)
      expect(error.property).toEqual("limit")
      expect(error.constraints?.isNumber).toBeDefined()
    })
  })

  describe("page", () => {
    it("transforms into a number", () => {
      const dto = buildDto({ page: "30" })
      expect(dto.page).toEqual(30)
    })

    it("is not empty", async () => {
      const dto = buildDto({ page: null })
      const [error] = await validate(dto)
      expect(error.property).toEqual("page")
      expect(error.constraints?.isNotEmpty).toBeDefined()
    })

    it("must be a number", async () => {
      const dto = buildDto()
      dto.page = "20" as unknown as number
      const [error] = await validate(dto)
      expect(error.property).toEqual("page")
      expect(error.constraints?.isNumber).toBeDefined()
    })
  })
})
