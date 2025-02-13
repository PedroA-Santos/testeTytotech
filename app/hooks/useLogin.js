"use client";

// HOOK UTILIZADO PARA FAZER O LOGIN DO USUÁRIO
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function useLogin() {

    //ESTADOS PARA CONTROLAR 
    const [usuario, setUsuario] = useState({ email: "", senha: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const router = useRouter();


    //FUNÇÃO QUE CAPTURA O QUE O USUÁRIO INSERIR NO INPUT
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({ ...prev, [name]: value }));
    };

    //FUNÇÃO QUE CUIDA DO LOGIN DO USUÁRIO

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const { data } = await axios.post("/api/auth/login", usuario);

            setSuccess("Login realizado com sucesso!");

            router.push("/home"); // Redireciona para a página home

        } catch (err) {
            setError(err.response?.data?.error || "Erro ao fazer login");
        } finally {
            setLoading(false);
        }
    };

    return {
        usuario,
        loading,
        error,
        success,
        handleChange,
        handleLogin,
    };
}

export default useLogin;
