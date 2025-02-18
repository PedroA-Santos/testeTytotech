"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function useDeletePost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    const deletePost = async (id) => {
        if (!id) {
            setError("ID inválido ou inexistente");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.delete(`http://localhost:3000/api/posts/${id}`);
            setSuccess("Post deletado com sucesso!");
            
        } catch (err) {
            setError("Erro ao deletar o post");
            console.error("Erro ao deletar o post:", err);
        } finally {
            setLoading(false);
        }
    };

    return { deletePost, loading, error, success };
}

export default useDeletePost;
