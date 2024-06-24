import { Restaurant, SectionItem } from "@/api/DTO";
import { AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { currencyFormatted } from "@/lib/utils";
import useCartStore from "@/store/CartStore";
import useOrderStore from "@/store/OrderStore";
import useRestaurantStore from "@/store/RestaurantStore";

function MenuItem({ item }: { item: SectionItem }) {
   const restaurant: Restaurant = useRestaurantStore((state) => state.restaurant);
   const setOrderItem = useOrderStore((state) => (state.setOrderItem));
   const cartItems = useCartStore((state) => (state.cartItems));

   const quantityInCart = cartItems.find((cartItem) => cartItem.itemID === item.id)?.quantity || 0;

   if (!Object.keys(restaurant).length) return null;

   if (!item.available) return null;

   return (
      <AccordionContent
         key={item.id}
         className="flex justify-between items-center cursor-pointer gap-4 p-4"
         onClick={() => setOrderItem(item)}
      >
         <div className="gap-1">
            <p className="font-semibold text-base text-left">
               {quantityInCart > 0 && (
                  <Badge
                     className="text-white font-medium text-sm mr-2"
                     style={{
                        backgroundColor: restaurant.webSettings.primaryColour,
                     }}
                  >
                     {quantityInCart}
                  </Badge>
               )}

               {item.name}
            </p>

            <p className="max-w-96 line-clamp-2 text-base font-light text-left">
               {item.description}
            </p>

            <p className="text-base font-medium tracking-wide text-left">
               {currencyFormatted(restaurant.ccy, item.price)}
            </p>
         </div>

         {item?.images && (
            <img
               src={item.images[0].image}
               alt={item.name}
               className="w-32 h-[85px] rounded-md"
            />
         )}
      </AccordionContent>
   );
}

export { MenuItem };