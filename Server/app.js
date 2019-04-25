const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const taskDb = require('./taskDb');


const hostname = '127.0.0.1';
const port = 3000;


// Middleware
app.use(bodyParser.json());


// Home
app.get('/', function (req, res) {
    console.log("Recieved " + req.method + " at " + req.path);
    res.status(200).send('You found me!');
})

// Get Tasks
app.get('/api/tasks/all', function (req, res) {
    console.log("Recieved " + req.method + " at " + req.path);
    taskDb.getTasks().then(function (tasks) {
        res.send(tasks)
    });
})

app.get('/api/tasks/to-do', function (req, res) {
    console.log("Recieved " + req.method + " at " + req.path);
    taskDb.getToDo().then(function (tasks) {
        res.send(tasks)
    });
})

// Get specified task
app.get('/api/task*', function (req, res) {
    console.log("Recieved " + req.method + " at " + req.path);
    if (req.query.id) {
        id = req.query.id;
        taskDb.getTaskById(id).then(function (task) {
            res.send(task)
        });
    } else if (req.query.title) {
        searchTerm = req.query.title;
        taskDb.searchTasksByTitle(searchTerm).then(function (tasks) {
            res.send(tasks)
        });
    } else {
        res.send({});
    }
})



// Update task
app.put('/api/task', function (req, res) {
    console.log("Recieved " + req.method + " at " + req.path);
    var recievedTask = req.body
    console.log("Updating task");
    console.log(recievedTask);
    taskDb.updateTaskReturnTask(recievedTask).then(function (updatedTask) {
        res.send(updatedTask)
    });
})

// Add task
app.post('/api/task', function (req, res) {
    console.log("Recieved " + req.method + " at " + req.path);
    var recievedTask = req.body
    delete recievedTask._id;
    console.log(recievedTask);
    taskDb.insertTask(recievedTask).then(function (newTask) {
        res.send(newTask)
    });
})

// Delete task
app.delete('/api/task', function (req, res) {
    console.log("Recieved " + req.method + " at " + req.path);
    var recievedTask = req.body;
    taskDb.deleteTask(recievedTask._id).then(function () {
        res.send()
    });
})

// Default routes
app.get('*', function (req, res) {
    console.log("Recieved unknown " + req.method + " at " + req.path);
    res.status(404).send('You done messed up!');
})
app.put('*', function (req, res) {
    console.log("Recieved unknown " + req.method + " at " + req.path);
    res.status(404).send('You done messed up!');
})
app.post('*', function (req, res) {
    console.log("Recieved unknown " + req.method + " at " + req.path);
    res.status(404).send('You done messed up!');
})
app.delete('*', function (req, res) {
    console.log("Recieved unknown " + req.method + " at " + req.path);
    res.status(404).send('You done messed up!');
})

// Start Server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});