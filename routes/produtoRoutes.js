const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');


router.get('/', ProdutoController.listarProdutos);
router.get('/novo', ProdutoController.exibirFormulario);
router.get('/:id', ProdutoController.buscarProduto);
router.post('/', ProdutoController.criarProduto);
router.put('/:id', ProdutoController.atualizarProduto);
router.delete('/:id', ProdutoController.excluirProduto);

module.exports = router;