export interface Category {
  id: number
  name: string
  allowedIngredientTypes?: Array<'dough' | 'dairy' | 'other'>
  allowedIngredientIds?: number[]
}

export const BREAD: Category = {
  id: 1,
  name: "Bread",
  allowedIngredientTypes: ['dough', 'other'], // Bread typically has dough ingredients
  allowedIngredientIds: [1, 2, 3, 4, 5, 6, 7] // DINKELVOLLKORNMEHL, WASSER, HEFE, SALZ, ROGGENMEHL, SAUERTEIG, WEIZENMEHL
}
export const BROETCHEN: Category = {
  id: 2,
  name: "Brötchen",
  allowedIngredientTypes: ['dough', 'other'], // Brötchen also has dough ingredients
  allowedIngredientIds: [1, 2, 3, 4, 5, 6, 7] // DINKELVOLLKORNMEHL, WASSER, HEFE, SALZ, ROGGENMEHL, SAUERTEIG, WEIZENMEHL
}
export const KUCHEN: Category = {
  id: 3,
  name: "Kuchen",
  allowedIngredientTypes: ['dough', 'dairy', 'other'], // Kuchen can have both dough and dairy
  allowedIngredientIds: [1, 2, 3, 4, 7, 8] // DINKELVOLLKORNMEHL, WASSER, HEFE, SALZ, WEIZENMEHL, MILCH
}
export const BEVERAGE: Category = {
  id: 4,
  name: "Beverage",
  allowedIngredientTypes: ['other'], // Beverages generally don't have dough or dairy as core ingredients for filtering
  allowedIngredientIds: [] // No specific ingredients for filtering
}

export const ALL_CATEGORIES: Category[] = [BREAD, BROETCHEN, KUCHEN, BEVERAGE]
