const express = require('express')
const app = express()
const http = require('http');
const cors = require('cors')
const {setupSocket} = require('./socket')


app.use(cors());

const server = http.createServer(app);
setupSocket(server);

app.get('/', (req, res) => {
    res.send('Hello World')
})

server.listen(4100, () => 'Server is running on port 4100')