export interface MenuItem {
  productId: number;
  discountPrice?: number;
  minQuantity?: number;
  combinesWith?: number[];
}

export interface Offer {
  id: number;
  name: string;
  description?: string;
  items: MenuItem[];
  // Add other offer-specific properties if needed
}

export interface Menu {
  id: number
  name: string
  description?: string
  offers?: Offer[]; // Changed from items to offers
}

export const BREAKFAST_MENU: Menu = {
  id: 1,
  name: "Breakfast Menu",
  description: "Special offers for breakfast items",
  offers: [
    {
      id: 101,
      name: "Breakfast Special A",
      items: [
        { productId: 3, discountPrice: 4.50 }, // Bauernbrot
      ]
    },
    {
      id: 102,
      name: "Brötchen Deal",
      items: [
        { productId: 4, discountPrice: 0.70, minQuantity: 2 }, // Brötchen (buy 2 for a discount)
      ]
    }
  ]
}

export const LUNCH_MENU: Menu = {
  id: 2,
  name: "Lunch Menu",
  description: "Daily lunch specials",
  offers: [
    {
      id: 201,
      name: "Lunch Combo 1",
      items: [
        { productId: 1, discountPrice: 4.00 }, // Dinkelvollkornbrot
      ]
    },
    {
      id: 202,
      name: "Lunch Combo 2",
      items: [
        { productId: 2, discountPrice: 3.50 }, // Roggenbrot
      ]
    },
    {
      id: 203,
      name: "Premium Lunch",
      items: [
        { productId: 3, discountPrice: 4.80 }, // Bauernbrot
      ]
    }
  ]
}

export const DINNER_MENU: Menu = {
  id: 3,
  name: "Dinner Menu",
  description: "Evening meal combinations",
  offers: [
    {
      id: 301,
      name: "Dinner Loaf Deal",
      items: [
        { productId: 1, discountPrice: 4.20 }, // Dinkelvollkornbrot
      ]
    }
  ]
}

export const SEASONAL_SPECIAL: Menu = {
  id: 4,
  name: "Seasonal Special",
  description: "Limited time seasonal offers",
  offers: [
    {
      id: 401,
      name: "Seasonal Bread Offer",
      items: [
        { productId: 1, discountPrice: 4.10, minQuantity: 1 },
        { productId: 2, discountPrice: 3.60, minQuantity: 1 },
      ]
    },
    {
      id: 402,
      name: "Seasonal Combo",
      items: [
        { productId: 3, discountPrice: 4.90, minQuantity: 1 },
        { productId: 4, discountPrice: 0.75, minQuantity: 1 }
      ]
    }
  ]
}

export const ALL_MENUS: Menu[] = [BREAKFAST_MENU, LUNCH_MENU, DINNER_MENU, SEASONAL_SPECIAL]
