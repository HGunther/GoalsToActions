var MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/GoalsToActionsDb";
const DATABASENAME = 'GoalsToActions';
const COLLECTIONNAME = 'tasks';


module.export = function createDatabase() {
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        console.log("Database created!");
        client.close();
    });
}

module.export = function createCollection() {
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var database = client.db(DATABASENAME);
        database.createCollection(COLLECTIONNAME, function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            client.close();
        });
    });
}

module.export = function getTasks(){}
module.export = function getTask(id){}

module.export = function insertTask(task) {
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var database = client.db(DATABASENAME);
        database.collection(COLLECTIONNAME).insertOne(task, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            client.close();
        });
    });
}

module.export = function updateTask(task) {}
module.export = function deleteTask(id) {}