import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaSpinner } from "react-icons/fa";

const ProtectedLayout = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
                <FaSpinner className="animate-spin text-white text-4xl" />
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLayout;