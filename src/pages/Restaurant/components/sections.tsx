import useMenuStore from "@/store/MenuStore";
import { useShallow } from "zustand/react/shallow";
import { SectionsSkeleton } from "./skeleton/sections";
import { cn } from "@/lib/utils";
import useRestaurantStore from "@/store/RestaurantStore";

function Sections() {
   const restaurant = useRestaurantStore((state) => state.restaurant);
   const [ menu, sectionItems, setSectionItems, clearSectionItems ] = useMenuStore(useShallow((state) => ([
      state.items,
      state.sectionItems,
      state.setSectionItems,
      state.clearSectionItems
   ])));

   if (!Object.keys(restaurant).length || !Object.keys(menu).length) return SectionsSkeleton();

   return (
      <div className="flex justify-evenly overflow-auto gap-4 pt-5 pb-6 py-4">
         {menu.sections.map((section) => (
            <div
               key={section.id}
               className="flex flex-col items-center cursor-pointer"
               onClick={() => {
                  if (sectionItems.length === 1 && sectionItems[0] === section.name) {
                     clearSectionItems();
                  } else {
                     setSectionItems([section.name])
                  }
               }}
            >
               <div
                  className="w-[82px] h-[82px] rounded-[50px] border-2 gap-[10px] p-1 flex items-center justify-center"
                  style={{ borderColor: restaurant.webSettings.primaryColour }}
               >
                  <img
                     className="w-[74px] h-[74px] rounded-[40px] object-cover object-center"
                     src={section.images[0].image}
                     alt={section.name}
                  />
               </div>

               <span
                  className={cn(
                     "text-base tracking-wide text-center pt-4 pb-2 px-0",
                     sectionItems.length === 1 && sectionItems[0] === section.name ?
                        "font-semibold border-b-2" :
                        "font-normal",
                  )}
                  style={{ borderColor: restaurant.webSettings.primaryColour }}
               >
                  {section.name}
               </span>
            </div>
         ))}
      </div>
   );
}

export { Sections };