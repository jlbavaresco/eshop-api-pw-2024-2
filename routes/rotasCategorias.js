const { Router } = require('express');

const { getCategorias, addCategoria, updateCategoria,
    deleteCategoria, getCategoriaPorCodigo } = require('../controllers/categoriaController');
const { verificaJWT } = require('../controllers/segurancaController')

const rotasCategorias =  new Router();

rotasCategorias.route('/categoria')
               .get(verificaJWT, getCategorias)
               .post(verificaJWT, addCategoria)
               .put(verificaJWT, updateCategoria);

rotasCategorias.route('/categoria/:codigo')
               .delete(verificaJWT, deleteCategoria)
               .get(verificaJWT, getCategoriaPorCodigo)

module.exports = { rotasCategorias };