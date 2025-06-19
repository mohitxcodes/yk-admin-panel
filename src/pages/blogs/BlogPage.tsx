import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaRegFileAlt, FaRegCalendarAlt } from 'react-icons/fa';
import useBlogs, { type Blog } from "../../hooks/useFetchBlogs"


function BlogPage() {
    const navigate = useNavigate();
    const { blogs, loading } = useBlogs();

    return (
        <div className="relative min-h-screen">

            <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
                {/* Header Row */}
                <div className="flex items-center justify-between mt-10 mb-12">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
                        Blogs
                    </h1>
                    <motion.button
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/blogs/create')}
                        className="flex items-center gap-2 px-6 py-2 bg-white/10 text-white rounded-xl shadow border border-white/20 hover:bg-white/20 transition-all font-bold text-base backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        <span className="text-xl font-bold">+</span>
                        <span>Create Blog</span>
                    </motion.button>
                </div>

                {/* Blog List */}
                {blogs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                        <FaRegFileAlt className="w-16 h-16 mb-4 opacity-30" />
                        <p className="text-lg font-semibold mb-2">No blogs found</p>
                        <p className="text-sm">Start by creating your first blog post!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogs.map((blog) => (
                            <motion.div
                                key={blog.id}
                                whileHover={{ scale: 1.03, borderColor: '#fff', boxShadow: '0 8px 32px 0 rgba(255,255,255,0.08)' }}
                                className="border border-white/10 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-200 group hover:shadow-2xl hover:-translate-y-1 hover:border-white/30 bg-transparent backdrop-blur-sm"
                            >
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-5 flex flex-col flex-1">
                                    <span className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                                        <FaRegCalendarAlt className="inline-block" /> {blog.createdAt}
                                    </span>
                                    <h3 className="text-lg font-bold text-white mb-1 truncate">{blog.title}</h3>
                                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{blog.subtitle}</p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {blog.hashtags.map(tag => (
                                            <span key={tag} className="bg-white/5 text-gray-200 border border-white/10 rounded px-2 py-0.5 text-xs">{tag}</span>
                                        ))}
                                    </div>
                                    <a href="#" className="mt-auto text-gray-200 text-sm flex items-center gap-1 hover:underline">
                                        Read More <span className="text-lg">→</span>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogPage;
