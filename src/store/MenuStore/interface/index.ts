import { Menu, SectionItem } from "@/api/DTO"

export type MenuStore = {
   items: Menu,
   sectionItems: Array<string>,
   setItems: (items: Menu) => void,
   setSectionItems: (sectionItems: Array<string>) => void,
   getSectionItem: (id: number) => SectionItem,
   clearSectionItems: () => void,
}
