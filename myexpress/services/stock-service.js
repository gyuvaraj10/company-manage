const mongodb = require('mongodb');

const uri = "mongodb://localhost:27017/stockmanager?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, {useNewUrlParser: true,useUnifiedTopology: true});
var db;
var MondoDBService = function() {
    client.connect().then(function(clientt) {
        console.log(clientt.isConnected());
        db = clientt.db('stockmanager');
    }).catch(function(error) {
        console.log(error);
    })
}

MondoDBService.prototype.updateStockQuantity = function(pName, quantitySold) {
    const stocksCollection = db.collection('stocks');
    var options = {upsert: true};
    var filter = {productName: pName, productQuantity: {$gt: 0}};
    console.log(quantitySold);
    console.log(parseFloat(quantitySold));
    return stocksCollection.findOne(filter).then((item) => {
        const updateDoc = {
                            $set: {
                                productQuantity: parseFloat(item.productQuantity)-parseFloat(quantitySold),
                            },
                            };
        return stocksCollection.updateOne(filter,updateDoc, options);
    })
}

MondoDBService.prototype.saveRecord = function(record) {
    const stocksCollection = db.collection('stocks');
    console.log(record);
    return stocksCollection.insertOne(record);
}

MondoDBService.prototype.getStock = function() {
    const stocksCollection = db.collection('stocks');
    var filter = {productQuantity: {$gt: 0}}
    return stocksCollection.find(filter).toArray().then((items) => { 
                return items;
            }).catch((err) => {
                return err;
            });
}

module.exports = new MondoDBService();
