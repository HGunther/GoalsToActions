const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;

const taskDb = require('./taskDb');

const MOCKTASKS = [
    {
      id: 1,
      title: "Finish this app",
      description: "Keep doing what you're doing. You'll get there.",
      date_created: new Date(2019, 3, 8, 21, 31),
      date_due: new Date(2019, 4, 0, 21, 31),
      date_start_by: new Date(2019, 3, 8, 21, 31),
      complete: false
    },
    {
      id: 2,
      title: "Clean your room",
      description: "Keep doing what you're doing. You'll get there.",
      date_created: new Date(2019, 3, 8, 21, 31),
      date_due: new Date(2019, 4, 0, 21, 31),
      date_start_by: new Date(2019, 3, 8, 21, 31),
      complete: false
    }]


app.use(bodyParser.json());

// Home
app.get('/', function(req, res) {
    console.log("Recieved " + req.method +  " at " + req.path);
    res.status(200).send('You found me!');
})

// Get Tasks
app.get('/api/tasks', function (req, res) {
    console.log("Recieved " + req.method +  " at " + req.path);
    taskDb.getTasks().then( function(tasks){res.send(tasks)});
})

// Get specified task
app.get('/api/task*', function (req, res) {
    console.log("Recieved " + req.method +  " at " + req.path);
    id = req.query.id;
    taskDb.getTask(id).then( function(task){res.send(task)});
})

// Update task
app.put('/api/task', function (req, res) {
    console.log("Recieved " + req.method +  " at " + req.path);
    var recievedTask = req.body
    console.log("Updating task");
    console.log(recievedTask);
    taskDb.updateTask(recievedTask._id).then( function(updatedTask){res.send(updatedTask)});
})

// Add task
app.post('/api/task', function (req, res) {
    console.log("Recieved " + req.method +  " at " + req.path);
    var recievedTask = req.body
    delete recievedTask._id;
    console.log(recievedTask);
    taskDb.insertTask(recievedTask).then( function(newTask){res.send(newTask)});
})

// Delete task
app.delete('/api/task', function (req, res) {
    console.log("Recieved " + req.method +  " at " + req.path);
    var recievedTask = req.body;
    taskDb.deleteTask(recievedTask._id).then( function(){res.send()});
})

// Default route
app.get('*', function(req, res) {
    console.log("Recieved unknown " + req.method +  " at " + req.path);
    res.status(404).send('You done messed up!');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});