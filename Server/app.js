const express = require('express')
const app = express()

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', function(req, res) {
    console.log("Recieved " + req.method +  " at " + req.path)
    res.status(200).send('You found me!')
})

// app.get('/app', (req, res) => res.send )

app.get('/api/tasks', function (req, res) {
    console.log("Recieved " + req.method +  " at " + req.path)
    res.send({
        some: 'json'
    })
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


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});