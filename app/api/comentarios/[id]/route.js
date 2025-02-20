import { NextResponse } from "next/server";
import { deleteComentarios, getComentariosByPostId, getComentariosById, putComentarios } from "../handler";

export async function GET(request) {


    const url = new URL(request.url); // request(obtém a URL COMPLETA) e converte a URL em objrto
    const id = url.pathname.split('/').pop(); // ESSE ESQUEMA FAZ COM QUE EU PEGUE A ULTIMA PARTE DA URL NO CASO O ID
    if (!id) {
        return NextResponse.json({ error: "ID do post é obrigatório" }, { status: 400 });
    }

    try {
        const comentarios = await getComentariosByPostId(id); // FUNÇÃO QUE BUSCA TODOS OS COMENTÁRIOS PELO ID DO POST 

        if (comentarios.length === 0) {
            return NextResponse.json({ message: "Nenhum comentário encontrado para este post" });
        }

        return NextResponse.json(comentarios);
    } catch (error) {
        console.error("Erro na rota GET/id", error);
        return NextResponse.json({ error: error.message || "Erro ao buscar comentários do post" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: "ID do comentário é obrigatório" }, { status: 400 });
    }

    const { post_id, usuario_id, conteudo, criado_em } = await request.json();

    try {
        const comentario = await putComentarios(post_id, usuario_id, conteudo, criado_em, id);
        return NextResponse.json({ message: "Comentário atualizado com sucesso", comentario });
    } catch (error) {
        console.error("Erro na rota PUT", error.message);
        return NextResponse.json({ error: error.message || "Erro ao atualizar o comentário" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: "ID do comentário é obrigatório" }, { status: 400 });
    }

    try {
        await deleteComentarios(id);
        return NextResponse.json({ message: "Comentário deletado com sucesso" });
    } catch (error) {
        console.error("Erro na rota DELETE", error.message);
        return NextResponse.json({ error: error.message || "Erro ao deletar o comentário" }, { status: 500 });
    }
}
