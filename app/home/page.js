"use client";

import React from "react";
import useListPosts from "../hooks/useListPosts";
import useDeletePost from "../hooks/useDeletePost";
import { useRouter } from "next/navigation";

const Home = () => {
    const { posts, loading, error, success, fetchPosts } = useListPosts();
    const { deletePost } = useDeletePost();
    const router = useRouter();

    return (
        <div>
            <h1>Home</h1>

            <button onClick={fetchPosts}>Carregar Posts</button>

            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.titulo}</h3>
                        <p>{post.conteudo}</p>
                        {post.imagem_url && (
                            <img
                                src={post.imagem_url}
                                alt={post.titulo}
                                style={{ width: "300px", height: "auto", borderRadius: "10px" }}
                            />
                        )}

                        <button
                            onClick={() => router.push(`/pages/editPost/${post.id}`)}
                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        >
                            Editar
                        </button>

                        <button
                            onClick={async () => {
                                await deletePost(post.id);
                                fetchPosts(); //  aqui chama a função de buscar posts ao deletar algum post para listar sem o post deletado
                            }}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Deletar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
