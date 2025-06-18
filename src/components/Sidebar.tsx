import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
    FaHome,
    FaChartBar,
    FaUsers,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import { useState } from 'react';

const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FaChartBar />, label: 'Analytics', path: '/analytics' },
    { icon: <FaUsers />, label: 'Users', path: '/users' },
    { icon: <FaCog />, label: 'Settings', path: '/settings' },
];

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

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

            {/* Logout Button */}
            <div className="absolute bottom-6 left-0 right-0 px-4">
                <button
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl w-full text-gray-400 hover:bg-white/5 hover:text-white transition-all ${isCollapsed ? 'justify-center' : ''
                        }`}
                >
                    <FaSignOutAlt className="text-lg" />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </motion.div>
    );
}

export default Sidebar; 