const { Router } = require('express');

const { getProdutos, addProduto, updateProduto, 
    deleteProduto, getProdutoPorCodigo } = require('../controllers/produtoController');
const { verificaJWT } = require('../controllers/segurancaController')    

const rotasProdutos =  new Router();

rotasProdutos.route('/produto')
               .get(getProdutos)
               .post(verificaJWT, addProduto)
               .put(verificaJWT, updateProduto);

rotasProdutos.route('/produto/:codigo')
               .delete(verificaJWT, deleteProduto)
               .get(getProdutoPorCodigo)

module.exports = { rotasProdutos };