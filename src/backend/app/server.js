const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const crud = require('/controllers/index.js');

const app = express();

app.use(cors({
    origin: '*' // ubah dengan alamat frontend
}));

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});