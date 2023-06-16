const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3306;

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jayane2306',
  database: 'auto'
});

// Conexão com o banco de dados
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Configuração do middleware para analisar os dados enviados no corpo da solicitação
app.use(bodyParser.urlencoded({ extended: false }));

// Rota para a página de login (método GET)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Teste.html');
});

// Rota para processar a solicitação de login (método POST)
app.post('/Teste', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Consulta ao banco de dados para verificar as credenciais
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        throw err;
      }

      if (results.length > 0) {
        res.send('Login bem-sucedido!'); // Credenciais válidas
      } else {
        res.send('Credenciais inválidas. Tente novamente.'); // Credenciais inválidas
      }
    }
  );
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
