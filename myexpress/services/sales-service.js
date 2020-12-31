const mongodb = require('mongodb');

const uri = "mongodb://localhost:27017/stockmanager?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, {useNewUrlParser: true,useUnifiedTopology: true});

var salesCollection;
var SalesService = function() {
    client.connect().then(function(clientt) {
        var db = clientt.db('stockmanager');
        salesCollection = db.collection('sales');
    }).catch(function(error) {
        console.log(error);
    })
}

SalesService.prototype.getSales = function() {
    return stocksCollection.find({}).toArray().then((items) => { 
                return items;
            }).catch((err) => {
                return err;
            });
}

SalesService.prototype.addSale = function(companyName, billAmount, billDate) {
    var saleByCompany = {
        companyName: companyName,
        billAmount: parseFloat(billAmount),
        billDate: billDate
    };
    return salesCollection.insertOne(saleByCompany);
}

SalesService.prototype.payBill = function(companyName, billPayed, billDate) {
    var filter = {companyName: companyName, billDate: billDate};
    salesCollection.findOne(filter)
    .then((item) => {
        const updateDoc = {
                $set: {
                    due: parseFloat(item.billAmount) - parseFloat(billPayed),
                    billPayed: parseFloat(billPayed),
                },
            };
        return salesCollection.updateOne(filter,updateDoc);
    })
}
module.exports = new SalesService();
