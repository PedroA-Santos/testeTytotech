"use client";

import axios from "axios";
import { useState, useEffect } from "react";

// HOOK FEITO PARA BUSCAR OS COMENTÁRIOS COM BASE NO ID DO POST 

const useComentarios = (postId) => {
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return { comentarios, loading, error, fetchComentarios };
};

export default useComentarios;
