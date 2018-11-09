const express = require('express');
const app = express();
var axios = require('axios');
var ROOT_URL = 'https://api.bitfinex.com/v1/';
var cors = require('cors')

app.use(cors());

app.get('/api/:one/:two', (req, res) => {
    axios.get(`${ROOT_URL}/${req.params.one}/${req.params.two}`).then((data) => {
        res.json(data.data);
    })
});

app.get('/api/:one/', (req, res) => {
    axios.get(`${ROOT_URL}/${req.params.one}`).then((data) => {
        res.json(data.data);
    })
});

app.listen(8080, () => console.log(`Proxy app served on port ${8080}`))