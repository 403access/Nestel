import { type Allergen, GLUTEN, LACTOSE } from "./allergens"
import { BREAD, BROETCHEN, type Category } from "./categories"
import {
  DINKELVOLLKORNMEHL,
  HEFE,
  type Ingredient,
  MILCH,
  ROGGENMEHL,
  SALZ,
  SAUERTEIG,
  WASSER,
  WEIZENMEHL
} from "./ingredients"

export interface BreadProduct {
  id: string
  name: string
  thumbnail: any
  weight: string
  allergens: Allergen[]
  ingredients: Ingredient[]
  availability: string[]
  category: Category
}

export const mockBreadProducts: BreadProduct[] = [
  {
    id: "1",
    name: "Dinkelvollkornbrot",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "500g",
    allergens: [GLUTEN],
    ingredients: [DINKELVOLLKORNMEHL, WASSER, HEFE, SALZ],
    availability: ["Monday", "Wednesday", "Friday"],
    category: BREAD
  },
  {
    id: "2",
    name: "Roggenbrot",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "750g",
    allergens: [GLUTEN],
    ingredients: [ROGGENMEHL, WASSER, SAUERTEIG, SALZ],
    availability: ["Tuesday", "Thursday", "Saturday"],
    category: BREAD
  },
  {
    id: "3",
    name: "Bauernbrot",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "1000g",
    allergens: [GLUTEN, LACTOSE],
    ingredients: [WEIZENMEHL, ROGGENMEHL, WASSER, HEFE, SALZ, MILCH],
    availability: ["Daily"],
    category: BREAD
  },
  {
    id: "4",
    name: "Brötchen",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "80g",
    allergens: [GLUTEN],
    ingredients: [WEIZENMEHL, WASSER, HEFE, SALZ],
    availability: ["Daily"],
    category: BROETCHEN
  }
]
