import Frontpage from "./pages/Frontpage.jsx";
import "./index.css";
import SecondPage from "./pages/SecondPage.jsx";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({ routeTree });

function App() {
  return (
    <>
      {/* <SecondPage />;<Frontpage /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
