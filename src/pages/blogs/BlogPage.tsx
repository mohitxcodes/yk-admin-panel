import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaPlus, FaImage, FaHashtag, FaTrash } from 'react-icons/fa';

interface Blog {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    hashtags: string[];
    imageUrl: string;
    createdAt: string;
}

function BlogPage() {
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        content: '',
        hashtags: [] as string[],
        imageUrl: '',
        currentHashtag: ''
    });

    // Mock blogs data - replace with actual data from your backend
    const [blogs, setBlogs] = useState<Blog[]>([
        {
            id: '1',
            title: 'Getting Started with Web Development',
            subtitle: 'A comprehensive guide for beginners',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            hashtags: ['webdev', 'beginners', 'tutorial'],
            imageUrl: 'https://picsum.photos/800/400',
            createdAt: '2024-03-20'
        }
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newBlog: Blog = {
            id: Date.now().toString(),
            title: formData.title,
            subtitle: formData.subtitle,
            content: formData.content,
            hashtags: formData.hashtags,
            imageUrl: formData.imageUrl || 'https://picsum.photos/800/400',
            createdAt: new Date().toISOString().split('T')[0]
        };
        setBlogs([newBlog, ...blogs]);
        setIsCreating(false);
        setFormData({
            title: '',
            subtitle: '',
            content: '',
            hashtags: [],
            imageUrl: '',
            currentHashtag: ''
        });
    };

    const handleHashtagAdd = () => {
        if (formData.currentHashtag && !formData.hashtags.includes(formData.currentHashtag)) {
            setFormData(prev => ({
                ...prev,
                hashtags: [...prev.hashtags, prev.currentHashtag],
                currentHashtag: ''
            }));
        }
    };

    const handleHashtagRemove = (hashtag: string) => {
        setFormData(prev => ({
            ...prev,
            hashtags: prev.hashtags.filter(h => h !== hashtag)
        }));
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
                    Blogs
                </h1>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors"
                >
                    <FaPlus />
                    <span>Create Blog</span>
                </motion.button>
            </div>

            {/* Create Blog Form */}
            {isCreating && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 mb-8"
                >
                    <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-gray-600 focus:ring-2 focus:ring-gray-600/20 transition-all"
                                required
                            />
                        </div>

                        {/* Subtitle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-gray-600 focus:ring-2 focus:ring-gray-600/20 transition-all"
                                required
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-gray-600 focus:ring-2 focus:ring-gray-600/20 transition-all min-h-[200px]"
                                required
                            />
                        </div>

                        {/* Hashtags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Hashtags</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={formData.currentHashtag}
                                    onChange={(e) => setFormData(prev => ({ ...prev, currentHashtag: e.target.value }))}
                                    className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-gray-600 focus:ring-2 focus:ring-gray-600/20 transition-all"
                                    placeholder="Add hashtag"
                                />
                                <button
                                    type="button"
                                    onClick={handleHashtagAdd}
                                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-colors"
                                >
                                    <FaHashtag />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.hashtags.map((hashtag) => (
                                    <span
                                        key={hashtag}
                                        className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-lg text-sm"
                                    >
                                        #{hashtag}
                                        <button
                                            type="button"
                                            onClick={() => handleHashtagRemove(hashtag)}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            <FaTrash className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="text"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                                    className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-gray-600 focus:ring-2 focus:ring-gray-600/20 transition-all"
                                    placeholder="Image URL"
                                />
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-colors"
                                >
                                    <FaImage />
                                </button>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="px-6 py-2 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                Publish Blog
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            )}

            {/* Blog List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <motion.div
                        key={blog.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden"
                    >
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                            <p className="text-gray-400 mb-4">{blog.subtitle}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {blog.hashtags.map((hashtag) => (
                                    <span
                                        key={hashtag}
                                        className="px-2 py-1 bg-gray-800 rounded-lg text-sm text-gray-400"
                                    >
                                        #{hashtag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-500 text-sm">{blog.createdAt}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default BlogPage;
