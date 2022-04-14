import { RawPack } from "./types"

type FindParentPackData = {
  currentPack: RawPack
  packs: RawPack[]
}
export function findParentPackId(data: FindParentPackData): RawPack["code"] | undefined {
  const { currentPack, packs } = data
  if (currentPack.position === 1) return

  const parentPack = packs.find((pack) => {
    const isSameCycle = pack.cycle_position === currentPack.cycle_position
    const isFirstPosition = pack.position === 1
    return isSameCycle && isFirstPosition
  })

  return parentPack?.code
}
