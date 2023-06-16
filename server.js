require("dotenv").config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const api = require('./api/api.router');

const limit = "50mb";
app.use(bodyParser.json({ limit: limit, extended: true }));
app.use(bodyParser.urlencoded({ limit: limit, extended: true }));
app.use(cors());

app.use("/api", api);

app.get('/', async (req, res) => {
    return res.json( {
        status: 200,
        message: `Server is running`
    });
});

app.all('*', (req, res, next) => {
    return res.json( {
        status: 404,
        message: `Requested path ${req.path} not found`
    });
})

const server = app.listen(process.env.PORT || 3008, () => {
    console.log("Server is started on port",process.env.PORT);
});

server.timeout = 1200000;
server.setTimeout(1200000);