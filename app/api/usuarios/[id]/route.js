import { NextResponse } from "next/server";
import { deleteUsuario, getUsuariosById, putUsuario } from "../handler";


export async function GET(request, { params }) {

    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }


    try {

        const usuario = await getUsuariosById(id);
        if (usuario.length === 0) {
            return NextResponse.json({ message: "nenhum usuario encontrado" })
        }

        return NextResponse.json(usuario);

    } catch (error) {
        console.error("Erro na rota GET/ID", error);
        return NextResponse.json({ error: error.message || "Erro ao listar usuário" }, { status: 500 })
    }
}



export async function PUT(request, { params }) {

    const { id } = params;
    const { nome, email, senha } = await request.json();

    if (!id) {
        return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    try {

        const usuario = await putUsuario(nome, email, senha, id);
        return NextResponse.json({ message: "Usuário atualizado", usuario }, { status: 201 })

    } catch (error) {
        console.error("erro na rota PUT", error);
        return NextResponse.json({ error: error.message || "Erro ao atualizar usuário" }, { status: 500 });
    }
}



export async function DELETE(request, { params }) {

    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    try {

        await deleteUsuario(id);

        return NextResponse.json({ message: "Usuário deletado com sucesso" }, { status: 200 });

    } catch (error) {

        console.error("Erro na rota DELETE", error);
        return NextResponse.json({ error: error.message || "Erro ao deletar usuário" }, { status: 500 });

    }

}