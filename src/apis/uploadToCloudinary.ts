// src/utils/uploadToCloudinary.ts
import axios from 'axios';

interface CloudinaryResponse {
    secure_url: string;
    original_filename: string;
    created_at: string;
    format: string;
    bytes: number;
}

interface UploadedFileMetadata {
    url: string;
    fileName: string;
    uploadedAt: string;
    fileType: string;
    size: number; // in bytes
}

export const uploadToCloudinary = async (
    file: any
): Promise<UploadedFileMetadata> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
        'upload_preset',
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append('resource_type', 'auto');

    try {
        const response = await axios.post<CloudinaryResponse>(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        const data = response.data;

        return {
            url: data.secure_url,
            fileName: data.original_filename,
            uploadedAt: data.created_at,
            fileType: data.format,
            size: data.bytes,
        };
    } catch (error: any) {
        console.error('Cloudinary upload error:', error.response?.data || error.message);
        throw new Error('File upload to Cloudinary failed.');
    }
};