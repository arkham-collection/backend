export function toYearNumber(value: Date): number {
  return Number(value.toISOString().slice(0, 4))
}

export function toISODateString(value: Date): string {
  return value.toISOString().slice(0, 10)
}

export function toISOTimestampString(value: Date): string {
  return value.toISOString()
}
