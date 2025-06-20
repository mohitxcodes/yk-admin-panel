import axios from 'axios';

interface CloudinaryResponse {
    secure_url: string;
    original_filename: string;
    created_at: string;
    format: string;
    bytes: number;
}

interface UploadedDocMetadata {
    url: string;
    fileName: string;
    fileType: string;
    uploadedAt: string;
    size: number; // in bytes
}

export const uploadDocs = async (
    file: any
): Promise<UploadedDocMetadata> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
        'upload_preset',
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append('resource_type', 'raw');

    try {
        const response = await axios.post<CloudinaryResponse>(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`,
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
            fileType: data.format,
            uploadedAt: data.created_at,
            size: data.bytes,
        };
    } catch (error: any) {
        console.error('Cloudinary upload error:', error.response?.data || error.message);
        throw new Error('Document upload to Cloudinary failed.');
    }
};
