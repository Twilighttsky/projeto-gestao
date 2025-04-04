const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

router.get('/', UsuarioController.listarUsuarios);
router.get('/novo', UsuarioController.exibirFormulario);
router.get('/:id', UsuarioController.buscarUsuario);
router.post('/', UsuarioController.criarUsuario);
router.put('/:id', UsuarioController.atualizarUsuario);
router.delete('/:id', UsuarioController.excluirUsuario);

module.exports = router;