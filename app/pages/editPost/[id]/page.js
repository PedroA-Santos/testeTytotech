"use client";

import React, { useEffect } from "react";
import useEditPost from "../../../hooks/useEditPost";
import useListCategorias from "@/app/hooks/useListCategorias";
import { useRouter } from "next/navigation";

const EditPostPage = () => {
    const { post, handleChange, updatePost, loading, error, success } = useEditPost();
    const { categorias, fetchCategorias } = useListCategorias();

    const router = useRouter();

    useEffect(() => {
        fetchCategorias();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (post) {
            updatePost(post);
        }
    };

    if (loading) return <p>Carregando post...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!post) return <p>Nenhum post encontrado.</p>;

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Editar Post</h2>

            {success && <p className="text-green-600">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block text-sm font-medium">Título:</label>
                    <input
                        type="text"
                        name="titulo"
                        value={post.titulo || ''}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Conteúdo:</label>
                    <textarea
                        name="conteudo"
                        value={post.conteudo || ''}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        rows="5"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Categoria:</label>
                    <select
                        name="categoria_id"
                        value={
                            /* Busca na lista de categorias um objeto onde nome seja igual ao post.categoria e retorna seu id.*/
                            categorias.find((c) => c.nome === post.categoria)?.id || ''}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>


                </div>

                <div>
                    <label className="block text-sm font-medium">URL da Imagem:</label>
                    <input
                        type="text"
                        name="imagem_url"
                        value={post.imagem_url || ''}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? "Atualizando..." : "Atualizar Post"}
                </button>

            </form>


            <button onClick={() => router.push(`/home`)}>Voltar</button>
        </div>
    );
};

export default EditPostPage;
