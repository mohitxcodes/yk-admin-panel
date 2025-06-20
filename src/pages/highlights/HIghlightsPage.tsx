import { motion } from 'framer-motion';
import { FaRegFileAlt, FaRegCalendarAlt, FaTrash, FaMapMarkerAlt, FaTag } from 'react-icons/fa';
import useHighlights from '../../hooks/useFetchHighlights';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function HighlightsPage() {
    const { highlights, loading } = useHighlights();

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this highlight?')) return;
        try {
            await deleteDoc(doc(db, 'highlights', id));
            alert('Highlight deleted successfully!');
            // Optionally, you may want to refresh the highlights list here if not auto-updating
        } catch (error) {
            console.error('Error deleting highlight:', error);
            alert('Failed to delete highlight.');
        }
    };

    return (
        <div className="relative min-h-screen">
            <div className="relative z-10 max-w-7xl mx-auto px-4 pb-32">
                {/* Header Row */}
                <div className="flex items-center justify-between mt-10 mb-6">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
                        Highlights
                    </h1>
                    <motion.button
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => window.location.href = '/highlights/create'}
                        className="flex cursor-pointer items-center gap-2 px-5 py-2 bg-white text-black rounded-lg border border-white/20 shadow-lg transition font-semibold text-sm"
                        aria-label="Create new highlight"
                    >
                        <span className="mr-2">+</span>
                        <span>Create Highlight</span>
                    </motion.button>
                </div>

                {/* Highlights List */}
                {highlights.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                        <FaRegFileAlt className="w-16 h-16 mb-4 opacity-30" />
                        <p className="text-lg font-semibold mb-2">No highlights found</p>
                        <p className="text-sm">Start by adding your first highlight!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {highlights.map((highlight) => (
                            <motion.div
                                key={highlight.id}
                                whileHover={{ scale: 1.01, borderColor: '#fff', boxShadow: '0 8px 32px 0 rgba(255,255,255,0.08)' }}
                                className="border border-white/10 rounded-xl shadow-lg overflow-hidden flex flex-row items-center transition-all duration-200 group hover:shadow-2xl hover:-translate-y-0.5 hover:border-white/30 bg-transparent backdrop-blur-sm relative min-h-[72px]"
                            >
                                {/* Highlight Image */}
                                <img
                                    src={highlight.imageUrl}
                                    alt={highlight.title}
                                    className="w-16 h-16 object-cover rounded-l-xl hidden sm:block"
                                />
                                {/* Highlight Content */}
                                <div className="px-4 py-2 flex flex-col flex-1 min-w-0 justify-center">
                                    <div className="flex flex-wrap gap-2 items-center mb-1">
                                        <h3 className="text-base font-bold text-white truncate mr-2">{highlight.title}</h3>
                                        <span className="text-xs text-gray-400 flex items-center gap-1"><FaRegCalendarAlt /> {highlight.year}</span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1"><FaMapMarkerAlt /> {highlight.location}</span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1"><FaTag /> {highlight.category}</span>
                                    </div>
                                    <p className="text-gray-300 text-xs mb-1 line-clamp-2 pr-28">{highlight.description}</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            {highlight.hashtags.map(tag => (
                                                <span key={tag} className="bg-white/5 text-gray-200 border border-white/10 rounded px-1.5 py-0.5 text-[10px]">{tag}</span>
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-400 mb-0.5 flex items-center gap-1">
                                            <FaRegCalendarAlt className="inline-block" /> {highlight.createdAt}
                                        </span>
                                    </div>
                                </div>
                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDelete(highlight.id)}
                                    className="flex items-center gap-1 absolute top-2 right-2 z-10 px-2 py-1 rounded text-xs cursor-pointer font-semibold text-red-500 bg-white/10 hover:bg-red-100 hover:text-red-700 transition-all"
                                    title="Delete highlight"
                                >
                                    <FaTrash className="w-3 h-3" />
                                    Delete
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HighlightsPage;
