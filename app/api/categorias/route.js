import { NextResponse } from "next/server";
import { getCategorias, getCategoriasById, postCategoria, putCategoria, deleteCategoria } from "./handler";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id) {
            const categoria = await getCategoriasById(id);
            if (!categoria) {
                return NextResponse.json({ message: "Categoria não encontrada" }, { status: 404 });
            }
            return NextResponse.json(categoria);
        }

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

export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID obrigatório para atualização" }, { status: 400 });
        }

        const body = await request.json();
        const categoriaAtualizada = await putCategoria(id, body);

        return NextResponse.json(categoriaAtualizada, { status: 200 });
    } catch (error) {
        console.error("Erro na rota PUT", error.message);
        return NextResponse.json({ error: error.message || "Erro ao atualizar categoria" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID obrigatório para deleção" }, { status: 400 });
        }

        await deleteCategoria(id);
        return NextResponse.json({ message: "Categoria deletada com sucesso" }, { status: 200 });
    } catch (error) {
        console.error("Erro na rota DELETE", error.message);
        return NextResponse.json({ error: error.message || "Erro ao deletar categoria" }, { status: 500 });
    }
}
