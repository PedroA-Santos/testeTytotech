import { putPost } from "../handler";
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
