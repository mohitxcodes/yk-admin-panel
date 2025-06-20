// src/utils/uploadToImage.ts
import axios from 'axios';

interface CloudinaryResponse {
    secure_url: string;
    original_filename: string;
    created_at: string;
    format: string;
    bytes: number;
}

export const uploadToImage = async (
    file: any
): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
        'upload_preset',
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append('resource_type', 'image');

    try {
        const response = await axios.post<CloudinaryResponse>(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data.secure_url;
    } catch (error: any) {
        console.error('Cloudinary upload error:', error.response?.data || error.message);
        throw new Error('Image upload to Cloudinary failed.');
    }
};