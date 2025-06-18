import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';

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
        path: '/dashboard',
        element: <DashboardPage />
    },
    {
        path: '/blogs',
        element: <DashboardPage /> // Replace with BlogsPage when created
    },
    {
        path: '/highlights',
        element: <DashboardPage /> // Replace with HighlightsPage when created
    },
    {
        path: '/study-materials',
        element: <DashboardPage /> // Replace with StudyMaterialsPage when created
    },
    {
        path: '/users',
        element: <DashboardPage /> // Replace with UsersPage when created
    },
    {
        path: '/settings',
        element: <DashboardPage /> // Replace with SettingsPage when created
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />
    }
]); 