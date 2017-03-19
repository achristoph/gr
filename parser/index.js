var moment = require('moment');
var fields = { 'LastName': 0, 'FirstName': 1, 'Gender': 2, 'FavoriteColor': 3, 'DateOfBirth': 4 };

/**
 * Extends Array prototype to have a method to sort by a certain field
 */
Array.prototype.sortBy = function (field, fields) {
    return this.sort(sortBy(field, fields));
}

/**
 * The function will convert the file content into array person
 * @param {string} lines - the content of the file in Array format to be parsed and sorted
 * @param {object} sortFields - fields used for sorting
 * @return arrayOfData - the array of tokens
 */
function processData(lines, ...sortFields) {
    let arrayOfData = [];
    lines.forEach((line) => {
        let data, mappedData = '';
        let commaAndBarDelimiterRegex = '[|,]';
        let lineOfData = this.splitLine(line, commaAndBarDelimiterRegex);
        arrayOfData.push(lineOfData);
    });
    let sortedArrayOfData = arrayOfData.sortBy(sortFields);
    return sortedArrayOfData;
}

/**
 * This function will split the line according the given delimiters
 * If no delimiter found in the string then it will be split by space
 * Each token will be trimmed on both ends
 * @param {string} line - the line of string to split
 * @param {string} delimiter - the delimiter characters in regex format
 * @return {string} data - the tokenized string
 */
function splitLine(line, delimiter) {
    if (line.match(delimiter)) { // either '|' or ',' delimited line
        data = line.split(new RegExp(delimiter, 'g')).map((word) => word.trim());
    }
    else { //space delimited line
        data = line.split(' ').map((word) => word.trim());
    }
    data[fields.DateOfBirth] = moment(data[fields.DateOfBirth], 'M/D/YYYY'); //to make date comparable
    return data;
}

/**
 * The function will sort an array by the given field(s)
 * @param {string|Object[]} field - the field name to sort can be either:
 * an array of [fieldName, order] - where order is ascending/descending indicator with value of 1 or -1,
 * a fieldName of type string with order defaulted to value 1 - ascending order
 */
function sortBy(fields) {
    return (a, b) => {
        let fs = fields.slice(); //make a copy of the fields

        while (fs.length > 0) {
            let reverse = 1;
            let f = fs.shift();
            if (Array.isArray(f)) {
                reverse = f[1];
                f = f[0];
            }
            const fA = a[f];
            const fB = b[f];
            if (fA < fB) return reverse * -1;
            if (fA > fB) return reverse * 1;
        }
        return 0;
    }
}

module.exports = { processData, fields, sortBy, splitLine }
