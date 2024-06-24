import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { PageHeader } from "./page-header";

function Layout(): ReactElement {
   return (
      <main className="overflow-auto h-full">
         <PageHeader />

         <Outlet />
      </main>
   );
}

export { Layout };
