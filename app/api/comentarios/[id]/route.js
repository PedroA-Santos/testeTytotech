import { NextResponse } from "next/server";
import { deleteComentarios, getComentariosById, putComentarios } from "../handler";

export async function GET(request, { params }) {


    const { id } = params;


    if (!id) {
        return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    try {
        const comentario = await getComentariosById(id);

        if (comentario.length === 0) {
            return NextResponse.json({ message: "nenhum comentário encontardo" })
        }


        return NextResponse.json(comentario)
    } catch (error) {
        console.error("Erro na rota de GET/ID", error);
        return NextResponse.json({ error: error.message || "Erro ao buscar comentário" }, { status: 500 });
    }

}


export async function PUT(request, { params }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    const { post_id, usuario_id, conteudo, criado_em } = await request.json();

    try {
        const comentario = await putComentarios(post_id, usuario_id, conteudo, criado_em, id)

        return NextResponse.json({ message: "Comentário atualizado com sucesso", comentario });
    } catch (error) {
        console.error("Erro na rota PUT", error.message);
        return NextResponse.json({ error: error.message || 'Erro ao atualizar o comentario' }, { status: 500 });
    }


}



export async function DELETE(request, { params }) {

    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    try {
        await deleteComentarios(id);

        return NextResponse.json({ message: "Comentário deletado com sucesso" });
    } catch (error) {
        console.error("Erro na rota PUT", error.message);
        return NextResponse.json({ error: error.message || 'Erro ao deletar o comentario' }, { status: 500 });
    }

}