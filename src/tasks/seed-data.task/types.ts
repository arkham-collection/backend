export type RawPack = {
  name: string
  code: string
  position: number
  cycle_position: number
  available: string
  known: number
  total: number
  urL: string
  id: number
}

export type RawCard = {
  traits?: string
  pack_code: string
  pack_name: string
  type_code: string
  type_name: string
  faction_code: string
  faction_name: string
  encounter_code: string
  encounter_name: string
  encounter_position: number
  position: number
  exceptional: boolean
  myriad: boolean
  code: string
  name: string
  real_name: string
  cost: number
  xp?: number
  text: string
  real_text: string
  quantity: number
  skill_intellect: number
  skill_agility: number
  skill_wild: number
  health_per_investigator: boolean
  deck_limit: number
  real_slot: string
  illustrator: string
  is_unique: boolean
  permanent: boolean
  double_sided: boolean
  octgn_id: string
  url: string
  imagesrc: string
  backimagesrc: string
}
