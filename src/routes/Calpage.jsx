import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/Calpage")({
  component: () => <div>Hello /Calpage! test</div>,
});
