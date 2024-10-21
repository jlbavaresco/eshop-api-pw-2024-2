const { getCategoriasDB, addCategoriaDB, updateCategoriaDB,
    deleteCategoriaDB, getCategoriaPorCodigoDB } = require('../usecases/categoriaUseCases');

const getCategorias = async (request, response) => {
    await getCategoriasDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultas as categorias: ' + err
        }))
}

const addCategoria = async (request, response) => {
    await addCategoriaDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Categoria criada com sucesso',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao adicionar a categoria: ' + err
        }))
}

const updateCategoria = async (request, response) => {
    await updateCategoriaDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Categoria atualizada com sucesso',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao atualizar a categoria: ' + err
        }))
}

const deleteCategoria = async (request, response) => {
    await deleteCategoriaDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao remover a categoria: ' + err
        }))
}

const getCategoriaPorCodigo = async (request, response) => {
    await getCategoriaPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao recuperar a categoria: ' + err
        }))
}

module.exports = {
    getCategorias, addCategoria, updateCategoria,
    deleteCategoria, getCategoriaPorCodigo
}