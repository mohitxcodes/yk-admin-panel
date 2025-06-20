import { motion } from 'framer-motion';
import { FaBook, FaRegLightbulb, FaFileAlt, FaUsers, FaPlus, FaArrowRight } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useBlogs from '../../hooks/useFetchBlogs';
import useHighlights from '../../hooks/useFetchHighlights';
import useFetchStudyMaterial from '../../hooks/useFetchStudyMaterial';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
    const { user } = useAuth();
    const { blogs, loading: blogsLoading } = useBlogs();
    const { highlights, loading: highlightsLoading } = useHighlights();
    const { materials, loading: materialsLoading } = useFetchStudyMaterial();
    const navigate = useNavigate();
    console.log(user)

    // Stat summary
    const stats = [
        {
            label: 'Blogs',
            value: blogsLoading ? '...' : blogs.length,
            icon: <FaBook className="w-6 h-6 text-white/90" />,
        },
        {
            label: 'Highlights',
            value: highlightsLoading ? '...' : highlights.length,
            icon: <FaRegLightbulb className="w-6 h-6 text-white/90" />,
        },
        {
            label: 'Materials',
            value: materialsLoading ? '...' : materials.length,
            icon: <FaFileAlt className="w-6 h-6 text-white/90" />,
        },
        {
            label: 'Users',
            value: 1234, // Replace with real user count if available
            icon: <FaUsers className="w-6 h-6 text-white/90" />,
        },
    ];

    // Recent items
    const recentBlogs = blogs.slice(0, 3);
    const recentHighlights = highlights.slice(0, 3);

    return (
        <div className="relative min-h-screen px-4 max-w-7xl mx-auto pb-32">
            {/* Header */}
            <div className="flex items-center justify-between mt-10 mb-8">
                <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
                    Dashboard
                </h1>
                {/* Quick Actions */}
                <div className="flex gap-3">
                    <motion.button
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/blogs/create')}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg border border-white/20 shadow transition font-semibold text-sm"
                    >
                        <FaPlus /> Blog
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/study-materials')}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg border border-white/20 shadow transition font-semibold text-sm"
                    >
                        <FaPlus /> Material
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/highlights/create')}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg border border-white/20 shadow transition font-semibold text-sm"
                    >
                        <FaPlus /> Highlight
                    </motion.button>
                </div>
            </div>

            {/* Stat Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex items-center gap-4 border border-white/10 rounded-xl px-5 py-6 bg-transparent hover:border-white/30 transition-all min-h-[80px]"
                    >
                        <div className="bg-gray-900/60 rounded-xl p-2 border border-gray-800">
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Recent Blogs */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-white">Recent Blogs</h2>
                        <button onClick={() => navigate('/blogs')} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-medium">
                            View All <FaArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                    {recentBlogs.length === 0 ? (
                        <div className="text-gray-500 text-sm py-8 flex flex-col items-center">
                            No blogs yet.
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-2">
                            {recentBlogs.map(blog => (
                                <li key={blog.id} className="flex flex-col border-b border-white/10 pb-2 last:border-b-0">
                                    <span className="font-semibold text-white truncate">{blog.title}</span>
                                    <span className="text-xs text-gray-400">{blog.createdAt}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* Recent Highlights */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-white">Recent Highlights</h2>
                        <button onClick={() => navigate('/highlights')} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-medium">
                            View All <FaArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                    {recentHighlights.length === 0 ? (
                        <div className="text-gray-500 text-sm py-8 flex flex-col items-center">
                            No highlights yet.
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-2">
                            {recentHighlights.map(h => (
                                <li key={h.id} className="flex flex-col border-b border-white/10 pb-2 last:border-b-0">
                                    <span className="font-semibold text-white truncate">{h.title}</span>
                                    <span className="text-xs text-gray-400">{h.year} &bull; {h.location}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Minimal User Info at bottom right */}
            <div className="fixed bottom-4 right-6 z-50 text-xs text-gray-400 bg-black/60 px-4 py-2 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                {user?.displayName || user?.email || 'Account'}
            </div>
        </div>
    );
}

export default DashboardPage;
