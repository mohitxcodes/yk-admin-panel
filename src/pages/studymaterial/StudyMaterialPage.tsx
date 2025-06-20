import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaDownload, FaFilePdf, FaFilePowerpoint, FaFileAlt, FaTimes, FaTrash } from 'react-icons/fa';
import { uploadDocs } from '../../apis/uploadDocs';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import useFetchStudyMaterial from '../../hooks/useFetchStudyMaterial';

function getFileIcon(type: string) {
    if (type === 'pdf') return <FaFilePdf className="text-red-400 w-5 h-5" />;
    if (type === 'ppt' || 'pptx') return <FaFilePowerpoint className="text-orange-400 w-5 h-5" />;
    return <FaFileAlt className="text-gray-400 w-5 h-5" />;
}

function getFileTypeLabel(type: string) {
    if (!type) return "Unknown";
    if (type.toLowerCase() === "pdf") return "PDF Document";
    if (type.toLowerCase() === "ppt" || type.toLowerCase() === "pptx") return "PPT Document";
    return type.toUpperCase();
}

export default function StudyMaterialPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { materials, loading } = useFetchStudyMaterial();

    const handleUpload = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setSelectedFile(null);
        setUploading(false);
        setError(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUploadToCloudinary = async () => {
        if (!selectedFile) return;
        setUploading(true);
        setError(null);
        try {
            const meta = await uploadDocs(selectedFile);

            // Ensure all fields have valid values before saving to Firestore
            const fileType = meta.fileType || selectedFile.name.split('.').pop()?.toLowerCase() || 'unknown';
            const fileName = meta.fileName || selectedFile.name;
            const fileUrl = meta.url;

            if (!fileUrl) {
                throw new Error('Upload failed: No URL received');
            }

            await addDoc(collection(db, 'study-materials'), {
                name: fileName,
                type: fileType,
                url: fileUrl,
                uploadedAt: serverTimestamp(),
            });
            closeModal();
        } catch (err: any) {
            setError(err.message || 'Upload failed!');
            setUploading(false);
        }
    };

    const handleDownload = (item: any) => {
        const link = document.createElement('a');
        link.href = item.url + '?fl_attachment';
        link.download = item.name;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this file?")) return;
        try {
            await deleteDoc(doc(db, "study-materials", id));
            alert("File deleted successfully!");
        } catch (error) {
            console.error("Error deleting file:", error);
            alert("Failed to delete file.");
        }
    };

    return (
        <div className="relative min-h-screen">
            <div className="relative z-10 max-w-7xl mx-auto px-4 pb-32">
                <div className="flex items-center justify-between mt-10 mb-6">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
                        Study Materials
                    </h1>
                    <motion.button
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleUpload}
                        className="flex cursor-pointer items-center gap-2 px-5 py-2 bg-white text-black rounded-lg border border-white/20 shadow-lg transition font-semibold text-sm"
                        aria-label="Upload study material"
                    >
                        <FaPlus />
                        <span>Upload Material</span>
                    </motion.button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                        <span className="animate-spin mb-4"><FaFileAlt className="w-10 h-10 opacity-30" /></span>
                        <p className="text-lg font-semibold mb-2">Loading study materials...</p>
                    </div>
                ) : (!materials || materials.length === 0) ? (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                        <FaFileAlt className="w-16 h-16 mb-4 opacity-30" />
                        <p className="text-lg font-semibold mb-2">No study materials found</p>
                        <p className="text-sm">Start by uploading your first file!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {materials.map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.01 }}
                                className="border border-white/10 rounded-xl shadow-lg flex items-center backdrop-blur-sm hover:border-white/30"
                            >
                                <div className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-l-xl ml-2">
                                    {getFileIcon(item.type)}
                                </div>
                                <div className="px-4 py-2 flex flex-col flex-1">
                                    <h3 className="text-base font-bold text-white truncate">{item.name}</h3>
                                    <span className="text-xs text-gray-400">Uploaded: {item.uploadedAt}</span>
                                </div>
                                <div className="flex flex-col items-end mr-4 py-2">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDownload(item)}
                                            className="px-2 py-1 bg-white/10 text-blue-400 rounded hover:bg-white/20 text-sm"
                                        >
                                            <FaDownload className="inline-block mr-1" /> Download
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="px-2 py-1 bg-white/10 text-red-400 rounded hover:bg-white/20 text-sm"
                                        >
                                            <FaTrash className="inline-block mr-1" /> Delete
                                        </button>
                                    </div>
                                    <span className="text-xs text-gray-400 mt-1">
                                        Type: {getFileTypeLabel(item.type)}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {modalOpen && (
                    <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md"
                        >
                            <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                                onClick={closeModal}
                                disabled={uploading}
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-white mb-4">Upload Study Material</h2>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar,.csv,.json,.xml,.html,.js,.ts,.md,.rtf,.odt,.ods,.odp,.pages,.numbers,.key"
                                className="block w-full text-sm text-gray-300 file:py-2 file:px-4 file:rounded file:bg-white/10 file:text-white hover:file:bg-white/20"
                                disabled={uploading}
                            />
                            {selectedFile && (
                                <p className="text-white text-sm mt-2">Selected: {selectedFile.name}</p>
                            )}
                            {uploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            <button
                                onClick={handleUploadToCloudinary}
                                className="mt-4 w-full py-2 bg-white text-black rounded font-semibold disabled:opacity-50"
                                disabled={!selectedFile || uploading}
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}