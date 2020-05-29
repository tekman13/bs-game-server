const express = require('express');
const http = require('http');
const socket = require('socket.io');
const { newTable, joinTable } = require('./src/routes.js');

const app = express();
const httpServer = http.createServer(app);
const io = socket(http);
const gameServer = new (require('./src/server.js'))();

app.get('/new', (req, res) => {
    gameServer.getTable()
    .then((table) => {
        res.send(table);
    });
});
app.get('/join/:id', joinTable);

app.use((req, res) => {
    res.status(404).send('Invalid Request');
});


app.listen(3000, () => console.log('Listning'));
