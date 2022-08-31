export type MealItemType = {
  id: string
  name: string
  description: string
  price: number
}

export type CartItemType = {
  id: string
  name: string
  amount: number
  price: number
}

export type FetchedMeals = {
  [key: string]: Omit<MealItemType, "id">
}

