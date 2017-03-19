var expect = require('chai').expect;
var parser = require('../parser');
var moment = require('moment');
var sinon = require('sinon');
var fields = { 'LastName': 0, 'FirstName': 1, 'Gender': 2, 'FavoriteColor': 3, 'DateOfBirth': 4 };

describe("Parser", function () {

    it("split a line correctly with all delimiters", function () {
        let rgx = '[|,]';
        let parsed = parser.splitLine('Smith | John | M | Red | 1/1/1950', rgx);
        expect(parsed.toString()).eq(['Smith', 'John', 'M', 'Red', moment("1/1/1950", 'M/D/YYYY')].toString());
        parsed = parser.splitLine('Smith ,John,M, Red, 1/1/1950', rgx);
        expect(parsed.toString()).eq(['Smith', 'John', 'M', 'Red', moment("1/1/1950", 'M/D/YYYY')].toString());
        parsed = parser.splitLine('Smith John M Red 1/1/1950', rgx);
        expect(parsed.toString()).eq(['Smith', 'John', 'M', 'Red', moment("1/1/1950", 'M/D/YYYY')].toString());
    });

    it("process data", function () {
        var fields = { 'LastName': 0, 'FirstName': 1, 'Gender': 2, 'FavoriteColor': 3, 'DateOfBirth': 4 };
        let splitLine = sinon.spy(parser, 'splitLine');
        let result = parser.processData(['Smith | John | M | Red | 1/1/1950', 'Zumba , Jane , F , Blue , 2/2/2000'], fields.Gender);
        expect(splitLine.called).eq(true);
        expect(result[0][0]).eq('Zumba');
    });

    it("sort by ascending correctly", function () {
        let sortBy = parser.sortBy([fields.Gender]);
        let result = sortBy('Zumba', 'Smith');
        expect(result).eq(1);
        result = sortBy('Smith', 'Zumba');
        expect(result).eq(-1);
        result = sortBy('Smith', 'Smith');
        expect(result).eq(0);
    });

    it("sort by descending correctly", function () {
        let sortBy = parser.sortBy([[fields.Gender, -1]]);
        let result = sortBy('Zumba', 'Smith');
        expect(result).eq(-1);
        result = sortBy('Smith', 'Zumba');
        expect(result).eq(1);
        result = sortBy('Smith', 'Smith');
        expect(result).eq(0);
    });
});
