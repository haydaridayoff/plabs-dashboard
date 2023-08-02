import { createBrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Career from "./pages/Career";
import CareerJob from "./pages/CareerJob";
import CareerJobForm from "./pages/CareerJobForm";
import CareerMain from "./pages/CareerMain";
import Contact from "./pages/Contact";
import Ecosystem from "./pages/Ecosystem";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Login from "./pages/Login";
import Project from "./pages/Project";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectDashboard from "./pages/ProjectDashboard";
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
        path: "project/*",
        element: <Project />,
        children: [
          {
            path: "dashboard",
            element: <ProjectDashboard />,
          },
          {
            path: ":id",
            element: <ProjectCreate />,
          },
          {
            path: "create",
            element: <ProjectCreate />,
          },
        ],
      },
      {
        path: "work",
        element: <Work />,
      },
      {
        path: "career/*",
        element: <Career />,
        children: [
          {
            path: "career",
            element: <CareerMain />,
          },
          {
            path: "job",
            element: <CareerJob />,
          },
          {
            path: "job/:id",
            element: <p>Job Detail</p>,
          },
          {
            path: "job/create",
            element: <CareerJobForm />,
          },
          {
            path: "applicant",
            element: <p>Applicant</p>,
          },
        ],
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
