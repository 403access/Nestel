export interface BreadProduct {
  id: string
  name: string
  thumbnail: any
  weight: string
  allergens: string[]
  ingredients: string
  availability: string[]
}

export const mockBreadProducts: BreadProduct[] = [
  {
    id: "1",
    name: "Dinkelvollkornbrot",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "500g",
    allergens: ["Gluten"],
    ingredients: "Dinkelvollkornmehl, Wasser, Hefe, Salz",
    availability: ["Monday", "Wednesday", "Friday"]
  },
  {
    id: "2",
    name: "Roggenbrot",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "750g",
    allergens: ["Gluten"],
    ingredients: "Roggenmehl, Wasser, Sauerteig, Salz",
    availability: ["Tuesday", "Thursday", "Saturday"]
  },
  {
    id: "3",
    name: "Bauernbrot",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "1000g",
    allergens: ["Gluten", "Lactose"],
    ingredients: "Weizenmehl, Roggenmehl, Wasser, Hefe, Salz, Milch",
    availability: ["Daily"]
  },
  {
    id: "4",
    name: "Brötchen",
    thumbnail: require("@/assets/images/favicon.png"),
    weight: "80g",
    allergens: ["Gluten"],
    ingredients: "Weizenmehl, Wasser, Hefe, Salz",
    availability: ["Daily"]
  }
]
