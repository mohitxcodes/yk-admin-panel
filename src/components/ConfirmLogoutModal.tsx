import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmLogoutModalProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmLogoutModal({ open, onConfirm, onCancel }: ConfirmLogoutModalProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-gray-900/90 border border-gray-700 rounded-2xl p-8 w-full max-w-sm shadow-2xl relative"
                    >
                        <h2 className="text-xl font-bold text-white mb-4 text-center">Confirm Logout</h2>
                        <p className="text-gray-300 text-center mb-6">Are you sure you want to log out?</p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={onCancel}
                                className="px-5 py-2 cursor-pointer rounded-lg bg-white/10 text-gray-200 border border-white/10 hover:bg-white/20 transition font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-5 py-2 cursor-pointer rounded-lg bg-white text-black font-semibold hover:bg-gray-100 transition border border-white/10"
                            >
                                Logout
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
} 