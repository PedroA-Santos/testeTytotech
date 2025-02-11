import { connection } from "../database/db"


export const getUsuarios = async () => {


    try {
        const [results] = await connection.query(`SELECT * FROM usuarios`)
        return results;
    } catch (error) {
        console.error("Erro ao listar os usuarios no banco", error);
        throw new Error("Erro ao listar usuários")
    }
}


export const getUsuariosById = async (id) => {

    try {
        const [results] = await connection.query(`SELECT * FROM usuarios WHERE id =?`);
        return results;
    } catch (error) {
        console.error("Erro ao listar os usuario no banco", error);
        throw new Error("Erro ao listar usuário")
    }

}


export const postUsuario = async (nome, email, senha) => {

    try {
        const results = await connection.query(`INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?)`, [nome, email, senha]);
        return results;
    } catch (error) {
        console.error("Erro ao criar o usuario no banco", error);
        throw new Error("Erro ao criar usuário")
    }
}



export const putUsuario = async (nome, email, senha, id) => {


    try {
        const results = await connection.query(`UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id  = ?`, [nome, email, senha, id])
        return results

    } catch (error) {
        console.error("Erro ao atualizar usuario no banco", error)
        throw new Error("Erro ao atualizar usuário")
    }
}




export const deleteUsuario = async (id) => {
    try {
        const results = await connection.query(`DELETE FROM usuarios WHERE id = ?`, [id]);
        return results;
    } catch (error) {
        console.error("Erro ao deletar usuário no banco", error)
        throw new Error("Erro ao deltar usuário")
    }
}
