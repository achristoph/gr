var fs = require('fs');
var parser = require('./parser');
const moment = require('moment');

/**
 * The function to read a file
 * @param {FileSystem} fs - Node FileSystem object to read the given file
 * @param {string} filename - the filename to read
 */
function readAFile(filename) {
    // const fields = { 'LastName': 0, 'FirstName': 1, 'Gender': 2, 'FavoriteColor': 3, 'DateOfBirth': 4 }

    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) throw err;
        let lines = data.split('\n');
        let data1 = parser.processData(lines, [parser.fields.Gender, -1], parser.fields.LastName);
        let data2 = parser.processData(lines, parser.fields.DateOfBirth);
        let data3 = parser.processData(lines, [parser.fields.LastName, -1]);
        console.log(data1);
        console.log(data2);
        console.log(data3);
    });
}

readAFile('data');
