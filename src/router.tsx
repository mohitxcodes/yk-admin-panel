import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import BlogPage from './pages/blogs/BlogPage';
import MainLayout from './pages/MainLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: 'dashboard',
                element: <DashboardPage />
            },
            {
                path: 'blogs',
                element: <BlogPage />
            },
            {
                path: 'highlights',
                element: <DashboardPage /> // Replace with HighlightsPage when created
            },
            {
                path: 'study-materials',
                element: <DashboardPage /> // Replace with StudyMaterialsPage when created
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />
    }
]); 