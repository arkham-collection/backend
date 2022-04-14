import { readFileSync } from "fs"


export default function readJsonFile<T>(file: string): T {
  const content = readFileSync(file, "utf8")
  return JSON.parse(content) as T
}
