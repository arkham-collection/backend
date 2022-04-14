import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { CardsQueryParamsDto } from "../cards-query-params.dto"
import { PaginationParamsDto } from "../pagination-params.dto"
import { SortParamsDto } from "../sort-params.dto"

function buildDto(data: Record<string, unknown> = {}): CardsQueryParamsDto {
  const generatedData = {
    name: "Pickpocketing",
    traits: ["Ally", "Creature"],
    pagination: { limit: "20", page: "2" },
    sort: "name,-cost",
    packIds: ["core", "rcore", "dwl"],
    factionNames: ["Guardian", "Seeker"],
    encounterNames: ["The Devourer Below"],
    typeNames: ["Location", "Investigator"],
  }
  return plainToInstance(CardsQueryParamsDto, { ...generatedData, ...data })
}

describe("CardsQueryParamsDto", () => {
  it("is valid", async () => {
    const dto = buildDto()
    const [error] = await validate(dto)
    expect(error).toBeUndefined()
  })

  describe("#pagination", () => {
    it("transforms into a PaginationParamsDto", () => {
      const pagination = { page: "2", limit: "20" }
      const dto = buildDto({ pagination })
      expect(dto.pagination).toBeInstanceOf(PaginationParamsDto)
    })

    it("is optional", async () => {
      const dto = buildDto({ pagination: undefined })
      const [error] = await validate(dto)
      expect(error).toBeUndefined()
    })
  })

  describe("#sort", () => {
    it("transforms into array of SortParamsDto", () => {
      const dto = buildDto({ sort: "name,-cost" })
      expect(dto.sort[0]).toBeInstanceOf(SortParamsDto)
      expect(dto.sort[1]).toBeInstanceOf(SortParamsDto)
    })

    it("is optional", async () => {
      const dto = buildDto({ sort: undefined })
      const [error] = await validate(dto)
      expect(error).toBeUndefined()
    })
  })

  describe("#traits", () => {
    it("is optional", async () => {
      const dto = buildDto({ traits: undefined })
      const [error] = await validate(dto)
      expect(error).toBeUndefined()
    })

    it("is an array", async () => {
      const dto = buildDto({ traits: "Ally" })
      const [error] = await validate(dto)
      expect(error.property).toEqual("traits")
      expect(error.constraints?.isArray).toBeDefined()
    })

    it("must each be a string", async () => {
      const dto = buildDto({ traits: ["Ally", 3] })
      const [error] = await validate(dto)
      expect(error.property).toEqual("traits")
      expect(error.constraints?.isString).toBeDefined()
    })
  })

  describe("#name", () => {
    it("is optional", async () => {
      const dto = buildDto({ name: undefined })
      const [error] = await validate(dto)
      expect(error).toBeUndefined()
    })

    it("is a string", async () => {
      const dto = buildDto({ name: 123 })
      const [error] = await validate(dto)
      expect(error.property).toEqual("name")
      expect(error.constraints?.isString).toBeDefined()
    })
  })

  describe("#packIds", () => {
    it("is optional", async () => {
      const dto = buildDto({ packIds: undefined })
      const [error] = await validate(dto)
      expect(error).toBeUndefined()
    })

    it("is an array", async () => {
      const dto = buildDto({ packIds: "Ally" })
      const [error] = await validate(dto)
      expect(error.property).toEqual("packIds")
      expect(error.constraints?.isArray).toBeDefined()
    })

    it("must each be a string", async () => {
      const dto = buildDto({ packIds: ["core", 3] })
      const [error] = await validate(dto)
      expect(error.property).toEqual("packIds")
      expect(error.constraints?.isString).toBeDefined()
    })
  })

  describe("#factionNames", () => {
    it("is optional", async () => {
      const dto = buildDto({ factionNames: undefined })
      const [error] = await validate(dto)
      expect(error).toBeUndefined()
    })

    it("is an array", async () => {
      const dto = buildDto({ factionNames: "Guardian" })
      const [error] = await validate(dto)
      expect(error.property).toEqual("factionNames")
      expect(error.constraints?.isArray).toBeDefined()
    })

    it("must each be a string", async () => {
      const dto = buildDto({ factionNames: ["Guardian", 3] })
      const [error] = await validate(dto)
      expect(error.property).toEqual("factionNames")
      expect(error.constraints?.isString).toBeDefined()
    })
  })

  describe("#encounterNames", () => {
    it("is optional", async () => {
      const dto = buildDto({ enconterNames: undefined })
      const [error] = await validate(dto)
      expect(error).toBeUndefined()
    })

    it("is an array", async () => {
      const dto = buildDto({ encounterNames: "The Devourer Below" })
      const [error] = await validate(dto)
      expect(error.property).toEqual("encounterNames")
      expect(error.constraints?.isArray).toBeDefined()
    })

    it("must each be a string", async () => {
      const dto = buildDto({ encounterNames: ["The Devourer Below", 3] })
      const [error] = await validate(dto)
      expect(error.property).toEqual("encounterNames")
      expect(error.constraints?.isString).toBeDefined()
    })
  })

  describe("#typeNames", () => {
    it("is optional", async () => {
      const dto = buildDto({ typeNames: undefined })
      const [error] = await validate(dto)
      expect(error).toBeUndefined()
    })

    it("is an array", async () => {
      const dto = buildDto({ typeNames: "Investigator" })
      const [error] = await validate(dto)
      expect(error.property).toEqual("typeNames")
      expect(error.constraints?.isArray).toBeDefined()
    })

    it("must each be a string", async () => {
      const dto = buildDto({ typeNames: ["Investigator", 3] })
      const [error] = await validate(dto)
      expect(error.property).toEqual("typeNames")
      expect(error.constraints?.isString).toBeDefined()
    })
  })
})
