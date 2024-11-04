const { getProdutosDB, addProdutoDB, updateProdutoDB, 
    deleteProdutoDB, getProdutoPorCodigoDB } = require('../usecases/produtoUseCases');

const getProdutos = async (request, response) => {
    await getProdutosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultas os produtos: ' + err
        }))
}

const addProduto = async (request, response) => {
    await addProdutoDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Produto criado com sucesso',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao adicionar o produto: ' + err
        }))
}

const updateProduto = async (request, response) => {
    await updateProdutoDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Produto atualizado com sucesso',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao atualizar o produto: ' + err
        }))
}

const deleteProduto = async (request, response) => {
    await deleteProdutoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao remover o produto: ' + err
        }))
}

const getProdutoPorCodigo = async (request, response) => {
    await getProdutoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao recuperar o produto: ' + err
        }))
}

module.exports = {
    getProdutos, addProduto, updateProduto, 
    deleteProduto, getProdutoPorCodigo
}