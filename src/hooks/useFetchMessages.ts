import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export interface Message {
    id: string;
    name: string;
    email: string;
    subject: string;
    content: string;
    createdAt: string;
}

export default function useFetchMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const messageData = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name,
                        email: data.email,
                        subject: data.subject,
                        content: data.content,
                        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }) : "Unknown",
                    };
                });
                setMessages(messageData);
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    return { messages, loading };
} 