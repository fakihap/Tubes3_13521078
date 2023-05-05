const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const env = require('dotenv').config();

const routes = require('./routes/index.js');

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

routes(app);

const port = process.env.PORT || 36656;

app.listen(port, () => {
    console.log(`Server is runninglah yah.`);
});