import { Restaurant } from "@/api/DTO"

export type RestaurantStore = {
   restaurant: Restaurant,
   setRestaurant: (restaurant: Restaurant) => void
}
