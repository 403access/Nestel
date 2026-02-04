import {
  DINKELVOLLKORNMEHL,
  HEFE,
  Ingredient,
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
  allergens: string[]
  ingredients: Ingredient[]
  availability: string[]
}

export const mockBreadProducts: BreadProduct[] = [
  {
    id: "1",
    name: "Dinkelvollkornbrot",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "500g",
    allergens: ["Gluten"],
    ingredients: [DINKELVOLLKORNMEHL, WASSER, HEFE, SALZ],
    availability: ["Monday", "Wednesday", "Friday"]
  },
  {
    id: "2",
    name: "Roggenbrot",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "750g",
    allergens: ["Gluten"],
    ingredients: [ROGGENMEHL, WASSER, SAUERTEIG, SALZ],
    availability: ["Tuesday", "Thursday", "Saturday"]
  },
  {
    id: "3",
    name: "Bauernbrot",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "1000g",
    allergens: ["Gluten", "Lactose"],
    ingredients: [WEIZENMEHL, ROGGENMEHL, WASSER, HEFE, SALZ, MILCH],
    availability: ["Daily"]
  },
  {
    id: "4",
    name: "Brötchen",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "80g",
    allergens: ["Gluten"],
    ingredients: [WEIZENMEHL, WASSER, HEFE, SALZ],
    availability: ["Daily"]
  }
]
