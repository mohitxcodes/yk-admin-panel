import { motion } from 'framer-motion';
import { FaUserCircle, FaSignOutAlt, FaBook, FaRegLightbulb, FaFileAlt, FaUsers } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

function DashboardPage() {
    const { user } = useAuth();

    // Mock stats (replace with real data as needed)
    const stats = [
        {
            label: 'Total Blogs',
            value: 24,
            icon: <FaBook className="w-8 h-8 text-white/90" />,
        },
        {
            label: 'Total Highlights',
            value: 12,
            icon: <FaRegLightbulb className="w-8 h-8 text-white/90" />,
        },
        {
            label: 'Study Materials',
            value: 8,
            icon: <FaFileAlt className="w-8 h-8 text-white/90" />,
        },
        {
            label: 'Total Users',
            value: 1234,
            icon: <FaUsers className="w-8 h-8 text-white/90" />,
        },
    ];

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <div className="relative">
            {/* Top Bar */}
            <div className="flex justify-end items-center gap-4 mb-8 sticky top-0 z-20 bg-transparent">
                <div className="flex items-center gap-3 bg-gray-900/60 border border-gray-800 rounded-2xl px-5 py-2 shadow-lg backdrop-blur-md">
                    {/* Avatar */}
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="avatar"
                            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow"
                        />
                    ) : (
                        <FaUserCircle className="w-10 h-10 text-gray-400" />
                    )}
                    {/* Email or Name */}
                    <div className="flex flex-col min-w-0">
                        <span className="text-base font-semibold text-white truncate max-w-[140px]">
                            {user?.displayName || user?.email || 'Account'}
                        </span>
                        <span className="text-xs text-gray-400 truncate max-w-[140px]">
                            {user?.email}
                        </span>
                    </div>
                    {/* Logout */}
                    <motion.button
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        className="ml-2 px-2 py-1 rounded-lg text-gray-400 hover:bg-blue-600/20 hover:text-white transition-all"
                        title="Logout"
                    >
                        <FaSignOutAlt className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>

            {/* Main Dashboard Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/70 backdrop-blur-2xl rounded-3xl border border-gray-800 p-10 shadow-2xl"
            >
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-gray-300 to-gray-500 text-transparent bg-clip-text mb-12 tracking-tight">
                    Dashboard Overview
                </h1>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)' }}
                            whileTap={{ scale: 0.98 }}
                            className={
                                `relative overflow-hidden rounded-2xl p-7 flex flex-col items-start justify-between min-h-[160px] shadow-xl bg-gray-800/80 border border-gray-700 group cursor-pointer transition-all duration-300`
                            }
                        >
                            <div className="relative z-10 flex items-center gap-4 mb-4">
                                <div className="bg-gray-900/60 rounded-xl p-3 shadow-lg border border-gray-700">
                                    {stat.icon}
                                </div>
                                <span className="text-4xl font-bold text-white drop-shadow-lg">{stat.value}</span>
                            </div>
                            <div className="relative z-10 mt-auto">
                                <span className="text-lg font-medium text-white/80 tracking-wide drop-shadow">{stat.label}</span>
                            </div>
                            <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-60 transition-all duration-300 pointer-events-none select-none">
                                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.08" strokeWidth="4" /></svg>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default DashboardPage;
