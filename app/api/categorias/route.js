import { NextResponse } from "next/server";
import { getCategorias, postCategoria } from "./handler";



export async function GET() {

    try {
        const categorias = await getCategorias();

        if (categorias.length === 0) {
            return NextResponse.json({ message: "Nenhuma categoria encontrada" });
        }


        return NextResponse.json(categorias);
    } catch (error) {

        console.error("erro na rota GET", error);
        throw new Error("Erro ao buscar as categorias ")

    }
}
export async function POST(request) {


    const { nome, descricao } = await request.json();

    try {
        const categoria = await postCategoria(nome, descricao)
        return NextResponse.json(categoria)

    } catch (error) {
        console.error("Erro na rota POST", error.message);
        return NextResponse.json({ error: error.message || 'Erro ao criar categoria' }, { status: 500 });
    }

}