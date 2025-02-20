"use client";

import React, { useState, useEffect } from "react";
import useListPosts from "../hooks/useListPosts";
import useDeletePost from "../hooks/useDeletePost";
import { useRouter } from "next/navigation";
import axios from "axios";
import useListCategorias from "../hooks/useListCategorias"; // Importando o hook de categorias

const Home = () => {
    const { posts, loading, error, success, fetchPosts } = useListPosts();
    const { deletePost } = useDeletePost();
    const router = useRouter();

    const { categorias, loading: loadingCategorias, error: errorCategorias } = useListCategorias(); // Usando o hook de categorias

    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

    // Filtrar posts pela categoria selecionada
    const postsFiltrados = categoriaSelecionada
        ? posts.filter((post) => post.categoria === categoriaSelecionada)
        : posts;

    if (loadingCategorias) {
        return <p>Carregando categorias...</p>;
    }

    if (errorCategorias) {
        return <p style={{ color: "red" }}>Erro ao carregar categorias: {errorCategorias}</p>;
    }

    if (!categorias || categorias.length === 0) {
        return <h1>Categorias não encontradas</h1>;
    }

    if (!posts || posts.length === 0) {
        return <h1>Nenhum post criado</h1>;
    }

    return (
        <div>
            <h1>Home</h1>

            <button onClick={fetchPosts}>Carregar Posts</button>

            {loading && <p>Carregando posts...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            {/* Seletor de categorias */}
            <div className="my-4">
                <label htmlFor="categoria" className="mr-2">Filtrar por categoria:</label>
                <select
                    id="categoria"
                    value={categoriaSelecionada}
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                    className="border rounded p-2"
                >
                    <option value="">Todas</option>
                    {categorias.map((cat) => (
                        <option key={cat.id} value={cat.nome}>
                            {cat.nome}
                        </option>
                    ))}
                </select>
            </div>

            <ul>
                {postsFiltrados.map((post) => (
                    <li key={post.id} className="mb-4 p-4 border rounded">
                        <h3>{post.titulo}</h3>
                        <p>{post.conteudo}</p>
                        <p><strong>Categoria:</strong> {post.categoria}</p>
                        {post.imagem_url && (
                            <img
                                src={post.imagem_url}
                                alt={post.titulo}
                                style={{ width: "300px", height: "auto", borderRadius: "10px" }}
                            />
                        )}
                        <p>{new Date(post.criado_em).toLocaleString('pt-BR')}</p>

                        <button
                            onClick={() => router.push(`/pages/editPost/${post.id}`)}
                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        >
                            Editar
                        </button>

                        <button
                            onClick={() => deletePost(post.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Deletar
                        </button>
                        <button
                            onClick={() => router.push(`/pages/comentarios/${post.id}`)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Ver comentários
                        </button>
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default Home;
