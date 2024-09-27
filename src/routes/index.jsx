import { createFileRoute } from "@tanstack/react-router";
import Frontpage from "../pages/Frontpage";
import { CookiesProvider, useCookies } from "react-cookie";

export const Route = createFileRoute("/")({
  component: Front,
});

function Front() {
  const { id } = Route.useParams();
  const [cookies, setCookie] = useCookies(["user"]);

  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }

  return <Frontpage id={id} user={cookies.user} onLogin={handleLogin} />;
}
