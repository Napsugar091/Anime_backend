const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(cors());

app.get('/json', (req, res) => {
    fs.readFile("./mufajok.json", (err, data) => {
        res.send(JSON.parse(data));
    })
})

app.get('/json/:name', (req, res) => {
    const name = req.params.name;
    fs.readFile("./mufajok.json", (err, data) => {
        const mufajok = JSON.parse(data);
        const mufajbyName = mufajok.find(mufaj => mufaj.name === name);
        if (!mufajbyName) {
            res.status(404).send({ error: `name: ${name} not found` });
            return;
        }
        res.send(mufajbyName);
    })
})

app.listen(9000);