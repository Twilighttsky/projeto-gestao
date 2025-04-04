const Usuario = require('../models/usuarioModel');

class UsuarioController {
  static async listarUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.render('usuarios/lista', { usuarios });
    } catch (error) {
      res.status(500).send('Erro ao listar usuários');
    }
  }

  static async exibirFormulario(req, res) {
    res.render('usuarios/cadastro');
  }

  static async buscarUsuario(req, res) {
    try {
      const usuario = await Usuario.findById(req.params.id);
      if (!usuario) {
        return res.status(404).send('Usuário não encontrado');
      }
      res.render('usuarios/detalhes', { usuario });
    } catch (error) {
      res.status(500).send('Erro ao buscar usuário');
    }
  }

  static async criarUsuario(req, res) {
    const { nome, email, senha } = req.body;
    
    // Validações básicas
    if (!nome || nome.length < 3) {
      return res.status(400).send('Nome deve ter no mínimo 3 caracteres');
    }
    
    if (!email || !email.includes('@')) {
      return res.status(400).send('Email inválido');
    }
    
    if (!senha || senha.length < 6) {
      return res.status(400).send('Senha deve ter no mínimo 6 caracteres');
    }
    
    try {
      const usuario = { nome, email, senha };
      const id = await Usuario.create(usuario);
      res.redirect('/usuarios');
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).send('Email já cadastrado');
      }
      res.status(500).send('Erro ao criar usuário');
    }
  }

  static async atualizarUsuario(req, res) {
    const { nome, email, senha } = req.body;
    const id = req.params.id;
    
    // Validações básicas
    if (!nome || nome.length < 3) {
      return res.status(400).send('Nome deve ter no mínimo 3 caracteres');
    }
    
    if (!email || !email.includes('@')) {
      return res.status(400).send('Email inválido');
    }
    
    if (!senha || senha.length < 6) {
      return res.status(400).send('Senha deve ter no mínimo 6 caracteres');
    }
    
    try {
      const usuario = { nome, email, senha };
      const sucesso = await Usuario.update(id, usuario);
      if (!sucesso) {
        return res.status(404).send('Usuário não encontrado');
      }
      res.redirect('/usuarios');
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).send('Email já cadastrado');
      }
      res.status(500).send('Erro ao atualizar usuário');
    }
  }

  static async excluirUsuario(req, res) {
    try {
      const sucesso = await Usuario.delete(req.params.id);
      if (!sucesso) {
        return res.status(404).send('Usuário não encontrado');
      }
      res.redirect('/usuarios');
    } catch (error) {
      res.status(500).send('Erro ao excluir usuário');
    }
  }
}

module.exports = UsuarioController;