import { NextResponse } from "next/server";
import { getUsuarios, postUsuario } from "./handler";


export async function GET() {


    try {
        const usuarios = await getUsuarios();

        if (usuarios.length === 0) {
            return NextResponse.json({ message: "Nenhum usuário encontrado" }, { status: 404 })
        }
        return NextResponse.json({ message: "Usuarios", usuarios })
    } catch (error) {
        console.error("Erro na rota GET", error);
        return NextResponse.json({ error: error.message || "Erro ao listar usuários" }, { status: 500 })
    }
}


export async function POST(request) {
    const { nome, email, senha } = await request.json();

    try {

        const usuario = await postUsuario(nome, email, senha);

        return NextResponse.json({ message: "usuário criado com sucesso", usuario })

    } catch (error) {
        console.error("Erro na rota POST", error);
        return NextResponse.json({ error: error.message || "Erro ao criar usuário" }, { status: 500 })
    }
}