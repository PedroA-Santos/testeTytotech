import axios from "axios";
import React, { useEffect, useState } from "react";

//HOOK UTILIZADO PARA BUSCAR O POST PELO ID DELE, ESTÁ SENDO UTILIZADO PARA VER OS COMENTÁRIOS E O POST;

function useListPostsDetail(postId) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!postId) {
            setError("ID inválido ou inexistente");
            return;
        }

        const fetchPostId = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${postId}`);

                if (!response.data) {
                    setError("Nenhum post encontrado");
                    return;
                }

                setPost(response.data);
            } catch (err) {
                console.error("Erro ao buscar post", err);
                setError("Erro ao buscar post");
            } finally {
                setLoading(false);
            }
        };

        fetchPostId();
    }, [postId]);

    return { loading, error, post };
}

export default useListPostsDetail;
