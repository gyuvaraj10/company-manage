const express  = require('express');
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var stockmongo = require('./services/stock-service');
var salesService = require('./services/sales-service');

app.get('/stock-manager/stock', function(req, res){
    stockmongo.getStock().then(function(data) {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
});

app.post('/stock-manager/stock', function(req, res) {
    stockmongo.saveRecord(req.body).then(function(data) {
        res.send(data);
    }).catch(function(error) {
        res.send(error);
    })
})

app.put('/stock-manager/stock', function(req , res) {
    stockmongo.updateStockQuantity(req.body['productName'], req.body['quantitySold']).then(function(data) {
        res.send(data);
    }).catch(function(error) {
        res.send(error);
    })
})

app.get('/sales', function(req, res) {
    salesService.getSales().then((data) => {
        res.send(data);
    }).catch((error)=> {
        res.send(error);
    })
})

app.post('/sales', function(req, res) {
    salesService.addSale(req.body['companyName'], 
    req.body['billAmount'], req.body['billDate']).then((data) => {
        res.send(data);
    }).catch((error)=> {
        res.send(error);
    })
})

app.put('/sales/pay', function(req, res) {
    salesService.payBill(req.body['companyName'], 
    req.body['billAmount'], req.body['billDate']).then((data) => {
        res.send(data);
    }).catch((error)=> {
        res.send(error);
    })
})

app.listen(3000);