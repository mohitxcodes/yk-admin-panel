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
    FaUserCircle
} from 'react-icons/fa';
import { useState } from 'react';

const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FaNewspaper />, label: 'Blogs', path: '/blogs' },
    { icon: <FaLightbulb />, label: 'Highlights', path: '/highlights' },
    { icon: <FaBook />, label: 'Study Materials', path: '/study-materials' },
];

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const user = {
        email: 'admin@example.com',
        avatar: null // Set to null to use default avatar
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Logged out successfully");
            // optional: redirect manually if needed
            // navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className={`h-screen bg-gray-900/30 backdrop-blur-sm border-r border-gray-800 fixed left-0 top-0 z-20 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 bg-gray-800 p-1.5 rounded-full border border-gray-700 hover:bg-gray-700 transition-colors"
            >
                {isCollapsed ? <FaBars className="text-gray-400" /> : <FaTimes className="text-gray-400" />}
            </button>

            {/* Logo */}
            <div className="p-6">
                <h1 className={`text-xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text ${isCollapsed ? 'text-center' : ''
                    }`}>
                    {isCollapsed ? 'YK' : 'YK Admin'}
                </h1>
            </div>

            {/* Navigation */}
            <nav className="mt-6 px-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all ${location.pathname === item.path
                            ? 'bg-white/10 text-white'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                ))}
            </nav>

            {/* User Profile Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                        {user.avatar ? (
                            <img src={user.avatar} alt="User avatar" className="w-full h-full object-cover" />
                        ) : (
                            <FaUserCircle className="w-8 h-8 text-gray-400" />
                        )}
                    </div>

                    {/* User Info */}
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {user.email}
                            </p>
                        </div>
                    )}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all ${isCollapsed ? 'justify-center' : ''
                            }`}
                    >
                        <FaSignOutAlt className="text-lg" />
                        {!isCollapsed && <span className="text-sm">Logout</span>}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default Sidebar; 