import { NextResponse } from "next/server";
import { getCategorias, postCategoria } from "./handler";

export async function GET() {
    try {
        const categorias = await getCategorias();

        if (categorias.length === 0) {
            return NextResponse.json({ message: "Nenhuma categoria encontrada" }, { status: 404 });
        }

        return NextResponse.json(categorias);
    } catch (error) {
        console.error("Erro na rota GET", error);
        return NextResponse.json({ error: error.message || "Erro ao buscar as categorias" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { nome, descricao } = await request.json();

        if (!nome || !descricao) {
            return NextResponse.json({ error: "Nome e descrição são obrigatórios" }, { status: 400 });
        }

        const categoria = await postCategoria(nome, descricao);
        return NextResponse.json(categoria, { status: 201 });
    } catch (error) {
        console.error("Erro na rota POST", error.message);
        return NextResponse.json({ error: error.message || "Erro ao criar categoria" }, { status: 500 });
    }
}
