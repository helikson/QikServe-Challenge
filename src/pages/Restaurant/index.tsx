import { Restaurant } from "@/api/DTO";
import { Input } from "@/components/ui/input";
import { Cart, MenuList, ModalOrder, Sections } from "./components";
import useRestaurantStore from "@/store/RestaurantStore";
import { useState } from "react";
import { RestaurantSkeleton } from "./components/skeleton";
import { SearchIcon } from "lucide-react";

function RestaurantPage() {
   const restaurant: Restaurant = useRestaurantStore((state) => state.restaurant);
   const [searchText, setSearchText] = useState("");

   if (!Object.keys(restaurant).length) return RestaurantSkeleton();

   return (
      <div className={`bg-[${restaurant.webSettings.backgroundColour}] lg:bg-[#EEEEEE]`}>
         <img
            src={restaurant.webSettings.bannerImage}
            className="w-full h-[150px] object-cover object-center"
         />

         <div className="p-4 lg:p-0 lg:gap-0 lg:w-3/4 mx-auto">
            <div
               className="flex items-center p-2 gap-2 h-10 border rounded-lg border-[#8A94A4] text-[#8A94A4] lg:my-1"
               style={{ backgroundColor: restaurant.webSettings.backgroundColour }}
            >
               <SearchIcon className="w-5 h-5" />

               <Input
                  type="search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search menu items"
                  className="gap-1 border-0 shadow-none outline-none focus-visible:ring-0 p-0 placeholder:font-normal text-base"
               />
            </div>

            <div className="lg:flex lg:justify-between lg:gap-6 lg:py-8 lg:px-10 lg:bg-[#F8F9FA]">
               <div
                  className="w-full lg:w-3/5 pb-6 lg:shadow-[0px_2px_14px_0px_#00000024]"
                  style={{ backgroundColor: restaurant.webSettings.backgroundColour }}
               >
                  <Sections />

                  <MenuList filter={searchText} />
               </div>

               <div
                  className="lg:w-2/5 lg:h-fit"
                  style={{ backgroundColor: restaurant.webSettings.backgroundColour }}
               >
                  <Cart />
               </div>
            </div>
         </div>

         <ModalOrder />
      </div>
   );
}

export default RestaurantPage;
