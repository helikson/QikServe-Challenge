import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MenuItem } from "./menu-item";
import useMenuStore from "@/store/MenuStore";
import { useShallow } from "zustand/react/shallow";
import { MenuListSkeleton } from "./skeleton/menu-list";

function MenuList({ filter }: { filter: string }) {
   const [ menu, sectionItems, setSectionItems ] = useMenuStore(useShallow((state) => ([
      state.items,
      state.sectionItems,
      state.setSectionItems,
   ])));

   if (!Object.keys(menu).length) return MenuListSkeleton();

   return(
      <Accordion
         type="multiple"
         value={sectionItems}
         onValueChange={setSectionItems}
         className="w-full"
      >
         {menu.sections.map((section) => (
            <AccordionItem key={section.id} value={section.name}>
               <AccordionTrigger className="tracking-wide text-left font-semibold text-2xl pt-8 pr-4 pb-3 pl-4 gap-2">
                  {section.name}
               </AccordionTrigger>

               {section.items.map((item) => {
                  if (!item.name.toLowerCase().includes(filter.toLowerCase())) return null;

                  return (
                     <MenuItem key={item.id} item={item} />
                  )
               })}
            </AccordionItem>
         ))}
      </Accordion>
   )
}

export { MenuList };