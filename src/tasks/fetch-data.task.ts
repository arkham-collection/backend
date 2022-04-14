import { join } from "path"
import downloadImage from "src/utils/downloadImage"
import downloadJson from "src/utils/downloadJson"
import { Task } from "../lib/tasker"

type Pack = {
  code: string
}

type Card = {
  imagesrc?: string
  backimagesrc?: string
}

const task = new Task({
  name: "Fetch Data",
  description: "Fetches data from arkhamdb",
  task: fetchData,
}).create()

// eslint-disable-next-line @typescript-eslint/naming-convention
const DOMAIN = "https://arkhamdb.com"
// eslint-disable-next-line @typescript-eslint/naming-convention
const BASE_PATH = join(__dirname, "../../assets")
async function fetchData(): Promise<void> {
  const packs = await fetchPacks()
  const codes = packs.map((pack) => pack.code)
  await fetchCards(codes)
}

async function fetchCards(codes: Array<Pack["code"]>): Promise<void> {
  for (const code of codes) {
    const cards = await downloadJson<Card[]>({
      url: `${DOMAIN}/api/public/cards/${code}`,
      filePath: `${BASE_PATH}/public/cards/${code}.json`,
    })

    await fetchImages(cards)
  }
}

async function fetchImages(cards: Card[]): Promise<void> {
  for (const { imagesrc, backimagesrc } of cards) {
    if (imagesrc) {
      await downloadImage({
        url: `${DOMAIN}${imagesrc}`,
        filePath: `${BASE_PATH}${imagesrc}`,
      })
    }

    if (backimagesrc) {
      await downloadImage({
        url: `${DOMAIN}${backimagesrc}`,
        filePath: `${BASE_PATH}${backimagesrc}`,
      })
    }
  }
}

async function fetchPacks(): Promise<Pack[]> {
  return await downloadJson<Pack[]>({
    url: `${DOMAIN}/api/public/packs`,
    filePath: `${BASE_PATH}/public/packs.json`,
  })
}

export default task
