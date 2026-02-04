import { GLUTEN, LACTOSE } from "./allergens"
import { BREAD, BROETCHEN } from "./categories"
import {
  DINKELVOLLKORNMEHL,
  HEFE,
  MILCH,
  ROGGENMEHL,
  SALZ,
  SAUERTEIG,
  WASSER,
  WEIZENMEHL
} from "./ingredients"

export interface BreadProduct {
  id: number
  name: string
  thumbnail: any
  weight: string
  allergens: number[]
  ingredients: number[]
  availability: string[]
  category: number
}

export const mockBreadProducts: BreadProduct[] = [
  {
    id: 1,
    name: "Dinkelvollkornbrot",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "500g",
    allergens: [GLUTEN.id],
    ingredients: [DINKELVOLLKORNMEHL.id, WASSER.id, HEFE.id, SALZ.id],
    availability: ["Monday", "Wednesday", "Friday"],
    category: BREAD.id
  },
  {
    id: 2,
    name: "Roggenbrot",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "750g",
    allergens: [GLUTEN.id],
    ingredients: [ROGGENMEHL.id, WASSER.id, SAUERTEIG.id, SALZ.id],
    availability: ["Tuesday", "Thursday", "Saturday"],
    category: BREAD.id
  },
  {
    id: 3,
    name: "Bauernbrot",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "1000g",
    allergens: [GLUTEN.id, LACTOSE.id],
    ingredients: [
      WEIZENMEHL.id,
      ROGGENMEHL.id,
      WASSER.id,
      HEFE.id,
      SALZ.id,
      MILCH.id
    ],
    availability: ["Daily"],
    category: BREAD.id
  },
  {
    id: 4,
    name: "Brötchen",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "80g",
    allergens: [GLUTEN.id],
    ingredients: [WEIZENMEHL.id, WASSER.id, HEFE.id, SALZ.id],
    availability: ["Daily"],
    category: BROETCHEN.id
  }
]
