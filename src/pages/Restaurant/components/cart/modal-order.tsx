import { Modifier, Restaurant } from "@/api/DTO";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { currencyFormatted } from "@/lib/utils";
import useCartStore from "@/store/CartStore";
import useMenuStore from "@/store/MenuStore";
import useOrderStore from "@/store/OrderStore";
import useRestaurantStore from "@/store/RestaurantStore";
import { Cross2Icon } from "@radix-ui/react-icons";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

function ModalOrder() {
   const [quantity, setQuantity] = useState(1);
   const [modifierValue, setModifierValue] = useState(null);

   const restaurant: Restaurant = useRestaurantStore((state) => state.restaurant);
   const menu = useMenuStore((state) => (state.items));
   const setCartItems = useCartStore(((state) => (state.setCartItems)));
   const [orderItem, clearOrderItem] = useOrderStore(useShallow((state) => ([state.orderItem, state.clearOrderItem])));

   if (
      !Object.keys(restaurant).length ||
      !Object.keys(menu).length ||
      !Object.keys(orderItem).length
   ) return;

   const addCartItem = () => {
      setCartItems({
         itemID: orderItem.id,
         modifierID: modifierValue?.id,
         price: (orderItem.price + (modifierValue?.price || 0)) * quantity,
         quantity,
      });
      clearOrderItem();
      setModifierValue(null);
      setQuantity(1);
   }

   return (
      <Dialog
         open={!!Object.keys(orderItem).length}
         onOpenChange={() => clearOrderItem()}
      >
         <DialogContent
            onPointerDownOutside={(e) => e.preventDefault()}
            className="p-0 m-0 border-0 gap-0 w-full sm:w-auto h-full sm:h-auto"
            style={{ backgroundColor: restaurant.webSettings.backgroundColour }}
         >
            <DialogHeader>
               {orderItem?.images && (
                  <DialogTitle>
                     <img
                        src={orderItem.images[0].image}
                        alt={orderItem.name}
                        className="w-full max-h-[320px] object-cover object-center"
                     />
                  </DialogTitle>
               )}

               <DialogTrigger
                  className="absolute right-4 top-4 rounded-full ring-offset-background transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                  style={{ backgroundColor: restaurant.webSettings.backgroundColour }}
               >
                  <Cross2Icon className="h-7 w-7 shadow-[0px_2px_2px_0px_#0000001F]" />

                  <span className="sr-only">
                     Close
                  </span>
               </DialogTrigger>
            </DialogHeader>

            <DialogDescription className="overflow-auto">
               <div className="p-4 gap-2">
                  <span className="block font-bold text-2xl text-[#121212]">
                     {orderItem.name}
                  </span>

                  <span className="font-normal line-clamp-2 text-base tracking-wide text-[#464646]">
                     {orderItem.description}
                  </span>
               </div>

               {orderItem.modifiers?.map((modifier: Modifier) => (
                  <div key={modifier.id}>
                     <div className="py-4 px-6 bg-[#F8F9FA]">
                        <p className="font-bold text-base text-[#464646]">
                           {modifier.name}
                        </p>

                        <p className="font-normal text-base tracking-wide text-[#5F5F5F]">
                           {`Select ${modifier.maxChoices} option`}
                        </p>
                     </div>

                     {modifier?.items?.map((item) => {
                        if (!item.available) return null;

                        return (
                           <div
                              key={item.id}
                              className="flex justify-between items-center w-full py-4 px-6"
                              onClick={() => setModifierValue(item)}
                           >
                              <div className="gap-1">
                                 <p className="text-base font-medium text-[#121212]">
                                    {item.name}
                                 </p>

                                 <p className="font-normal text-base text-[#464646]">
                                    {currencyFormatted(restaurant.ccy, item.price)}
                                 </p>
                              </div>

                              <Input
                                 type="radio"
                                 value={item.id}
                                 checked={item.id === modifierValue?.id}
                                 name="modifier"
                                 className="w-6 h-6"
                              />
                           </div>
                        )
                     })}
                  </div>
               ))}
            </DialogDescription>

            <DialogFooter className="flex flex-col justify-center items-center pt-2 pb-6 px-6">
               <div className="flex items-center gap-2 p-2">
                  <Button
                     variant="ghost"
                     size="icon"
                     disabled={quantity === 1 || (orderItem.modifiers && !modifierValue)}
                     className="border-2 w-8 h-8 rounded-full"
                     style={{
                        backgroundColor: restaurant.webSettings.navBackgroundColour,
                        borderColor: restaurant.webSettings.primaryColour,
                     }}
                     onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  >
                     <MinusIcon
                        className="h-8 w-8"
                        color="white"
                     />
                  </Button>

                  <span className="font-semibold text-2xl text-center text-[#121212] w-12">
                     {quantity}
                  </span>

                  <Button
                     variant="ghost"
                     size="icon"
                     disabled={orderItem.modifiers && !modifierValue}
                     className="border-2 w-8 h-8 rounded-full"
                     style={{
                        backgroundColor: restaurant.webSettings.navBackgroundColour,
                        borderColor: restaurant.webSettings.primaryColour,
                     }}
                     onClick={() => setQuantity((prev) => prev + 1)}
                  >
                     <PlusIcon
                        className="h-8 w-8"
                        color="white"
                     />
                  </Button>
               </div>

               <Button
                  disabled={orderItem.modifiers && !modifierValue}
                  className="w-full py-1 px-6 gap-2 rounded-[40px] text-white font-medium text-lg tracking-wide text-center"
                  style={{ backgroundColor: restaurant.webSettings.primaryColour }}
                  onClick={addCartItem}
               >
                  Add to Order {currencyFormatted(restaurant.ccy, (orderItem.price + (modifierValue?.price || 0)) * quantity)}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export { ModalOrder };