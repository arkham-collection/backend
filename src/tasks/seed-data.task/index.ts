import { Prisma, PrismaClient } from "@prisma/client"
import { withDbConnection } from "src/lib/database/utils"
import { Task } from "src/lib/tasker"
import readJsonFile from "src/utils/readJsonFile"
import { RawCard, RawPack } from "./types"
import { findParentPackId } from "./utils"

const task = new Task({
  name: "Seed Data",
  description: "Seed data into the db",
  task: withDbConnection(seedData),
}).create()
async function seedData(db: PrismaClient): Promise<void> {
  const path = "assets/public/packs.json"
  const packs = readJsonFile<RawPack[]>(path)
  await db.$queryRawUnsafe("truncate packs cascade")
  await db.pack.createMany({
    data: packs.map(
      (pack): Prisma.PackCreateManyInput => ({
        id: pack.code,
        parentId: findParentPackId({ currentPack: pack, packs: packs }),
        name: pack.name,
        position: pack.position,
        cyclePosition: pack.cycle_position,
        availableAt: new Date(pack.available),
        known: pack.known,
        total: pack.total,
      }),
    ),
  })

  const codes = packs.map((pack) => pack.code)
  await db.card.deleteMany()
  for (const code of codes) {
    const path = `assets/public/cards/${code}.json`
    const cards = readJsonFile<RawCard[]>(path)
    await db.card.createMany({
      data: cards.map(
        (card): Prisma.CardCreateManyInput => ({
          id: card.code,
          cost: card.cost,
          xp: card.xp,
          packId: card.pack_code,
          name: card.real_name,
          quantity: card.quantity,
          traits: card.traits
            ?.split(". ")
            .map((trait) => trait.replace(".", "")),
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
  }
}

export default task
