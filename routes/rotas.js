const { Router } = require('express');

const { rotasCategorias } = require('./rotasCategorias');
const { rotasProdutos } = require('./rotasProdutos');
const { login } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.use(rotasCategorias);
rotas.use(rotasProdutos);

rotas.route("/login")
   .post(login)           
	 

module.exports = rotas;