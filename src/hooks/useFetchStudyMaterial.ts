import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export interface StudyMaterial {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadedAt: string;
}

export default function useFetchStudyMaterial() {
    const [materials, setMaterials] = useState<StudyMaterial[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const q = query(collection(db, "study-materials"), orderBy("uploadedAt", "desc"));
                const querySnapshot = await getDocs(q);
                const materialData = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name,
                        type: data.type,
                        url: data.url,
                        uploadedAt: data.uploadedAt?.toDate ? data.uploadedAt.toDate().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }) : "Unknown",
                    };
                });
                setMaterials(materialData);
            } catch (error) {
                console.error("Error fetching study materials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterials();
    }, []);

    return { materials, loading };
} 