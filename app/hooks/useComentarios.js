"use client";

import axios from "axios";
import { useState, useEffect } from "react";

// Hook para buscar e adicionar comentários com base no ID do post
const useComentarios = (postId) => {
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Função para buscar comentários
    const fetchComentarios = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:3000/api/comentarios/${postId}`);
            setComentarios(response.data);
        } catch (err) {
            setError("Erro ao carregar comentários");
        } finally {
            setLoading(false);
        }
    };

    // Buscar comentários automaticamente quando o postId mudar
    useEffect(() => {
        if (postId) {
            fetchComentarios();
        }
    }, [postId]);

    // Função para adicionar um comentário
    const adicionarComentario = async (conteudo) => {
        if (!conteudo) {
            setError("O comentário não pode estar vazio");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post(`http://localhost:3000/api/comentarios/${postId}`, { conteudo });

            setComentarios((prevComentarios) => [...prevComentarios, response.data]); // Adiciona o novo comentário à lista
            setSuccess("Comentário adicionado com sucesso");
        } catch (err) {
            console.error("Erro ao adicionar comentário", err);
            setError("Erro ao adicionar comentário");
        } finally {
            setLoading(false);
        }
    };

    return { comentarios, loading, error, success, fetchComentarios, adicionarComentario };
};

export default useComentarios;
