const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const main = require('./Scripts/getClasses')

app.use(bodyParser.json());
app.use(cors());

app.listen(8000, () => {
    console.log('Listening to 8000');
});

app.route('/api/course').post((req, res) => {
    main(req.body).then((data) => {
        if (data.length) {
            res.send({
                success: true,
                result: data
            });
        }
        else {
            res.send({
                success: false,
                result: "No match schedule."
            })
        }
    });
});