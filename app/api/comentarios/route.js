import { NextResponse } from "next/server";
import { getComentarios, postComentarios } from "./handler";


export async function GET() {


    try {
        const comentarios = await getComentarios();

        if (comentarios.length === 0) {
            return NextResponse.json({ message: "Nenhum comentário encontrado" })
        }


        return NextResponse.json(comentarios)
    } catch (error) {

        console.error("Erro na rota api/comentarios", error);
        return NextResponse.json({ error: error.message || "Erro ao buscar os comentários" }, { status: 500 })

    }

}



export async function POST(request) {

    const { post_id, usuario_id, conteudo, criado_em } = await request.json()
    try {
        const comentario = await postComentarios(post_id, usuario_id, conteudo, criado_em);

        return NextResponse.json(comentario);
    } catch (error) {
        console.error("Erro na rota POST");
        return NextResponse.json({ error: error.message || "Erro ao criar comentario" }, { status: 500 });
    }
}