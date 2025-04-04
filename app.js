require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/produtos', produtoRoutes);
app.use('/usuarios', usuarioRoutes);
app.get('/', (req, res) => {
  res.render('index');
});


const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
