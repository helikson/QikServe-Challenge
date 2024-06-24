import { SectionItem } from "@/api/DTO";

export type OrderStore = {
   orderItem: SectionItem,
   setOrderItem: (orderItem: SectionItem) => void,
   clearOrderItem: () => void,
}