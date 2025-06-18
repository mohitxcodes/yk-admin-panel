import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedLayout = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // Or a spinner

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLayout;