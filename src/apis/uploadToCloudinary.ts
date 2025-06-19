// src/utils/uploadToCloudinary.ts

import axios from 'axios';

export const uploadToCloudinary = async (file: any): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        const data = response.data;

        if (data.secure_url) {
            return data.secure_url;
        } else {
            throw new Error("Cloudinary upload failed: No secure_url returned.");
        }

    } catch (error: any) {
        console.error("Cloudinary upload error:", error.response?.data || error.message);
        throw new Error("Image upload to Cloudinary failed.");
    }
};