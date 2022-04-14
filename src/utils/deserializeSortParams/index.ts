export type SortParam = {
  field: string
  value: "asc" | "desc"
}
export default function deserializeSortParams(value: string): SortParam[] {
  const array = value.split(",")
  return array.map((field) => {
    if (field[0] !== "-") return { field, value: "asc" }
    return { field: field.substring(1), value: "desc" }
  })
}
