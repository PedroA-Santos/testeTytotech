import { getPosts, postPosts, putPost } from '../posts/handler';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const posts = await getPosts();
        if (posts.length === 0) {
            return NextResponse.json({ message: "Nenhum post encontrado" })
        }
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Erro na rota /api/posts:", error.message);
        return NextResponse.json({ error: error.message || 'Erro ao buscar os posts' }, { status: 500 });
    }
}


export async function POST(request) {
    try {
        const { titulo, conteudo, categoria_id, usuario_id, imagem_url } = await request.json();
        const post = await postPosts(titulo, conteudo, categoria_id, usuario_id, imagem_url);
        return NextResponse.json(post);
    } catch (error) {
        console.error("Erro na rota POST:", error.message);
        return NextResponse.json({ error: error.message || 'Erro ao criar posts' }, { status: 500 });
    }
}


