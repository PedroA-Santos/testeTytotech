import { getPosts, postPosts } from '../posts/handler';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const posts = await getPosts();
            res.status(200).json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar os posts' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }

    if (req.method === 'POST') {
        try {
            const post = await postPosts();
            res.status(200).json(post);
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Erro ao criar Post" })
        }

    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}