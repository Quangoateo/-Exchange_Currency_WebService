// server.js
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
// Endpoint for getting exchange rates
app.get('/rates', async (req, res) => {
    const { baseCurrency } = req.query;
    if (!baseCurrency) {
        return res.status(400).send('Please provide baseCurrency.');
    }
    try {
        // Fetch exchange rates
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const rates = response.data.rates;
        res.json({
            baseCurrency,
            rates
        });
    } catch (error) {
        res.status(500).send('Error fetching exchange rates.');
    }
});
// Middleware to parse JSON bodies
app.use(express.json());
// Endpoint for currency exchange

app.post('/exchange', async (req, res) => {
    const { fromCurrency, toCurrency, amount } = req.body;
    if (!fromCurrency || !toCurrency || !amount) {
        return res.status(400).send('Please provide fromCurrency, toCurrency, and amount.');
    }
    try {
        // Fetch exchange rates
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const rates = response.data.rates;

        if (!rates[toCurrency]) {
            return res.status(400).send('Invalid target currency.');
        }

        // Calculate the exchange amount
        const exchangeRate = rates[toCurrency];
        const exchangeAmount = amount * exchangeRate;

        res.json({
            fromCurrency,
            toCurrency,
            amount,
            exchangeAmount
        });
    } catch (error) {
        res.status(500).send('Error fetching exchange rates.');
    }
});

app.listen(port, () => {
    console.log(`Currency exchange service listening at http://localhost:${port}`);
});
