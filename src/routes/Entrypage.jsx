import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Entrypage")({
  component: () => <div>Hello Entrypage!</div>,
});
