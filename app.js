// Importa o pacote express
const express = require('express');
const app = express();

// Permite que o express use JSON no corpo das requisições
app.use(express.json());

// Objeto para armazenar o saldo
let balance = { amount: 0 };

// Endpoint para obter o saldo
app.get('/balance', (req, res) => {
    res.json(balance);
});

// Endpoint para enviar um evento que altera o saldo
app.post('/event', (req, res) => {
    const amount = req.body.amount;
        balance.amount += amount;
        res.json({ new_balance: balance.amount });
});

// Define a porta e inicia o servidor
const port = 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
