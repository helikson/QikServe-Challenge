import useCartStore from "@/store/CartStore";
import useMenuStore from "@/store/MenuStore";
import { currencyFormatted } from "@/lib/utils";
import useRestaurantStore from "@/store/RestaurantStore";
import { ModifierItem } from "@/api/DTO";
import { Button } from "@/components/ui/button";
import { Cross2Icon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useShallow } from "zustand/react/shallow";
import { CartSkeleton } from "../skeleton/cart";
import { useRef } from "react";

function Cart() {
   const cartRef = useRef<HTMLDivElement>(null);
   const restaurant = useRestaurantStore((state) => (state.restaurant));
   const [cartItems, subtractItem, addItem] = useCartStore(useShallow((state) => ([state.cartItems, state.subtractItem, state.addItem])));
   const getSectionItem = useMenuStore((state) => (state.getSectionItem));

   if (!Object.keys(restaurant).length) return CartSkeleton();

   return (
      <div>
         <div className="block lg:hidden fixed bottom-0 left-0 right-0 w-screen px-6 pt-2 pb-6 gap-2 backdrop-blur-sm">
            <Button
               onClick={() => cartRef.current.classList.toggle("hidden")}
               className="w-full rounded-[40px] text-white tracking-wide text-center"
               style={{ backgroundColor: restaurant.webSettings.primaryColour }}
            >
               Your basket • {cartItems.length} item
            </Button>
         </div>

         <div
            ref={cartRef}
            className="hidden lg:block shadow-[0px_2px_14px_0px_#00000026] bg-[#F8F9FA] fixed lg:relative top-0 lg:top-auto right-0 lg:right-auto z-30 lg:z-auto w-full lg:w-auto h-full lg:h-auto"
         >
            <div className="h-[10%] lg:h-auto flex lg:block justify-center lg:justify-normal items-center lg:items-baseline rounded-t-md rounded-r-md px-6 py-4">
               <h1 className="font-medium text-2xl tracking-wide text-[#464646]">
                  Carrinho
               </h1>

               <Button
                  variant="ghost"
                  onClick={() => cartRef.current.classList.toggle("hidden")}
                  className="block lg:hidden absolute top-2 right-4 p-0 m-0"
               >
                  <Cross2Icon
                     className="h-7 w-7"
                     style={{ color: restaurant.webSettings.primaryColour }}
                  />
               </Button>
            </div>

            {cartItems.length ? (
               <div className="h-[75%] lg:h-auto overflow-y-auto">
                  <div
                     className="border-b-[1px] border-[#EEEEEE]"
                     style={{ backgroundColor: restaurant.webSettings.backgroundColour }}
                  >
                     {cartItems.map((item, index) => {
                        const sectionItem = getSectionItem(item.itemID);
                        let modifierApplied: ModifierItem = null;

                        if (item.modifierID) {
                           sectionItem.modifiers.forEach((modifier) => {
                              const modifierItem = modifier.items.find(modifierItem => modifierItem.id === item.modifierID);

                              if (modifierItem) {
                                 modifierApplied = modifierItem;
                                 return;
                              }
                           });
                        }

                        return (
                           <div
                              key={`${index}_${sectionItem.id}`}
                              className="flex justify-between py-2 px-4"
                           >
                              <div>
                                 <p className="text-base font-normal text-[#121212]">
                                    {sectionItem.name}
                                 </p>

                                 {modifierApplied && (
                                    <p className="text-base font-normal text-[#5F5F5F]">
                                       {modifierApplied.name}
                                    </p>
                                 )}

                                 <div className="flex items-center gap-2 p-2">
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       className="border-2 w-5 h-5 rounded-full"
                                       style={{
                                          backgroundColor: restaurant.webSettings.navBackgroundColour,
                                          borderColor: restaurant.webSettings.primaryColour
                                       }}
                                       onClick={() => {
                                          subtractItem({
                                             ...item,
                                             price: modifierApplied?.price || sectionItem.price
                                          });
                                       }}
                                    >
                                       <MinusIcon
                                          className="h-5 w-5"
                                          color="white"
                                       />
                                    </Button>

                                    <span className="font-bold text-base text-center text-[#121212] w-8">
                                       {item.quantity}
                                    </span>

                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       className="border-2 w-5 h-5 rounded-full"
                                       style={{
                                          backgroundColor: restaurant.webSettings.navBackgroundColour,
                                          borderColor: restaurant.webSettings.primaryColour
                                       }}
                                       onClick={() => {
                                          addItem({
                                             ...item,
                                             price: modifierApplied?.price || sectionItem.price
                                          });
                                       }}
                                    >
                                       <PlusIcon
                                          className="h-3 w-3"
                                          color="white"
                                       />
                                    </Button>
                                 </div>
                              </div>

                              <p className="font-medium text-base text-right tracking-wide">
                                 {currencyFormatted(restaurant.ccy, item.price)}
                              </p>
                           </div>
                        )
                     })}
                  </div>

                  <div className="flex justify-between gap-6 p-4">
                     <p className="font-light text-2xl text-[#121212]">
                        Total:
                     </p>

                     <p className="text-2xl text-right text-[#121212]">
                        {currencyFormatted(restaurant.ccy, cartItems.reduce((acc, item) => acc + item.price, 0))}
                     </p>
                  </div>
               </div>
            ) : (
               <p
                  className="h-[75%] lg:h-auto p-6 text-base font-normal text-[#464646]"
                  style={{ backgroundColor: restaurant.webSettings.backgroundColour }}
               >
                  Seu carrinho está vazio
               </p>
            )}

            <div className="block h-[15%] lg:hidden w-full bottom-0 pt-2 pb-6 px-6">
               <Button
                  onClick={() => cartRef.current.classList.toggle("hidden")}
                  className="w-full py-4 px-6 gap-6 h-12 rounded-[40px] text-white tracking-wide text-center"
                  style={{ backgroundColor: restaurant.webSettings.primaryColour }}
               >
                  Checkout now
               </Button>
            </div>
         </div>
      </div>
   )
}

export { Cart };