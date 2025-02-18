import { deletePost, getPostsById, putPost } from "../handler";
import { NextResponse } from "next/server";


export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { titulo, conteudo, categoria_id, usuario_id, imagem_url } = await request.json();

        const post = await putPost(titulo, conteudo, categoria_id, usuario_id, imagem_url, id);

        return NextResponse.json(post);
    } catch (error) {
        console.error("Erro na rota PUT", error.message);
        return NextResponse.json({ error: error.message || 'Erro ao atualizar o post' }, { status: 500 });
    }
}

export async function GET(request) {
    try {

        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
        }

        const posts = await getPostsById(id);
        const post = posts.length ? posts[0] : null;

        if (!post || post.length === 0) {
            return NextResponse.json({ message: "Nenhum post encontrado" }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error("Erro na rota GET:", error.message);
        return NextResponse.json({ error: error.message || "Erro ao buscar post" }, { status: 500 });
    }
}

export async function DELETE(request) {

    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    try {
        if (!id) {
            return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
        }

        await deletePost(id);



        return NextResponse.json("Post deletado com sucesso")
    } catch (error) {
        console.error('Erro na rota de DELETE', error.message)
        return NextResponse.json({ error: error.message || "Erro ao deletar o post" }, { status: 500 });
    }

}
