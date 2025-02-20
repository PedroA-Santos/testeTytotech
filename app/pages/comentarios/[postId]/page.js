"use client";

import React from "react";
import { useParams } from "next/navigation";
import useComentarios from "@/app/hooks/useComentarios";
import useListPostsDetail from "@/app/hooks/useListPostsDetail";
import { useRouter } from "next/navigation";

//PÁGINA DO FRONT QUE ESTÁ CONSUMINDO OS HOOKS DE COMENTÁRIOS E LIST DOS POST POR ID PARA MOSTRAR OS COMENTÁRIOS DO POST

function Page() {
    const { postId } = useParams(); // Pega o postId da URL
    const { comentarios, loading, error } = useComentarios(postId);//HOOK DOS COMENTÁRIOS
    const { post, loading: loadingPost, error: errorPost } = useListPostsDetail(postId);//HOOK DO POST PELO ID 
    const router = useRouter();

    if (loadingPost) return <p>Carregando post...</p>;
    if (errorPost) return <p style={{ color: "red" }}>{errorPost}</p>;

    return (
        <div>
            <h1>Post</h1>
            {post ? (
                <div>
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
                </div>
            ) : (
                <p>Nenhum post encontrado.</p>
            )}

            <h1>Comentários</h1>
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {comentarios.map((comentario) => (
                    <li key={comentario.id}>{comentario.conteudo}</li>
                ))}
            </ul>

            <button onClick={() => router.push('/home')}>Voltar</button>
        </div>
    );
}

export default Page;
