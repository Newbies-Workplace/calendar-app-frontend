import { createFileRoute } from "@tanstack/react-router";
import SecondPage from "../../pages/SecondPage";
export const Route = createFileRoute("/calendar/$id")({
  component: Calendartest,
});

function Calendartest() {
  const { id } = Route.useParams();

  return <SecondPage id={id} />;
}

// <SecondPage />
