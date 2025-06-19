import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export interface Blog {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    hashtags: string[];
    imageUrl: string;
    createdAt: string;
}

export default function useBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const blogData = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.title,
                        subtitle: data.subtitle,
                        content: data.content,
                        hashtags: data.hashtags || [],
                        imageUrl: data.imageUrl || "",
                        createdAt: data.createdAt?.toDate().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }) || "Unknown",
                    };
                });
                setBlogs(blogData);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return { blogs, loading };
}