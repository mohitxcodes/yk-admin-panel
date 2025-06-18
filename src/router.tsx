import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage"
import MainLayout from "./pages/MainLayout"
import DashboardPage from "./pages/dashboard/DashboardPage";
import BlogPage from "./pages/blogs/BlogPage";
import GuestLayout from "./routes/GuestLayout";
import ProtectedLayout from "./routes/ProctedLayout";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            { path: 'login', element: <LoginPage /> }
        ],
    },
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            {
                path: '/',
                element: <MainLayout />,
                children: [
                    { path: 'dashboard', element: <DashboardPage /> },
                    { path: 'blogs', element: <BlogPage /> },
                ]
            }
        ],
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />
    }
]);