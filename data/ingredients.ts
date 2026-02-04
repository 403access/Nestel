export interface Ingredient {
  id: number
  name: string
}

export const DINKELVOLLKORNMEHL: Ingredient = {
  id: 1,
  name: "Dinkelvollkornmehl"
}
export const WASSER: Ingredient = { id: 2, name: "Wasser" }
export const HEFE: Ingredient = { id: 3, name: "Hefe" }
export const SALZ: Ingredient = { id: 4, name: "Salz" }
export const ROGGENMEHL: Ingredient = { id: 5, name: "Roggenmehl" }
export const SAUERTEIG: Ingredient = { id: 6, name: "Sauerteig" }
export const WEIZENMEHL: Ingredient = { id: 7, name: "Weizenmehl" }
export const MILCH: Ingredient = { id: 8, name: "Milch" }

export const ALL_INGREDIENTS: Ingredient[] = [
  DINKELVOLLKORNMEHL,
  WASSER,
  HEFE,
  SALZ,
  ROGGENMEHL,
  SAUERTEIG,
  WEIZENMEHL,
  MILCH
]
