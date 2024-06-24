import { create } from "zustand";
import { RestaurantStore } from "./interface";
import { Restaurant } from "@/api/DTO";

const useRestaurantStore = create<RestaurantStore>((set) => ({
   restaurant: {} as Restaurant,
   setRestaurant: (restaurant: Restaurant) => set({ restaurant }),
}));

export default useRestaurantStore;