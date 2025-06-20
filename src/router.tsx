import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage"
import MainLayout from "./pages/MainLayout"
import DashboardPage from "./pages/dashboard/DashboardPage";
import BlogPage from "./pages/blogs/BlogPage";
import GuestLayout from "./routes/GuestLayout";
import ProtectedLayout from "./routes/ProctedLayout";
import CreateBlogPage from './pages/blogs/CreateBlogPage';
import StudyMaterialPage from './pages/studymaterial/StudyMaterialPage';
import HighlightsPage from './pages/highlights/HIghlightsPage';
import CreateHighlightsPage from './pages/highlights/CreateHighlightsPage';

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
                    { path: 'blogs/create', element: <CreateBlogPage /> },
                    { path: 'study-materials', element: <StudyMaterialPage /> },
                    { path: 'highlights', element: <HighlightsPage /> },
                    { path: 'highlights/create', element: <CreateHighlightsPage /> },
                ]
            }
        ],
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />
    }
]);