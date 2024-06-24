import { Skeleton } from "@/components/ui/skeleton";
import { SectionsSkeleton } from "./sections";
import { MenuListSkeleton } from "./menu-list";
import { CartSkeleton } from "./cart";

function RestaurantSkeleton() {
   return (
      <div className="overflow-hidden h-[calc(100vh-56px)]">
         <Skeleton className="w-full h-[150px] bg-gray-300 rounded-none" />

         <div className="w-5/6 lg:w-3/4 mx-auto">
            <Skeleton className="bg-gray-300 h-10 my-1" />

            <div className="flex justify-between px-4 gap-3">
               <div className="w-full lg:w-3/5">
                  <SectionsSkeleton />

                  <MenuListSkeleton />
               </div>

               <div className="hidden lg:block w-2/5">
                  <CartSkeleton />
               </div>
            </div>
         </div>
      </div>
   )
}

export { RestaurantSkeleton };