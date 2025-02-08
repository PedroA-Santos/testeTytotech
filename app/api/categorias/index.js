import { deleteCategoria, getCategorias, getCategoriasById, postCategoria, putCategoria } from "./handler";


export default async function handler(req, res) {

    try {

        if (req.method === 'GET') {

            const { id } = req.query;

            if (id) {
                const categoria = await getCategoriasById(id);
                return res.status(200).json(categoria);
            }


            const categorias = await getCategorias();
            return res.status(200).json(categorias)
        }


        if (req.method === 'POST') {
            const categoria = await postCategoria(req.body)
            return res.status(201).json(categoria)
        }


        if (req.method === 'PUT') {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ error: 'ID obrigatório para atualização' });
            }

            const categoria = await putCategoria(id, req.body);
            return res.status(200).json(categoria)



        }


        if (req.method === 'DELETE ') {

            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ error: 'ID obrigatório para atualização' });
            }

            const categoria = await deleteCategoria(id);
            return res.status(200).json({ message: "Categoria deletada com sucesso" })
        }





    } catch (error) {
        console.error("Erro no handler:", error);
        res.status(500).json({ error: error.message || 'Erro interno do servidor' });
    }

}