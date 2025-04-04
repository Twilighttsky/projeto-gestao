const db = require('../config/database');

class Usuario {
  static async findAll() {
    const [rows] = await db.promise().query('SELECT * FROM usuarios');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(usuario) {
    const { nome, email, senha } = usuario;
    const [result] = await db.promise().query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senha]
    );
    return result.insertId;
  }

  static async update(id, usuario) {
    const { nome, email, senha } = usuario;
    const [result] = await db.promise().query(
      'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
      [nome, email, senha, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.promise().query('DELETE FROM usuarios WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Usuario;