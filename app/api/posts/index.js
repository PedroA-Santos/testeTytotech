import { deletePost, getPosts, postPosts, putPost } from '../posts/handler';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { id } = req.query;

            if (id) {
                const post = await getPosts(id);
                return res.status(200).json(post);
            }

            const posts = await getPosts();
            return res.status(200).json(posts);
        }

        if (req.method === 'POST') {
            const post = await postPosts(req.body);
            return res.status(201).json(post);
        }

        if (req.method === 'PUT') {
            const { id } = req.query || req.body;

            if (!id) {
                return res.status(400).json({ error: 'ID obrigatório para atualização' });
            }

            const post = await putPost(id, req.body);
            return res.status(200).json(post);
        }


        if (req.method === 'DELETE') {
            const { id } = req.query || req.body

            if (!id) {
                return res.status(400).json({ error: 'ID obrigatório para atualização' });
            }

            const postDelete = await deletePost(id);
            return res.status(200).json({ message: 'Post deletado com sucesso' })
        }

        res.status(405).json({ error: 'Método não permitido' });
    } catch (error) {
        console.error("Erro no handler:", error);
        res.status(500).json({ error: error.message || 'Erro interno do servidor' });
    }
}
