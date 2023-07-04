import { createBrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Ecosystem from "./pages/Ecosystem";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Login from "./pages/Login";
import Project from "./pages/Project";
import Root from "./pages/Root";
import Service from "./pages/Service";
import Work from "./pages/Work";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "service",
        element: <Service />,
      },
      {
        path: "project",
        element: <Project />,
      },
      {
        path: "work",
        element: <Work />,
      },
      {
        path: "career",
        element: <Career />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "ecosystem",
        element: <Ecosystem />,
      },
      {
        path: "journal",
        element: <Journal />,
      },
    ],
  },
]);

export default router;
