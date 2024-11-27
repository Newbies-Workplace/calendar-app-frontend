import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/NotFound";

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  ),
  notFoundComponent: () => <NotFound />,
});
