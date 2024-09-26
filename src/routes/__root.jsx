import * as React from "react";
import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      {/* <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Entrypage
        </Link>{" "}
        <Link to="/calendar/1" className="[&.active]:font-bold">
          Calpage
        </Link>
      </div> */}
      <Outlet />
    </React.Fragment>
  ),
});
