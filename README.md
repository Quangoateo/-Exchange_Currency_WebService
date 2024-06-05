## Guide line to test on POSTMAN
## GET METHOD
### Test rates Endpoint first
Method : Get
Look for params section, then type baseCurrency for key, USD for value .
URL: http://localhost:3000/rates?baseCurrency=USD
Open a new tab in Postman.
Select GET from the dropdown menu.
Enter the URL: http://localhost:3000/rates?baseCurrency=USD.
Click Send
## POST METHOD
### TEST exchange Endpoint 
Method :POST
Look for Body section
Select raw, JSON format 
Test the exchange endpoint 
URL: http://localhost:3000/exchange

Json
{
    "fromCurrency": "USD",
    "toCurrency": "EUR",
    "amount": 100
}
then we should receive a JSON response with the converted amount

{
    "fromCurrency": "USD",
    "toCurrency": "EUR",
    "amount": 100,
    "exchangeAmount": 85 // Assuming the exchange rate from USD to EUR is 0.85
}
