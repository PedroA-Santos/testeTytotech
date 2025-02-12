import { connection } from "../database/db"
import { bcrypt } from "bcryptjs"


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
        const [results] = await connection.query(`SELECT * FROM usuarios WHERE id =?`, [id]);
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


export const getUsuarioByemail = async (email) => {
    try {
        const [results] = await connection.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);

        // Se não encontrar nenhum usuário, retorna null
        if (results.length === 0) {
            return null;
        }

        // Retorna o primeiro usuário encontrado
        return results[0];
    } catch (error) {
        console.error("Erro ao buscar email", error);
        throw new Error("Erro ao buscar usuário");
    }
}




export async function criarUsuario(nome, email, senha) {

    const senhaHash = await bcrypt.hash(senha, 10); // Hash da senha

    await db.query("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [nome, email, senhaHash]);
}
