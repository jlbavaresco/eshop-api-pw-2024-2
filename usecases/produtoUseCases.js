const { pool } = require('../config');
const Produto = require('../entities/produto');

const getProdutosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT p.codigo AS codigo, p.nome AS nome, p.descricao AS descricao, 
                    p.quantidade_estoque AS quantidade_estoque, p.ativo AS ativo, 
                    p.valor AS valor, to_char(p.data_cadastro,'YYYY-MM-DD') AS data_cadastro, 
                    p.categoria AS categoria, c.nome as categoria_nome
                    FROM produtos p 
                    JOIN categorias c ON c.codigo = p.categoria
                    ORDER BY p.codigo`);
        return rows.map((produto) =>
            new Produto(produto.codigo, produto.nome,
                produto.descricao, produto.quantidade_estoque,
                produto.ativo, produto.valor,
                produto.data_cadastro, produto.categoria,
                produto.categoria_nome));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addProdutoDB = async (body) => {
    try {
        const { nome, descricao, quantidade_estoque, ativo, valor,
            data_cadastro, categoria } = body;
        const results = await pool.query(`INSERT INTO produtos (nome, descricao, 
            quantidade_estoque, ativo, valor, data_cadastro, categoria)
            VALUES ($1, $2, $3, $4, $5 ,$6, $7) RETURNING codigo, nome, 
            descricao, quantidade_estoque, ativo, valor,
            to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro, categoria`,
            [nome, descricao, quantidade_estoque, ativo, valor,
                data_cadastro, categoria]);
        const produto = results.rows[0];
        return new Produto(produto.codigo, produto.nome,
            produto.descricao, produto.quantidade_estoque,
            produto.ativo, produto.valor,
            produto.data_cadastro, produto.categoria,
            "");
    } catch (err) {
        throw "Erro ao inserir a produto: " + err;
    }
}

const updateProdutoDB = async (body) => {
    try {
        const { codigo, nome, descricao, quantidade_estoque, ativo, valor,
            data_cadastro, categoria } = body;
        const results = await pool.query(`UPDATE produtos SET nome = $2,
            descricao = $3, quantidade_estoque = $4, ativo = $5, valor = $6, 
            data_cadastro = $7, categoria = $8
            WHERE codigo = $1
            RETURNING codigo, nome, 
            descricao, quantidade_estoque, ativo, valor,
            to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro, categoria`,
            [codigo, nome, descricao, quantidade_estoque, ativo, valor,
                data_cadastro, categoria]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}
            para ser alterado`;
        }
        const produto = results.rows[0];
        return new Produto(produto.codigo, produto.nome,
            produto.descricao, produto.quantidade_estoque,
            produto.ativo, produto.valor,
            produto.data_cadastro, produto.categoria,
            "");
    } catch (err) {
        throw "Erro ao alterar o produto: " + err;
    }
}

const deleteProdutoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM produtos
            WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}
            para ser removido`;
        } else {
            return "Produto removido com sucesso!"
        }
    } catch (err) {
        throw "Erro ao remover o produto: " + err;
    }
}

const getProdutoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(
            `SELECT p.codigo AS codigo, p.nome AS nome, p.descricao AS descricao, 
                    p.quantidade_estoque AS quantidade_estoque, p.ativo AS ativo, 
                    p.valor AS valor, to_char(p.data_cadastro,'YYYY-MM-DD') AS data_cadastro, 
                    p.categoria AS categoria, c.nome as categoria_nome
                    FROM produtos p 
                    JOIN categorias c ON c.codigo = p.categoria
                    WHERE p.codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const produto = results.rows[0];
            return new Produto(produto.codigo, produto.nome,
                produto.descricao, produto.quantidade_estoque,
                produto.ativo, produto.valor,
                produto.data_cadastro, produto.categoria,
                "");
        }
    } catch (err) {
        throw "Erro ao recuperar o produto: " + err;
    }
}

module.exports = {
    getProdutosDB, addProdutoDB, updateProdutoDB, 
    deleteProdutoDB, getProdutoPorCodigoDB
}