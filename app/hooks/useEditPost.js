import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function useEditPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null); // Começa com null para controle de carregamento
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    useEffect(() => {
        if (!id) {
            setError("ID inválido ou inexistente");
            return;
        }

        const fetchPost = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
                if (response.data) {
                    setPost(response.data);
                } else {
                    setError("Post não encontrado");
                }
            } catch (err) {
                setError("Erro ao buscar o post");
                console.error("Erro ao buscar post:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const updatePost = async (dadosAtualizados) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const { data } = await axios.put(`http://localhost:3000/api/posts/${id}`, dadosAtualizados);
            setPost(data);
            setSuccess("Post atualizado com sucesso!");
            router.push("/home");
        } catch (err) {
            setError("Erro ao atualizar o post");
            console.error("Erro ao atualizar o post:", err);
        } finally {
            setLoading(false);
        }
    };

    return { post, handleChange, updatePost, loading, error, success };
}

export default useEditPost;
