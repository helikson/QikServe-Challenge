import { create } from "zustand";
import { MenuStore } from "./interface";
import { Menu } from "@/api/DTO";

const useMenuStore = create<MenuStore>((set, get) => ({
   items: {} as Menu,
   sectionItems: [],
   setItems: (items: Menu) => {
      set({ items })
   },
   setSectionItems: (sectionItems: Array<string>) => {
      set({ sectionItems })
   },
   getSectionItem: (id: number) => {
      let findedSectionItem = null;
      
      get().items?.sections?.forEach?.((section) => {
         const item = section.items.find((item) => item.id === id);

         if (item) {
            findedSectionItem = item;
            return;
         }
      });

      return findedSectionItem;
   },
   clearSectionItems: () => {
      set({ sectionItems: get().items.sections.map((section) => section.name) });
   }
}));

export default useMenuStore;