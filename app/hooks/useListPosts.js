"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';

const useListPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const { data } = await axios.get('http://localhost:3000/api/posts');

            if (data.length === 0) {
                setError("Nenhum post encontrado");
            } else {
                setPosts(data);
                setSuccess("Posts carregados com sucesso!");
            }

        } catch (err) {
            setError('Erro ao listar posts');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Buscar posts automaticamente ao carregar o componente
    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, loading, error, success, fetchPosts };
};

export default useListPosts;
