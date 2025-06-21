import { motion } from 'framer-motion';
import { signOut } from "firebase/auth";
import { auth } from "../firebase"
import { Link, useLocation, } from 'react-router-dom';
import {
    FaHome,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaBook,
    FaNewspaper,
    FaLightbulb,
    FaEnvelope,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import ConfirmModal from './ConfirmModal';

const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FaNewspaper />, label: 'Blogs', path: '/blogs' },
    { icon: <FaLightbulb />, label: 'Highlights', path: '/highlights' },
    { icon: <FaBook />, label: 'Study Materials', path: '/study-materials' },
    { icon: <FaEnvelope />, label: 'Messages', path: '/messages' },
];

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const location = useLocation();
    const { user, loading } = useAuth();

    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLogout = async () => {
        setLogoutModalOpen(true);
    };

    const confirmLogout = async () => {
        setLogoutModalOpen(false);
        try {
            await signOut(auth);
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const cancelLogout = () => {
        setLogoutModalOpen(false);
    };

    return (
        <>
            <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                className={`h-screen bg-black/30 border-r border-white/10 fixed left-0 top-0 z-20 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}
            >
                {/* Toggle Button: only show on desktop */}
                {!isMobile && (
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="absolute -right-3 top-6 bg-black/70 p-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        {isCollapsed ? <FaBars className="text-gray-400" /> : <FaTimes className="text-gray-400" />}
                    </button>
                )}

                {/* Logo */}
                <div className="p-6">
                    <h1 className={`text-xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text ${isCollapsed ? 'text-center' : ''}`}>{isCollapsed ? 'YK' : 'Yashwant Kr.'}</h1>
                </div>

                {/* Navigation */}
                <nav className="mt-6 px-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all ${location.pathname === item.path
                                ? 'bg-white/10 text-white font-semibold'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'} font-medium`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                {/* User Profile Section */}
                <div className="absolute bottom-0 left-0 border-t border-gray-500/20 right-0 px-6 py-5 bg-gradient-to-t from-black/90 via-black/80 to-transparent backdrop-blur-2xl">
                    <div className={`flex flex-col items-center w-full gap-3`}>
                        {/* Email and logout button: only show email if not collapsed */}
                        {!isCollapsed && (
                            <span className="w-full text-center text-sm font-semibold text-white/90 tracking-tight break-all select-all mb-2">
                                {loading ? 'Loading...' : user?.email || 'No email'}
                            </span>
                        )}
                        <button
                            onClick={handleLogout}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400/30 cursor-pointer ${isCollapsed ? 'justify-center px-0 py-0' : ''}`}
                            title="Logout"
                        >
                            <FaSignOutAlt className="text-base opacity-80" />
                            {!isCollapsed && <span className="text-xs">Logout</span>}
                        </button>
                    </div>
                </div>
            </motion.div>
            <ConfirmModal
                open={logoutModalOpen}
                onConfirm={confirmLogout}
                onCancel={cancelLogout}
                title="Confirm Logout"
                description="Are you sure you want to log out?"
                confirmText="Logout"
                cancelText="Cancel"
            />
        </>
    );
}

export default Sidebar;