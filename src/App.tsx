import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { NoMatch } from "./components/no-match";
import { fetchMenu, fetchRestaurants } from "./api";
import useRestaurantStore from "./store/RestaurantStore";
import { Menu, Restaurant } from "./api/DTO";
import useMenuStore from "./store/MenuStore";
import { useShallow } from "zustand/react/shallow";
import { RestaurantSkeleton } from "./pages/Restaurant/components/skeleton";

const RestaurantPage = lazy(() => import("@/pages/Restaurant"));

function App() {
   const setRestaurant = useRestaurantStore((state) => state.setRestaurant);
   const [setMenuItems, clearSectionItems] = useMenuStore(useShallow((state) => ([state.setItems, state.clearSectionItems])));

   useEffect(() => {
      fetchRestaurants().then((res) => setRestaurant(res as Restaurant));

      fetchMenu().then((res) => {
         setMenuItems(res as Menu);
         clearSectionItems();
      });
   }, []);

   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route
               index
               element={
                  <Suspense fallback={RestaurantSkeleton()}>
                     <RestaurantPage />
                  </Suspense>
               }
            />
            <Route path="*" element={<NoMatch />} />
         </Route>
      </Routes>
   );
}

export default App;
