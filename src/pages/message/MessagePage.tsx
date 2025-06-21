import { motion } from 'framer-motion';
import { FaRegEnvelope, FaUser, FaRegFileAlt, FaTrash } from 'react-icons/fa';
import useFetchMessages from '../../hooks/useFetchMessages';
import { db } from '../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';

export default function MessagePage() {
    const { messages, loading } = useFetchMessages();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteDoc(doc(db, 'messages', deleteId));
            toast.success('Message deleted successfully!');
        } catch (error) {
            console.error('Error deleting message:', error);
            toast.error('Failed to delete message.');
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
                        Messages
                    </h1>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                        <span className="animate-spin mb-4"><FaRegEnvelope className="w-10 h-10 opacity-30" /></span>
                        <p className="text-lg font-semibold mb-2">Loading messages...</p>
                    </div>
                ) : (!messages || messages.length === 0) ? (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                        <FaRegFileAlt className="w-16 h-16 mb-4 opacity-30" />
                        <p className="text-lg font-semibold mb-2">No messages found</p>
                        <p className="text-sm">No user messages have been received yet.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                whileHover={{ scale: 1.01 }}
                                className="border border-white/10 rounded-xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center backdrop-blur-sm hover:border-white/30 bg-black/30 relative min-h-[72px]"
                            >
                                <div className="flex flex-row items-center gap-3 px-4 py-3 min-w-[180px]">
                                    <FaUser className="text-gray-400 w-6 h-6" />
                                    <div className="flex flex-col">
                                        <span className="text-white font-semibold text-sm truncate max-w-[120px]">{msg.name}</span>
                                        <span className="text-xs text-gray-400 truncate max-w-[120px]">{msg.email}</span>
                                    </div>
                                </div>
                                <div className="flex-1 px-4 py-3 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                        <span className="font-bold text-white text-base truncate">{msg.subject}</span>
                                        <span className="text-xs text-gray-400 ml-2">{msg.createdAt}</span>
                                    </div>
                                    <p className="text-gray-200 text-sm whitespace-pre-line break-words line-clamp-3 pr-0 sm:pr-10">{msg.content}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteClick(msg.id)}
                                    className="flex items-center gap-2 absolute top-2 right-2 z-10 px-2 py-1 rounded text-xs cursor-pointer font-semibold text-red-500 bg-white/10 hover:bg-red-100 hover:text-red-700 transition-all"
                                    title="Delete message"
                                >
                                    <FaTrash className="w-3 h-3" /> Delete
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
                title="Delete Message"
                description="Are you sure you want to delete this message? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div>
    );
}
