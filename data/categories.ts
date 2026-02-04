export interface Category {
  id: number
  name: string
}

export const BREAD: Category = { id: 1, name: "Bread" }
export const BROETCHEN: Category = { id: 2, name: "Brötchen" }
export const KUCHEN: Category = { id: 3, name: "Kuchen" }
export const BEVERAGE: Category = { id: 4, name: "Beverage" }

export const ALL_CATEGORIES: Category[] = [BREAD, BROETCHEN, KUCHEN, BEVERAGE]
