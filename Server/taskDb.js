var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;
const URL = "mongodb://localhost:27017/GoalsToActionsDb";
const DATABASENAME = 'GoalsToActions';
const COLLECTIONNAME = 'tasks';

function createDatabase() {
    MongoClient.connect(URL, function (err, client) {
        if (err) throw err;
        console.log("Database created!");
        client.close();
    });
}

function createCollect() {
    MongoClient.connect(URL, function (err, client) {
        if (err) throw err;
        var database = client.db(DATABASENAME);
        database.createCollection(COLLECTIONNAME, function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            client.close();
        });
    });
}

function getTasks(){
    return new Promise( function(resolve, reject) {
        MongoClient.connect(URL, function (err, client) {
            if (err) throw err;
            var database = client.db(DATABASENAME);
            database.collection(COLLECTIONNAME).find({}).toArray(function (err, res) {
                if (err) throw err;
                console.log(res);
                client.close();
                resolve(res);
            });
        });
    });
}

function getTask(searchId){
    return new Promise( function(resolve, reject) {
        MongoClient.connect(URL, function (err, client) {
            if (err) throw err;
            var database = client.db(DATABASENAME);
            var query = { _id: Mongo.ObjectId(searchId) };
            database.collection(COLLECTIONNAME).findOne(query, function (err, res) {
                if (err) throw err;
                console.log(res);
                client.close();
                resolve(res);
            });
        });
    });
}

function insertTask(task) {
    MongoClient.connect(URL, function (err, client) {
        if (err) throw err;
        var database = client.db(DATABASENAME);
        database.collection(COLLECTIONNAME).insertOne(task, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            client.close();
        });
    });
}

function updateTask(task) {
    MongoClient.connect(URL, function (err, client) {
        if (err) throw err;
        var database = client.db(DATABASENAME);
        var query = { id: task.id };
        database.collection(COLLECTIONNAME).updateOne(query, task, function (err, res) {
            if (err) throw err;
            console.log(res);
            client.close();
        });
    });
}

function deleteTask(searchId) {
    MongoClient.connect(URL, function (err, client) {
        if (err) throw err;
        var database = client.db(DATABASENAME);
        var query = { id: searchId };
        database.collection(COLLECTIONNAME).deleteOne(query, function(err, res) {
            if (err) throw err;
            console.log("deleted 1 document");
            client.close();
        });
    });
}

module.exports = { createDatabase, createCollect, getTasks, getTask, insertTask, updateTask, deleteTask };