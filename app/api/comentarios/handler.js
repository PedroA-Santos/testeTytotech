import { connection } from "../database/db";


export const getComentarios = async () => {
    try {
        const [results] = await connection.query(`SELECT * FROM comentarios`)
        return results;
    } catch (error) {
        console.error("Erro ao buscar comentários no banco", error)
        throw new Error("Erro ao buscar comentários")
    }
}



export const getComentariosByPostId = async (post_id) => {
    try {
        const [results] = await connection.query(
            `SELECT * FROM comentarios WHERE post_id = ?`,
            [post_id]
        );
        return results;
    } catch (error) {
        console.error("Erro ao buscar comentários do post no banco", error);
        throw new Error("Erro ao buscar comentários");
    }
};





export const postComentarios = async (post_id, usuario_id, conteudo, criado_em) => {

    try {
        const results = await connection.query(`INSERT INTO comentarios (post_id, usuario_id, conteudo, criado_em) VALUES (?,?,?,?)`, [post_id, usuario_id, conteudo, criado_em])
        return results;
    } catch (error) {
        console.error("Erro ao inserir dados na tabela do banco")
        throw new Error("Erro ao criar comentario")
    }

}



export const putComentarios = async (post_id, usuario_id, conteudo, criado_em, id) => {
    try {
        const results = await connection.query(`UPDATE comentarios SET post_id = ? , usuario_id = ? , conteudo = ?, criado_em = ? WHERE id =? `, [post_id, usuario_id, conteudo, criado_em, id]);
        return results;
    } catch (error) {
        console.error("Erro ao atualizar comentario no banco", error)
        throw new Error("Erro ao atualizar comentario")
    }
}




export const deleteComentarios = async (id) => {
    try {
        const results = await connection.query(`DELETE FROM comentarios WHERE id = ?`, [id]);
        return results;
    } catch (error) {
        console.error("Erro ao deletar no banco", error)
        throw new Error("Erro ao deletar comentário")

    }
}