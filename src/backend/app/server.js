const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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

app.listen(36656, () => {
    console.log(`Server is runninglah yah.`);
});