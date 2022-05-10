import { Prisma } from "@prisma/client"
import { join } from "path"
import "reflect-metadata"
import { DatabaseService } from "./lib/database"
import { RawCard, RawPack } from "./tasks/seed-data.task/types"
import bootstrapTestModule from "./utils/bootstrapTestModule"
import readJsonFile from "./utils/readJsonFile"

let db: DatabaseService

beforeAll(async () => {
  const module = await bootstrapTestModule()
  db = await module.resolve(DatabaseService)
  const cards = readJsonFile<RawCard[]>(join(__dirname, "../assets/public/cards/core.json"))
  const packs = readJsonFile<RawPack[]>(join(__dirname, "../assets/public/packs.json"))

  await db.pack.createMany({
    data: packs.map(
      (pack): Prisma.PackCreateManyInput => ({
        id: pack.code,
        name: pack.name,
        position: pack.position,
        cyclePosition: pack.cycle_position,
        availableAt: new Date(pack.available),
        known: pack.known,
        total: pack.total,
      }),
    ),
  })

  await db.card.createMany({
    data: cards.map(
      (card): Prisma.CardCreateManyInput => ({
        id: card.code,
        cost: card.cost,
        xp: card.xp,
        packId: card.pack_code,
        name: card.real_name,
        quantity: card.quantity,
        traits: card.traits?.split(". ").map((trait) => trait.replace(".", "")),
        factionName: card.faction_name,
        encounterName: card.encounter_name,
        typeName: card.type_name,
        position: card.position,
        doubleSided: card.double_sided,
        imageSrc: card.imagesrc,
        backImageSrc: card.backimagesrc,
      }),
    ),
  })
})

afterEach(async () => {
  await db.$disconnect()
})
afterAll(async () => {
  await db.$truncateAll()
  await db.$disconnect()
})
