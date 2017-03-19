const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const parser = require('./parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
const port = process.env.PORT || 8000;
const router = express.Router();
let records;

router.route('/records/:sortField?')
    .get(function (req, res) {
        let sortField = req.params.sortField;
        let sortedRecords;
        if (!records) return res.status(422).json({ error: 'Records are missing' })
        switch (sortField) {
            case 'gender':
                sortedRecords = parser.processData(records, parser.fields.Gender);
                break;
            case 'birthdate':
                sortedRecords = parser.processData(records, parser.fields.DateOfBirth);
                break;
            case 'name':
                sortedRecords = parser.processData(records, parser.fields.LastName);
                break;
            default:
                return res.status(422).json({ error: 'Incorrect parameter value' })
        }
        res.json({ records: sortedRecords });
    })
    .post(function (req, res) {
        records = req.body.records;
        res.json(records)
    });

router.get('/', function (req, res) {
    let msg = `
    <pre>
    ==API==
    POST /records - Post a single data line in any of the 3 formats supported by your existing code
    GET /records/gender - returns records sorted by gender
    GET /records/birthdate - returns records sorted by birthdate
    GET /records/name - returns records sorted by name
    </pre>
    `
    res.send(msg);
});

app.use('/', router);

var server = app.listen(port, function () {
    console.log('Server running on port ' + port);
});
