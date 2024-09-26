import { createFileRoute } from "@tanstack/react-router";
import Frontpage from "../pages/Frontpage";
export const Route = createFileRoute("/")({
  component: Front,
});

function Front() {
  const { id } = Route.useParams();
  return <Frontpage id={id} />;
}
