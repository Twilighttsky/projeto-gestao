const Produto = require('../models/produtoModel');

class ProdutoController {
  static async listarProdutos(req, res) {
    try {
      const produtos = await Produto.findAll();
      res.render('produtos/lista', { produtos });
    } catch (error) {
      res.status(500).send('Erro ao listar produtos');
    }
  }

  static async exibirFormulario(req, res) {
    res.render('produtos/cadastro');
  }

  static async buscarProduto(req, res) {
    try {
      const produto = await Produto.findById(req.params.id);
      if (!produto) {
        return res.status(404).send('Produto não encontrado');
      }
      res.render('produtos/detalhes', { produto });
    } catch (error) {
      res.status(500).send('Erro ao buscar produto');
    }
  }

  static async criarProduto(req, res) {
    const { nome, preco, estoque, descricao } = req.body;
    
    // Validações
    if (!nome || nome.length < 3) {
      return res.status(400).send('Nome do produto deve ter no mínimo 3 caracteres');
    }
    
    if (!preco || isNaN(preco) || parseFloat(preco) <= 0) {
      return res.status(400).send('Preço deve ser um valor positivo');
    }
    
    if (!estoque || isNaN(estoque) || parseInt(estoque) < 0) {
      return res.status(400).send('Estoque deve ser um número inteiro maior ou igual a zero');
    }
    
    try {
      const produto = { nome, preco, estoque, descricao };
      const id = await Produto.create(produto);
      res.redirect('/produtos');
    } catch (error) {
      res.status(500).send('Erro ao criar produto');
    }
  }

  static async atualizarProduto(req, res) {
    const { nome, preco, estoque, descricao } = req.body;
    const id = req.params.id;
    
    if (!nome || nome.length < 3) {
      return res.status(400).send('Nome do produto deve ter no mínimo 3 caracteres');
    }
    
    if (!preco || isNaN(preco) || parseFloat(preco) <= 0) {
      return res.status(400).send('Preço deve ser um valor positivo');
    }
    
    if (!estoque || isNaN(estoque) || parseInt(estoque) < 0) {
      return res.status(400).send('Estoque deve ser um número inteiro maior ou igual a zero');
    }
    
    try {
      const produto = { nome, preco, estoque, descricao };
      const sucesso = await Produto.update(id, produto);
      if (!sucesso) {
        return res.status(404).send('Produto não encontrado');
      }
      res.redirect('/produtos');
    } catch (error) {
      res.status(500).send('Erro ao atualizar produto');
    }
  }

  static async excluirProduto(req, res) {
    try {
      const sucesso = await Produto.delete(req.params.id);
      if (!sucesso) {
        return res.status(404).send('Produto não encontrado');
      }
      res.redirect('/produtos');
    } catch (error) {
      res.status(500).send('Erro ao excluir produto');
    }
  }
}

module.exports = ProdutoController;
