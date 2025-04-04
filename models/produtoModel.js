const db = require('../config/database');

class Produto {
  static async findAll() {
    const [rows] = await db.promise().query('SELECT * FROM produtos');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.promise().query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(produto) {
    const { nome, preco, estoque, descricao } = produto;
    const [result] = await db.promise().query(
      'INSERT INTO produtos (nome, preco, estoque, descricao) VALUES (?, ?, ?, ?)',
      [nome, preco, estoque, descricao]
    );
    return result.insertId;
  }

  static async update(id, produto) {
    const { nome, preco, estoque, descricao } = produto;
    const [result] = await db.promise().query(
      'UPDATE produtos SET nome = ?, preco = ?, estoque = ?, descricao = ? WHERE id = ?',
      [nome, preco, estoque, descricao, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.promise().query('DELETE FROM produtos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Produto;