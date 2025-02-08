import { connection } from "../database/db";


export const getCategorias = async () => {

    try {
        const [results] = await connection.query(`SELECT * FROM categorias`);
        return results
    } catch (error) {
        console.error("Erro ao listar todas as categorias no banco", error)
        throw new Error("Erro ao buscar as categorias")
    }


}

export const getCategoriasById = async (id) => {

    try {
        const [results] = await connection.query(`SELECT * FROM categorias WHERE id = ?`, [id])
        return results;
    } catch (error) {
        console.error("Erro ao buscar categoria", error);
        throw new Error("Erro ao buscar categoria")
    }

}
export const postCategoria = async (nome, descricao) => {
    try {
        const results = await connection.query(`INSERT INTO categorias (nome,descricao) VALUES (?,?)`, [nome, descricao])
        return results;
    } catch (error) {
        console.error("Erro ao inserir Na tabela Categorias", error);
        throw new Error("Erro ao criar categoria")
    }
}


export const putCategoria = async (nome, descricao, id) => {

    try {
        const results = await connection.query(`UPDATE categorias SET nome = ? , descricao = ? WHERE id = ?`, [nome, descricao, id]);
        return results;
    } catch (error) {
        console.error("Erro ao dar update na tabela categorias", error);
        throw new Error("Erro ao atualizar categoria")
    }
}


export const deleteCategoria = async (id) => {
    try {
        const results = await connection.query("DELETE FROM categorias WHERE id =? ", [id])
        return results;
    } catch (error) {
        console.error("Erro ao deletar categoria do banco");
        throw new Error("Erro ao deletar categoria")
    }
}