import { NextResponse } from "next/server";
import { getUsuarioByemail } from "../../usuarios/handler";



//FALTA ADICIONAR HASH E BCRYPT
export async function POST(request) {

    const { email, senha } = await request.json();

    if (!email || !senha) {
        return NextResponse.json({ message: "Email e senha são obrigatórios" }, { status: 400 });
    }


    try {
        const usuario = await getUsuarioByemail(email);
        console.log(email);
        console.log(usuario.senha);
        
        


        if (!usuario || usuario.senha !== senha) {
            return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
        }

        return NextResponse.json({ message: "Login realizado com sucesso!", usuario }, { status: 200 });
    } catch (error) {
        console.error("ERRO NA ROTA LOGIN", error)
        return NextResponse.json({ error: error.message || "Erro ao realizar login" }, { status: 500 })
    }

}