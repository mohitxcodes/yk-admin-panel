import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export interface Highlight {
    id: string;
    title: string;
    description: string;
    year: string;
    location: string;
    category: string;
    hashtags: string[];
    imageUrl: string;
    createdAt: string;
}

export default function useHighlights() {
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchHighlights = async () => {
            try {
                const q = query(collection(db, "highlights"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const highlightData = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.title,
                        description: data.description,
                        year: data.year,
                        location: data.location,
                        category: data.category,
                        hashtags: data.hashtags || [],
                        imageUrl: data.imageUrl || "",
                        createdAt: data.createdAt?.toDate().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }) || "Unknown",
                    };
                });
                setHighlights(highlightData);
            } catch (error) {
                console.error("Error fetching highlights:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHighlights();
    }, []);

    return { highlights, loading };
} 