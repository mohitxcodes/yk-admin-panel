import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaHashtag, FaTrash, FaSpinner } from 'react-icons/fa';
import { db } from "../../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { uploadToImage } from "../../apis/uploadToImage";

const categories = ["workshop", "event", "research", "travel"];

function CreateHighlightsPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        year: '',
        location: '',
        category: '',
        hashtags: [] as string[],
        imageUrl: '',
        currentHashtag: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        try {
            const imageUrl = await uploadToImage(imageFile);
            const highlightData = {
                title: formData.title,
                description: formData.description,
                year: formData.year,
                location: formData.location,
                category: formData.category,
                hashtags: formData.hashtags,
                imageUrl,
                createdAt: Timestamp.now(),
            };
            console.log(highlightData);
            await addDoc(collection(db, "highlights"), highlightData);
            alert("✅ Highlight added successfully!");
            navigate('/highlights');
        } catch (error) {
            console.error("❌ Error adding highlight:", error);
            alert("Something went wrong while adding the highlight.");
        } finally {
            setUploading(false);
        }
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen w-full px-4 py-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 tracking-tight text-left">Create Highlight</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-base font-semibold text-white mb-1">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full px-3 py-2 bg-transparent border border-white/30 rounded-lg focus:border-white focus:ring-2 focus:ring-white/10 transition-all text-white placeholder:text-gray-500 text-base"
                                required
                                placeholder="Enter highlight title"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-base font-semibold text-white mb-1">Year</label>
                            <input
                                type="text"
                                value={formData.year}
                                onChange={e => setFormData(prev => ({ ...prev, year: e.target.value }))}
                                className="w-full px-3 py-2 bg-transparent border border-white/30 rounded-lg focus:border-white focus:ring-2 focus:ring-white/10 transition-all text-white placeholder:text-gray-500 text-base"
                                required
                                placeholder="e.g. 2024"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-base font-semibold text-white mb-1">Location</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                className="w-full px-3 py-2 bg-transparent border border-white/30 rounded-lg focus:border-white focus:ring-2 focus:ring-white/10 transition-all text-white placeholder:text-gray-500 text-base"
                                required
                                placeholder="Enter location"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-base font-semibold text-white mb-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full px-3 py-2 bg-transparent border border-white/30 rounded-lg focus:border-white focus:ring-2 focus:ring-white/10 transition-all text-white text-base"
                                required
                            >
                                <option value="" disabled>Select category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-white mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 bg-transparent border border-white/30 rounded-lg focus:border-white focus:ring-2 focus:ring-white/10 transition-all min-h-[120px] text-white placeholder:text-gray-500 text-base"
                            required
                            placeholder="Write highlight description here..."
                        />
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-white mb-1">Hashtags</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={formData.currentHashtag}
                                onChange={e => setFormData(prev => ({ ...prev, currentHashtag: e.target.value }))}
                                className="flex-1 px-3 py-2 bg-transparent border border-white/30 rounded-lg focus:border-white focus:ring-2 focus:ring-white/10 transition-all text-white placeholder:text-gray-500 text-base"
                                placeholder="Add hashtag"
                            />
                            <button
                                type="button"
                                onClick={handleHashtagAdd}
                                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-white"
                            >
                                <FaHashtag />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.hashtags.map((hashtag) => (
                                <span
                                    key={hashtag}
                                    className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded text-sm text-white border border-white/20"
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
                    <div>
                        <label className="block text-base font-semibold text-white mb-1">Image</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                            />
                            <span className="text-gray-400"><FaImage /></span>
                        </div>
                        {imagePreview && (
                            <div className="mt-3">
                                <img src={imagePreview} alt="Preview" className="max-h-40 rounded-lg border border-white/10" />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/highlights')}
                            className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-base"
                            disabled={uploading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-white text-black rounded-lg shadow hover:bg-gray-200 transition-colors font-semibold text-base flex items-center gap-2"
                            disabled={uploading}
                        >
                            {uploading && <FaSpinner className="animate-spin" />}
                            Publish Highlight
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateHighlightsPage; 