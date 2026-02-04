export interface Allergen {
  id: number
  name: string
}

export const GLUTEN: Allergen = { id: 1, name: "Gluten" }
export const LACTOSE: Allergen = { id: 2, name: "Lactose" }

export const ALL_ALLERGENS: Allergen[] = [GLUTEN, LACTOSE]
