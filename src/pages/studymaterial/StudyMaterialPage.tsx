import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaDownload, FaFilePdf, FaFilePowerpoint, FaFileAlt } from 'react-icons/fa';

// Dummy data for now
const dummyMaterials = [
    {
        id: '1',
        name: 'Sample Notes.pdf',
        type: 'pdf',
        url: '#',
        uploadedAt: '2024-06-01',
    },
    {
        id: '2',
        name: 'Lecture Slides.pptx',
        type: 'ppt',
        url: '#',
        uploadedAt: '2024-06-02',
    },
];

function getFileIcon(type: string) {
    if (type === 'pdf') return <FaFilePdf className="text-red-400 w-5 h-5" />;
    if (type === 'ppt') return <FaFilePowerpoint className="text-orange-400 w-5 h-5" />;
    return <FaFileAlt className="text-gray-400 w-5 h-5" />;
}

export default function StudyMaterialPage() {
    const [materials, setMaterials] = useState(dummyMaterials);

    // Placeholder for upload logic
    const handleUpload = () => {
        // Open upload modal or file picker
        alert('Upload functionality coming soon!');
    };

    return (
        <div className="relative min-h-screen">
            <div className="relative z-10 max-w-7xl mx-auto px-4 pb-32">
                {/* Header Row */}
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

                {/* Material List */}
                {materials.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                        <FaFileAlt className="w-16 h-16 mb-4 opacity-30" />
                        <p className="text-lg font-semibold mb-2">No study materials found</p>
                        <p className="text-sm">Start by uploading your first file!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {materials.map((mat) => (
                            <motion.div
                                key={mat.id}
                                whileHover={{ scale: 1.01, borderColor: '#fff', boxShadow: '0 8px 32px 0 rgba(255,255,255,0.08)' }}
                                className="border border-white/10 rounded-xl shadow-lg overflow-hidden flex flex-row items-center transition-all duration-200 group hover:shadow-2xl hover:-translate-y-0.5 hover:border-white/30 bg-transparent backdrop-blur-sm relative min-h-[64px]"
                            >
                                {/* File Icon */}
                                <div className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-l-xl ml-2">
                                    {getFileIcon(mat.type)}
                                </div>
                                {/* File Info */}
                                <div className="px-4 py-2 flex flex-col flex-1 min-w-0 justify-center">
                                    <h3 className="text-base font-bold text-white mb-0.5 truncate">{mat.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            Uploaded: {mat.uploadedAt}
                                        </span>
                                        <span className="text-xs text-gray-500 uppercase font-mono">{mat.type}</span>
                                    </div>
                                </div>
                                {/* Download Button */}
                                <a
                                    href={mat.url}
                                    download
                                    className="flex items-center gap-1 absolute top-2 right-2 z-10 px-2 py-1 rounded text-xs cursor-pointer font-semibold text-blue-500 bg-white/10 hover:bg-blue-100 hover:text-blue-700 transition-all"
                                    title="Download file"
                                >
                                    <FaDownload className="w-3 h-3" />
                                    Download
                                </a>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 