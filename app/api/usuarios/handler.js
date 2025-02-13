import { connection } from "../database/db"
import bcrypt from 'bcrypt';


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
        // Criptografando a senha com bcrypt antes de salvar no banco
        const hashedPassword = await bcrypt.hash(senha, 10);  // '10' é o número de salt rounds

        // Inserindo o usuário com a senha criptografada no banco de dados
        const results = await connection.query(
            `INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?)`,
            [nome, email, hashedPassword]
        );

        return results;
    } catch (error) {
        console.error("Erro ao criar o usuário no banco", error);
        throw new Error("Erro ao criar usuário");
    }
};


export const putUsuario = async (nome, email, senha, id) => {
    try {
        // Se uma nova senha for fornecida, criptografa ela com bcrypt
        let senhaAtualizada = senha;

        if (senha) {
            senhaAtualizada = await bcrypt.hash(senha, 10);  // Criptografando a nova senha
        }

        // Atualiza o usuário no banco de dados, com ou sem senha criptografada
        const results = await connection.query(
            `UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?`,
            [nome, email, senhaAtualizada, id]
        );

        return results;
    } catch (error) {
        console.error("Erro ao atualizar usuário no banco", error);
        throw new Error("Erro ao atualizar usuário");
    }
};




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



