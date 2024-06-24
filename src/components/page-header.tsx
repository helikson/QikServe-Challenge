import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import useRestaurantStore from "@/store/RestaurantStore";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const defaultMenuStyle = "block font-normal text-xl tracking-wide text-center w-full";

function PageHeader() {
   const restaurant = useRestaurantStore((state) => state.restaurant);

   if (!Object.keys(restaurant).length) return null;

   const routesClassName = ({ isActive }: { isActive: boolean }): string =>
      cn(
         defaultMenuStyle,
         "text-white lg:w-1/3",
         isActive
            ? "lg:border-b-[5px] lg:border-white"
            : "text-secondary-foreground hidden lg:block",
      );

   const routesClassNameMobile = ({ isActive }: { isActive: boolean }): string => cn(
      defaultMenuStyle,
      isActive
         ? "font-semibold border-b-[5px]"
         : "text-secondary-foreground",
   )

   return (
      <header
         className="flex flex-row justify-between h-14 items-center shadow-[0px_4px_4px_0px_#00000029]"
         style={{
            backgroundColor: restaurant.webSettings.navBackgroundColour,
            color: restaurant.webSettings.backgroundColour,
         }}
      >
         <nav className="w-full z-20 top-0 start-0">
            <div className="flex flex-wrap items-center justify-center mx-auto p-4">
               <div className="flex flex-row lg:space-x-8 p-0 mt-0 font-medium w-full lg:w-6/12">
                  <NavLink to="/" className={routesClassName}>
                     Menu
                  </NavLink>

                  <NavLink to="/login" className={routesClassName}>
                     Entrar
                  </NavLink>

                  <NavLink to="/contact" className={routesClassName}>
                     Contato
                  </NavLink>
               </div>

               <div className="w-7 h-7 lg:hidden absolute right-4">
                  <DropdownMenu>
                     <DropdownMenuTrigger>
                        <HamburgerMenuIcon className="w-7 h-7" color="white" />
                     </DropdownMenuTrigger>

                     <DropdownMenuContent style={{ backgroundColor: restaurant.webSettings.backgroundColour }}>
                        <DropdownMenuItem>
                           <NavLink to="/" className={routesClassNameMobile}>
                              Menu
                           </NavLink>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                           <NavLink to="/login" className={routesClassNameMobile}>
                              Entrar
                           </NavLink>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                           <NavLink to="/contact" className={routesClassNameMobile}>
                              Contato
                           </NavLink>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>
         </nav>
      </header>
   );
}

export { PageHeader };
