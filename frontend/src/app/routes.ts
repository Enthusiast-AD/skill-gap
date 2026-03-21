import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Upload from "./pages/Upload";
import Analyzing from "./pages/Analyzing";
import Results from "./pages/Results";
import Roadmap from "./pages/Roadmap";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/upload",
    Component: Upload,
  },
  {
    path: "/analyzing",
    Component: Analyzing,
  },
  {
    path: "/results",
    Component: Results,
  },
  {
    path: "/roadmap",
    Component: Roadmap,
  },
]);
