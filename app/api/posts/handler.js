import { connection } from "../database/db";


export const getPosts = async () => {
    try {
        const [results] = await connection.query(` SELECT posts.id, posts.titulo, posts.conteudo, posts.imagem_url, posts.criado_em, categorias.nome AS categoria
                FROM posts
                LEFT JOIN categorias ON posts.categoria_id = categorias.id
                ORDER BY posts.criado_em DESC`);
        return results;
    } catch (error) {
        console.error("Erro na consulta ao banco:", error);
        throw new Error('Erro ao buscar os posts');
    }
};


export const getPostsById = async (id) => {
    try {
        const [results] = await connection.query('SELECT * FROM posts WHERE id = ?',
            [id]
        );
        return results
    } catch (error) {
        console.error("Erro na consulta no banco:", error)
        throw new Error("Erro ao buscar post")
    }
}

export const postPosts = async (titulo, conteudo, categoria_id, usuario_id, imagem_url) => {
    try {

        const results = await connection.query('INSERT INTO posts (titulo,conteudo,categoria_id,usuario_id,imagem_url) VALUES (?,?,?,?,?)', [titulo, conteudo, categoria_id, usuario_id, imagem_url])
        return results;
    } catch (error) {
        console.error('Erro no insert do post', error);
        throw new Error('Erro ao Criar Post');

    }
}


export const putPost = async (titulo, conteudo, categoria_id, usuario_id, imagem_url, id) => {
    try {
        const results = await connection.query(`UPDATE posts SET titulo = ? , conteudo = ? , categoria_id = ?, usuario_id = ? , imagem_url= ? WHERE id =? `,
            [titulo, conteudo, categoria_id, usuario_id, imagem_url, id]
        )

        return results;
    } catch (error) {
        console.error('Erro no update de posts', error);
        throw new Error('Erro ao dar update no post');
    }
}



export const deletePost = async (id) => {
    try {
        const results = await connection.query(`DELETE FROM posts WHERE id = ?`, [id])
        return results;
    } catch (error) {
        console.error('Erro ao deletar o post no banco', error)
        throw new Error('Erro ao dar o delete no post')
    }
}