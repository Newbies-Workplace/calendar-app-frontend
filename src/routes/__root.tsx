import * as React from "react";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/NotFound";

dayjs.locale("pl");

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  ),
  notFoundComponent: () => <NotFound />,
});
