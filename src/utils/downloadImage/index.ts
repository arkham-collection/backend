import axios from "axios"
import { createWriteStream } from "fs"
import { Stream } from "stream"

type Data = {
  url: string
  filePath: string
}
export default async function downloadImage(data: Data): Promise<void> {
  const { url, filePath } = data
  const writer = createWriteStream(filePath)
  const { data: body } = await axios.get<Stream>(url, { responseType: "stream" })

  body.pipe(writer)
  return await new Promise((resolve, reject) => {
    writer.on("finish", resolve)
    writer.on("error", reject)
  })
}
