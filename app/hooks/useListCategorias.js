import { useState, useEffect } from 'react';
import axios from 'axios';

function useListCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategorias = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/categorias");

            if (response.data.length === 0) {
                console.log("Nenhuma categoria encontrada");
            }

            setCategorias(response.data);
            setLoading(false);
        } catch (err) {
            setError("Erro ao buscar categorias");
            console.error("Erro ao buscar categorias:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    return { categorias, loading, error, fetchCategorias };
}

export default useListCategorias;
