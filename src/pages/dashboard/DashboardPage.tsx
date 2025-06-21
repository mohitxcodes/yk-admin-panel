import { motion } from 'framer-motion';
import { FaBook, FaRegLightbulb, FaFileAlt, FaPlus, FaArrowRight, FaEnvelope, FaUser } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useBlogs from '../../hooks/useFetchBlogs';
import useHighlights from '../../hooks/useFetchHighlights';
import useFetchStudyMaterial from '../../hooks/useFetchStudyMaterial';
import useFetchMessages from '../../hooks/useFetchMessages';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
    const { user } = useAuth();
    const { blogs, loading: blogsLoading } = useBlogs();
    const { highlights, loading: highlightsLoading } = useHighlights();
    const { materials, loading: materialsLoading } = useFetchStudyMaterial();
    const { messages, loading: messagesLoading } = useFetchMessages();
    const navigate = useNavigate();

    // Stat summary (add total messages)
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
            label: 'Messages',
            value: messagesLoading ? '...' : messages.length,
            icon: <FaEnvelope className="w-6 h-6 text-white/90" />,
        },
    ];

    // Recent items
    const recentBlogs = blogs.slice(0, 1);
    const recentHighlights = highlights.slice(0, 1);
    const recentMessages = messages.slice(0, 2);

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

            {/* Stat Row - single row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex items-center gap-4 border border-white/10 rounded-xl px-5 py-6 bg-black/30 hover:border-white/30 transition-all min-h-[80px] backdrop-blur-sm shadow-lg"
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

            {/* Recent Activity - stacked vertically */}
            <div className="flex flex-col gap-8">
                {/* Recent Blog */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-bold text-white">Recent Blog</h2>
                        <button onClick={() => navigate('/blogs')} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-medium">
                            View All <FaArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                    {blogsLoading ? (
                        <div className="text-gray-500 text-sm py-8 flex flex-col items-center">Loading...</div>
                    ) : recentBlogs.length === 0 ? (
                        <div className="text-gray-500 text-sm py-8 flex flex-col items-center">No blogs yet.</div>
                    ) : (
                        recentBlogs.map(blog => (
                            <div key={blog.id} className="border border-white/10 rounded-xl bg-black/30 backdrop-blur-sm shadow flex flex-col p-4 gap-2 hover:border-white/30">
                                <span className="font-semibold text-white truncate text-base">{blog.title}</span>
                                <span className="text-xs text-gray-400 mb-1">{blog.createdAt}</span>
                                <span className="text-gray-300 text-xs line-clamp-2">{blog.subtitle}</span>
                            </div>
                        ))
                    )}
                </div>
                {/* Recent Highlight */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-bold text-white">Recent Highlight</h2>
                        <button onClick={() => navigate('/highlights')} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-medium">
                            View All <FaArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                    {highlightsLoading ? (
                        <div className="text-gray-500 text-sm py-8 flex flex-col items-center">Loading...</div>
                    ) : recentHighlights.length === 0 ? (
                        <div className="text-gray-500 text-sm py-8 flex flex-col items-center">No highlights yet.</div>
                    ) : (
                        recentHighlights.map(h => (
                            <div key={h.id} className="border border-white/10 rounded-xl bg-black/30 backdrop-blur-sm shadow flex flex-col p-4 gap-2 hover:border-white/30">
                                <span className="font-semibold text-white truncate text-base">{h.title}</span>
                                <span className="text-xs text-gray-400 mb-1">{h.year} &bull; {h.location}</span>
                                <span className="text-gray-300 text-xs line-clamp-2">{h.description}</span>
                            </div>
                        ))
                    )}
                </div>
                {/* Latest Messages */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-bold text-white">Latest Messages</h2>
                        <button onClick={() => navigate('/messages')} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-medium">
                            View All <FaArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                    {messagesLoading ? (
                        <div className="text-gray-500 text-sm py-8 flex flex-col items-center">Loading...</div>
                    ) : recentMessages.length === 0 ? (
                        <div className="text-gray-500 text-sm py-8 flex flex-col items-center">No messages yet.</div>
                    ) : (
                        recentMessages.map(msg => (
                            <div key={msg.id} className="border border-white/10 rounded-xl bg-black/30 backdrop-blur-sm shadow flex flex-col p-4 gap-2 hover:border-white/30">
                                <div className="flex items-center gap-2 mb-1">
                                    <FaUser className="text-gray-400 w-4 h-4" />
                                    <span className="text-white font-semibold text-sm truncate max-w-[120px]">{msg.name}</span>
                                    <span className="text-xs text-gray-400 truncate max-w-[120px] ml-2">{msg.email}</span>
                                </div>
                                <span className="font-bold text-white text-sm truncate">{msg.subject}</span>
                                <span className="text-xs text-gray-400 mb-1">{msg.createdAt}</span>
                                <span className="text-gray-300 text-xs line-clamp-2">{msg.content}</span>
                            </div>
                        ))
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
