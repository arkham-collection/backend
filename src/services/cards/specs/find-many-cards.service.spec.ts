import bootstrapTestModule from "src/utils/bootstrapTestModule"
import { FindManyCardsService } from "../find-many-cards.service"

describe("FindManyCardsService", () => {
  let findManyCardsService: FindManyCardsService

  beforeEach(async () => {
    const module = await bootstrapTestModule()
    findManyCardsService = await module.resolve(FindManyCardsService)
  })

  it("returns all cards", async () => {
    const cards = await findManyCardsService.execute()
    expect(cards).toHaveLength(182)
  })

  describe("#paginationClause", () => {
    it("paginates the result", async () => {
      const pagination = { limit: 5, page: 0 }
      const cards = await findManyCardsService.execute({ pagination })
      expect(cards).toHaveLength(5)
    })
  })

  describe("#sortClause", () => {
    it("can sort the result asc", async () => {
      const cards = await findManyCardsService.execute({
        sort: [{ field: "name", value: "asc" }],
      })
      expect(cards[0].name < cards[1].name).toBeTruthy()
    })

    it("can sort the result desc", async () => {
      const cards = await findManyCardsService.execute({
        sort: [{ field: "name", value: "desc" }],
      })
      expect(cards[0].name > cards[1].name).toBeTruthy()
    })
  })

  describe("#traitsClause", () => {
    it("can filter on trait", async () => {
      const cards = await findManyCardsService.execute({
        traits: ["Ally"],
      })

      expect(
        cards.filter(({ traits }) => traits.includes("Ally")),
      ).toHaveLength(cards.length)
    })

    it("can filter on multiple traits", async () => {
      const cards = await findManyCardsService.execute({
        traits: ["Ally", "Creature"],
      })
      const filteredCards = cards.filter(({ traits }) => {
        return traits.includes("Ally") && traits.includes("Creature")
      })
      expect(filteredCards).toHaveLength(cards.length)
    })
  })

  describe("#nameClause", () => {
    it("can filter on name", async () => {
      const cards = await findManyCardsService.execute({
        name: "Roland Banks",
      })

      expect(cards).toHaveLength(1)
      expect(cards[0].name).toEqual("Roland Banks")
    })
  })

  describe("xpClause", () => {
    it("return cards when there xp is included", async () => {
      const cards = await findManyCardsService.execute({
        xp: [0, 1],
      })

      expect(cards).toHaveLength(64)
    })
  })

  describe("#packIdsClause", () => {
    it("returns cards when there packId is included", async () => {
      const cards = await findManyCardsService.execute({
        packIds: ["core", "other"],
      })

      expect(cards).toHaveLength(182)
    })

    it("does not return cards when there packId is missing", async () => {
      const cards = await findManyCardsService.execute({
        packIds: ["other", "otherOther"],
      })

      expect(cards).toHaveLength(0)
    })
  })

  describe("#typeNamesClause", () => {
    it("returns cards wheren there typeName is included", async () => {
      const cards = await findManyCardsService.execute({
        typeNames: ["Investigator", "Random"],
      })

      expect(cards).toHaveLength(5)
    })

    it("does not return cards when factionName is not included", async () => {
      const cards = await findManyCardsService.execute({
        typeNames: ["Random", "OtherRandom"],
      })

      expect(cards).toHaveLength(0)
    })
  })

  describe("#factionNamesClause", () => {
    it("returns cards wheren there factionname is included", async () => {
      const cards = await findManyCardsService.execute({
        factionNames: ["Guardian", "Random"],
      })

      expect(cards).toHaveLength(15)
    })

    it("does not return cards when factionName is not included", async () => {
      const cards = await findManyCardsService.execute({
        factionNames: ["Random", "OtherRandom"],
      })

      expect(cards).toHaveLength(0)
    })
  })

  describe("#encountNamesClause", () => {
    it("returns cards wheren there encounterName is included", async () => {
      const cards = await findManyCardsService.execute({
        encounterNames: ["The Devourer Below", "Random"],
      })

      expect(cards).toHaveLength(17)
    })

    it("does not return cards when encounterName is not included", async () => {
      const cards = await findManyCardsService.execute({
        encounterNames: ["Random", "OtherRandom"],
      })

      expect(cards).toHaveLength(0)
    })
  })
})
