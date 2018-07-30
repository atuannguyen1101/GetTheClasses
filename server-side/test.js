const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.listen(8000, () => {
    console.log('Server started!');
});

app.route('/api/cats').get((req, res) => {
    console.log(123);
    console.log(req);
    res.send({
        cats: [{ name: "lilly" }, { name: 'lucy' }]
    });
});

app.route('/api/majors/:major/:cn').get((req, res) => {
    const major = req.params['major'];
    const courseNumber = req.params['cn'];
    res.send([major, courseNumber]);
});