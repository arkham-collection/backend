import axios from "axios"
import { writeFileSync } from "fs"

type Data = {
  url: string
  filePath: string
}
export default async function downloadJson<T>({ url, filePath }: Data): Promise<T> {
  return (await axios.get(url).then(({ data }) => {
    writeFileSync(filePath, JSON.stringify(data))
    return data as T
  })) as T
}
