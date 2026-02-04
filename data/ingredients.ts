export interface Ingredient {
  id: number
  name: string
  type?: 'dough' | 'dairy' | 'other' // Add optional type property
}

export const DINKELVOLLKORNMEHL: Ingredient = {
  id: 1,
  name: "Dinkelvollkornmehl",
  type: 'dough'
}
export const WASSER: Ingredient = { id: 2, name: "Wasser", type: 'other' }
export const HEFE: Ingredient = { id: 3, name: "Hefe", type: 'other' }
export const SALZ: Ingredient = { id: 4, name: "Salz", type: 'other' }
export const ROGGENMEHL: Ingredient = {
  id: 5,
  name: "Roggenmehl",
  type: 'dough'
}
export const SAUERTEIG: Ingredient = { id: 6, name: "Sauerteig", type: 'other' }
export const WEIZENMEHL: Ingredient = {
  id: 7,
  name: "Weizenmehl",
  type: 'dough'
}
export const MILCH: Ingredient = {
  id: 8,
  name: "Milch",
  type: 'dairy'
}

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
