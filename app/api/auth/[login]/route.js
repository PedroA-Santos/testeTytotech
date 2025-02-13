import { NextResponse } from "next/server";
import { getUsuarioByemail } from "../../usuarios/handler";
import bcrypt from 'bcrypt';

export async function POST(request) {
    const { email, senha } = await request.json();

    // Verificação simples de dados obrigatórios
    if (!email || !senha) {
        return NextResponse.json({ message: "Email e senha são obrigatórios" }, { status: 400 });
    }

    try {

        const usuario = await getUsuarioByemail(email);

        // Se não encontrar o usuário ou se o hash da senha não corresponder
        if (!usuario) {
            return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
        }

        // Comparando a senha fornecida com o hash da senha armazenada
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
        }


        return NextResponse.json({ message: "Login realizado com sucesso!", usuario }, { status: 200 });
    } catch (error) {
        console.error("ERRO NA ROTA LOGIN", error);
        return NextResponse.json({ error: error.message || "Erro ao realizar login" }, { status: 500 });
    }
}
