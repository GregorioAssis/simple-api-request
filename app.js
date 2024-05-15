const express = require('express');
const app = express();
app.use(express.json()); // Enable JSON support

let accounts = {}; 

// Resets all account data
app.post('/reset', (req, res) => {
    accounts = {};
    res.status(200).send('OK');
});

// Retrieves the balance
app.get('/balance', (req, res) => {
    const { account_id } = req.query;
    if (accounts[account_id]) {
        res.json({ balance: accounts[account_id].balance });
    } else {
        res.status(404).send('0');
    }
});

// Different types of financial events
app.post('/event', (req, res) => {
    const { type, destination, origin, amount } = req.body;
    switch (type) {
        case 'deposit':
            if (!accounts[destination]) {
                accounts[destination] = { balance: 0 }; // Create  account
            }
            accounts[destination].balance += amount;
            res.status(201).json({ destination: { id: destination, balance: accounts[destination].balance } });
            break;
        case 'withdraw':
            if (!accounts[origin] || accounts[origin].balance < amount) {
                res.status(404).send('0');
            } else {
                accounts[origin].balance -= amount;
                res.status(201).json({ origin: { id: origin, balance: accounts[origin].balance } });
            }
            break;
        case 'transfer':
            if (!accounts[origin] || accounts[origin].balance < amount || !accounts[destination]) {
                res.status(404).send('0');
            } else {
                if (!accounts[destination]) {
                    accounts[destination] = { balance: 0 }; // Create account
                }
                accounts[origin].balance -= amount;
                accounts[destination].balance += amount;
                res.status(201).json({ origin: { id: origin, balance: accounts[origin].balance }, destination: { id: destination, balance: accounts[destination].balance } });
            }
            break;
        default:
            res.status(400).send('Invalid event');
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});