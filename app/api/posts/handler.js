import { connection } from "../database/db";


export const getPosts = async () => {
    try {
        const [results] = await connection.query('SELECT * FROM posts');
        return results;
    } catch (error) {
        console.error("Erro na consulta ao banco:", error);
        throw new Error('Erro ao buscar os posts');
    }
};

export const postPosts = async (titulo, conteudo, categoria_id, usuario_id, imagem_url) => {
    try {

        const results = await connection.query('INSERT INTO posts (titulo,conteudo,categoria_id,usuario_id,imagem_url) VALUES (?,?,?,?,?)', [titulo, conteudo, categoria_id, usuario_id, imagem_url])
        return results;
    } catch (error) {
        console.log('Erro no insert do post', error);
        throw new Error('Erro ao Criar Post');

    }
}