"use client";

import React from "react";
import useListPosts from "../hooks/useListPosts";

const Home = () => {
    const { posts, loading, error, success, fetchPosts } = useListPosts();

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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
