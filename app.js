require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configuração do EJS como view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Rotas
const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/produtos', produtoRoutes);
app.use('/usuarios', usuarioRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Inicialização do servidor
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});