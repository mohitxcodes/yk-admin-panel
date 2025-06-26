import { motion } from 'framer-motion';
import { FaRegFileAlt, FaRegCalendarAlt, FaTrash, FaMapMarkerAlt, FaTag } from 'react-icons/fa';
import useHighlights from '../../hooks/useFetchHighlights';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';

function HighlightsPage() {
    const { highlights } = useHighlights();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteDoc(doc(db, 'highlights', deleteId));
            toast.success('Highlight deleted successfully!');
        } catch (error) {
            console.error('Error deleting highlight:', error);
            toast.error('Failed to delete highlight.');
        } finally {
            setModalOpen(false);
            setDeleteId(null);
        }
    };

    const handleCancelDelete = () => {
        setModalOpen(false);
        setDeleteId(null);
    };

    return (
        <div className="relative min-h-screen">
            <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 pb-32">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-8 sm:mt-10 mb-4 sm:mb-6 gap-4">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
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
                                className="border border-white/10 rounded-xl shadow-lg overflow-hidden flex flex-col sm:flex-row items-start sm:items-center transition-all duration-200 group hover:shadow-2xl hover:-translate-y-0.5 hover:border-white/30 bg-transparent backdrop-blur-sm relative min-h-[72px]"
                            >
                                {/* Highlight Image */}
                                <img
                                    src={highlight.imageUrl}
                                    alt={highlight.title}
                                    className="w-full sm:w-16 h-40 sm:h-16 object-cover rounded-t-xl sm:rounded-t-none sm:rounded-l-xl"
                                />
                                {/* Highlight Content */}
                                <div className="px-4 py-2 flex flex-col flex-1 min-w-0 justify-center">
                                    <div className="flex flex-wrap gap-2 items-center mb-1">
                                        <h3 className="text-base font-bold text-white truncate mr-2">{highlight.title}</h3>
                                        <span className="text-xs text-gray-400 flex items-center gap-1"><FaRegCalendarAlt /> {highlight.year}</span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1"><FaMapMarkerAlt /> {highlight.location}</span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1"><FaTag /> {highlight.category}</span>
                                    </div>
                                    <p className="text-gray-300 text-xs mb-1 line-clamp-2 pr-0 sm:pr-28">{highlight.description}</p>
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
                                    onClick={() => handleDeleteClick(highlight.id)}
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
            <ConfirmModal
                open={modalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                title="Delete Highlight"
                description="Are you sure you want to delete this highlight? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div>
    );
}

export default HighlightsPage;
