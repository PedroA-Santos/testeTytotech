import { deleteCategoria, getCategoriasById, putCategoria } from "../handler";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { nome, descricao } = await request.json();

        const categoria = await putCategoria(nome, descricao, id)

        return NextResponse.json(categoria);
    } catch (error) {
        console.error("Erro na rota PUT", error.message);
        return NextResponse.json({ error: error.message || 'Erro ao atualizar a categoria' }, { status: 500 });
    }
};



export async function GET(request, { params }) {

    const { id } = params;

    try {
        if (!id) {
            return NextResponse.json({ error: "o Id é obrigatório" }, { status: 400 })
        }

        const categoria = await getCategoriasById(id);
        if (categoria.length === 0) {
            return NextResponse.json({ message: "Nenhuma categoria encontrada" }, { status: 404 })
        }
        return NextResponse.json(categoria);

    } catch (error) {
        console.error("Erro na rota GET", error.message);
        return NextResponse.json({ error: error.message || "Erro ao buscar a categoria" }, { status: 500 });
    }



}


export async function DELETE(request, { params }) {

    const { id } = params;

    try {
        if (!id) {
            return NextResponse.json({ error: "o Id é obrigatório" }, { status: 400 })
        }

       await deleteCategoria(id)

        return NextResponse.json({ message: "Categoria deletada com sucesso " })
    } catch (error) {
        console.error("Erro NA ROTA DELETE", error);
        return NextResponse.json({ error: error.message || "Erro ao deltar categoria" }, { status: 500 })
    }

}