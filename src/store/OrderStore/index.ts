import { create } from "zustand";
import { OrderStore } from "./interface";
import { SectionItem } from "@/api/DTO";

const useOrderStore = create<OrderStore>((set, get) => ({
   orderItem: {} as SectionItem,
   setOrderItem: (orderItem: SectionItem) => {
      set({ orderItem });
   },
   clearOrderItem: () => {
      set({ orderItem: {} as SectionItem });
   },
}));

export default useOrderStore;