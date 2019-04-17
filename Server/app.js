const express = require('express')
const app = express()

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



app.get('/', function(req, res) {
    console.log("Recieved " + req.method +  " at " + req.path);
    res.status(200).send('You found me!');
})

app.get('/api/tasks', function (req, res) {
    console.log("Recieved " + req.method +  " at " + req.path);
    res.send(MOCKTASKS);
})

app.post('/api/tasks', function (req, res) {
    console.log("Recieved " + req.method +  " at " + req.path)
    res.send('Got a POST request')
})

app.put('/api/tasks', function (req, res) {
    console.log("Recieved " + req.method +  " at " + req.path)
    res.send('Got a PUT request')
})

app.delete('/api/tasks', function (req, res) {
    console.log("Recieved " + req.method +  " at " + req.path)
    res.send('Got a DELETE request')
})

app.get('*', function(req, res) {
    console.log("Recieved " + req.method +  " at " + req.path)
    res.status(404).send('You done messed up!');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});