import { deleteCategoria, getCategoriasById, putCategoria } from "../handler";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "O ID é obrigatório" }, { status: 400 });
        }

        const categoria = await getCategoriasById(id);
        if (!categoria) {
            return NextResponse.json({ message: "Categoria não encontrada" }, { status: 404 });
        }

        return NextResponse.json(categoria);
    } catch (error) {
        console.error("Erro na rota GET", error.message);
        return NextResponse.json({ error: error.message || "Erro ao buscar a categoria" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { nome, descricao } = await request.json();

        if (!nome || !descricao) {
            return NextResponse.json({ error: "Nome e descrição são obrigatórios" }, { status: 400 });
        }

        const categoriaAtualizada = await putCategoria(id, { nome, descricao });

        return NextResponse.json(categoriaAtualizada, { status: 200 });
    } catch (error) {
        console.error("Erro na rota PUT", error.message);
        return NextResponse.json({ error: error.message || "Erro ao atualizar a categoria" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "O ID é obrigatório para deleção" }, { status: 400 });
        }

        await deleteCategoria(id);
        return NextResponse.json({ message: "Categoria deletada com sucesso" }, { status: 200 });
    } catch (error) {
        console.error("Erro na rota DELETE", error);
        return NextResponse.json({ error: error.message || "Erro ao deletar a categoria" }, { status: 500 });
    }
}
