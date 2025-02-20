import { useState, useEffect } from 'react';
import axios from 'axios';

function useListCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/categorias");

                // Verifique se existem categorias antes de definir o estado
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

        fetchCategorias();
    }, []);

    return { categorias, loading, error };
}

export default useListCategorias;
