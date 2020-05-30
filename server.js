/* configure require js */
const requirejs = require('requirejs');

const http = require('http');
const express = require('express');
var cors = require('cors');

//items router
const sampleRouter = require('./web/routes/sampleRoute');

//create a new app
const app = express();
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());


//install the routes here
app.use('/sample', sampleRouter);

// default URL to API
app.use('/', function(req, res) {
    res.send('Home Page works :-)');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);