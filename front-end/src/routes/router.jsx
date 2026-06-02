import { createBrowserRouter } from "react-router";
import AppLayout from "../components/Layout/AppLayout";
import DashboradPage from "../pages/DashboradPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProjectsPage from "../pages/ProjectsPage";
import ProjectsDetailsPage from "../pages/ProjectsDetailsPage";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
    {
        path: "/dashboard",
        element: (
            <AppLayout>
                <DashboradPage />
            </AppLayout>
        ),
    },
    {
        path: "/projects",
        element: (
            <AppLayout>
                <ProjectsPage />
            </AppLayout>
        ),
    },
    {
        path: "/projects/:id",
        element: (
            <AppLayout>
                <ProjectsDetailsPage />
            </AppLayout>
        ),
    },

]);

