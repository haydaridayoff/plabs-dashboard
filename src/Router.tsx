import {createBrowserRouter} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Project from "./pages/Project";
import Work from "./pages/Work";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Ecosystem from "./pages/Ecosystem";
import Journal from "./pages/Journal";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/about",
            element: <About/>
        },
        {
            path: "/service",
            element: <Service/>
        },
        {
            path: "/project",
            element: <Project/>
        },
        {
            path: "/work",
            element: <Work/>
        },
        {
            path: "/career",
            element: <Career/>
        },
        {
            path: "/contact",
            element: <Contact/>
        },
        {
            path: "/ecosystem",
            element: <Ecosystem/>
        },
        {
            path: "/journal",
            element: <Journal/>
        }
    ]
);

export default router;

