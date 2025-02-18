import React from "react";
import useListPosts from "../hooks/useListPosts";
import { useRouter } from "next/navigation";
import useDeletePost from "../../../hooks/useDeletePost";

const Home = () => {
    const { posts, loading, error, success, fetchPosts } = useListPosts();
    const router = useRouter();

    const handleDelete = async (id) => {
        const { deletePost, success: deleteSuccess, error: deleteError } = useDeletePost();
        await deletePost(id);
        if (deleteSuccess) {
            alert(deleteSuccess);
            fetchPosts(); // Recarregar a lista após excluir
        }
        if (deleteError) {
            alert(deleteError);
        }
    };

    return (
        <div>
            <h1>Home</h1>

            <button onClick={fetchPosts} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
                Carregar Posts
            </button>

            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <ul>
                {posts.map((post) => (
                    <li key={post.id} className="mb-6 border p-4 rounded">
                        <h3 className="text-xl font-bold">{post.titulo}</h3>
                        <p>{post.conteudo}</p>
                        {post.imagem_url && (
                            <img
                                src={post.imagem_url}
                                alt={post.titulo}
                                className="w-64 h-auto rounded-md mt-2"
                            />
                        )}
                        <div className="mt-4 space-x-4">
                            <button
                                onClick={() => router.push(`/pages/editPost/${post.id}`)}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => handleDelete(post.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Deletar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
