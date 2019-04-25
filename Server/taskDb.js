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

function getTasks() {
    return new Promise(function (resolve, reject) {
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

function getToDo() {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(URL, function (err, client) {
            if (err) throw err;
            var database = client.db(DATABASENAME);
            var query = {
                complete: false,
                $or: [{
                        date_start_by: {
                            $lte: Date.now()
                        }
                    },
                    {
                        date_due: {
                            $lte: Date.now()
                        }
                    }
                ]
            };
            database.collection(COLLECTIONNAME).find({}).toArray(function (err, res) {
                if (err) throw err;
                console.log(res);
                client.close();
                resolve(res);
            });
        });
    });
}

function getTaskById(searchId) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(URL, function (err, client) {
            if (err) throw err;
            var database = client.db(DATABASENAME);
            var query = {
                _id: Mongo.ObjectId(searchId)
            };
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
    return new Promise(function (resolve, reject) {
        MongoClient.connect(URL, function (err, client) {
            if (err) throw err;
            var database = client.db(DATABASENAME);
            database.collection(COLLECTIONNAME).insertOne(task, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                client.close();
                resolve(res['ops'][0]);
            });
        });
    });
}

function updateTask(task) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(URL, function (err, client) {
            if (err) throw err;
            var database = client.db(DATABASENAME);
            var query = {
                _id: Mongo.ObjectId(task._id)
            };
            delete task._id;
            var newValues = {
                $set: task
            };
            database.collection(COLLECTIONNAME).updateOne(query, newValues, function (err, res) {
                if (err) throw err;
                console.log(res['result']);
                client.close();
                resolve(res['result']);
            });
        });
    });
}

function updateTaskReturnTask(task) {
    return new Promise(function (resolve, reject) {
        id = task._id;
        MongoClient.connect(URL, function (err, client) {
            if (err) throw err;
            var database = client.db(DATABASENAME);
            var query = {
                _id: Mongo.ObjectId(task._id)
            };
            delete task._id;
            var newValues = {
                $set: task
            };
            database.collection(COLLECTIONNAME).updateOne(query, newValues, function (err, res) {
                if (err) throw err;
                database.collection(COLLECTIONNAME).findOne({
                    _id: Mongo.ObjectId(id)
                }, function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    client.close();
                    resolve(res);
                });
            });
        });
    });
}

function updateTaskComplete(task) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(URL, function (err, client) {
            if (err) throw err;
            var database = client.db(DATABASENAME);
            var query = {
                _id: Mongo.ObjectId(task._id)
            };
            var newValues = {
                $set: {
                    complete: task.complete
                }
            };
            database.collection(COLLECTIONNAME).updateOne(query, newValues, function (err, res) {
                if (err) throw err;
                console.log(res['result']);
                client.close();
                resolve(res['result']);
            });
        });
    });
}

function deleteTask(searchId) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(URL, function (err, client) {
            if (err) throw err;
            var database = client.db(DATABASENAME);
            var query = {
                id: Mongo.ObjectId(searchId)
            };
            database.collection(COLLECTIONNAME).deleteOne(query, function (err, res) {
                if (err) throw err;
                console.log("deleted 1 document");
                client.close();
                resolve(res);
            });
        });
    });
}

function termToRegEx(searchTerm) {
    var pattern = ".*";
    for (var i = 0; i < searchTerm.length; i++) {
        var char = searchTerm.charAt(i);
        if (i != 0) {
            pattern += ".*";
        }
        pattern += char;
    }
    pattern += ".*";
    var regex = new RegExp(pattern, "i");
    return regex;
}

function searchTasksByTitle(searchTerm) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(URL, function (err, client) {
            if (err) throw err;
            var database = client.db(DATABASENAME);
            var query = {
                title: new RegExp("new", "i")
            };
            console.log("Searching for " + query);
            console.log(query);
            database.collection(COLLECTIONNAME).find(query).toArray(function (err, res) {
                if (err) throw err;
                console.log(res);
                client.close();
                resolve(res);
            });
        });
    });
}

module.exports = {
    createDatabase,
    createCollect,
    getTasks,
    getToDo,
    getTaskById,
    insertTask,
    updateTask,
    updateTaskReturnTask,
    updateTaskComplete,
    deleteTask,
    searchTasksByTitle
};