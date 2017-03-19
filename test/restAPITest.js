var request = require("request");
var url = "http://localhost:8000";
var expect = require('chai').expect;

describe("REST API", function () {
    before(function (done) {
        let records = {
            "records": [
                "Smith | John | M | Red | 1/1/1950",
                "Zumba , Jane , F , Blue , 2/2/2000",
                "Harris David M Green 3/3/1970"
            ]
        };
        var options = {
            body: records,
            json: true,
        }
        request.post(`${url}/records`, options, function (error, response, body) {
            expect(response.statusCode).eq(200);
            done();
        });
    });

    after(function (done) {
        console.log('Done!');
        done();
    });

    describe("POST /", function () {
        it("creates records sucessfully", function (done) {
            let records = {
                "records": [
                    "Smith | John | M | Red | 1/1/1950",
                    "Zumba , Jane , F , Blue , 2/2/2000",
                    "Harris David M Green 3/3/1970"
                ]
            };
            var options = {
                body: records,
                json: true,
            }
            request.post(`${url}/records`, options, function (error, response, body) {
                expect(response.statusCode).eq(200);
                done();
            });
        });
    });
    describe("GET /", function () {
        it("returns status code 200", function (done) {
            request.get(`${url}`, function (error, response, body) {
                expect(response.statusCode).eq(200);
                done();
            });
        });
    });
    describe("GET /records", function () {
        it("returns status code 422", function (done) {
            request.get(`${url}/records`, function (error, response, body) {
                expect(response.statusCode).eq(422);
                done();
            });
        });
        it("return gender sorted sorted correctly", function (done) {
            request.get(`${url}/records/gender`, function (error, response, body) {
                expect(response.statusCode).eq(200);
                let result = JSON.parse(body).records.map((a) => a[0]);
                expect(result).eql(['Zumba', 'Smith', 'Harris']);
                done();
            });
        });
        it("return birth date sorted correctly", function (done) {
            request.get(`${url}/records/birthdate`, function (error, response, body) {
                expect(response.statusCode).eq(200);
                let result = JSON.parse(body).records.map((a) => a[0]);
                expect(result).eql(['Smith', 'Harris', 'Zumba']);
                done();
            });
        });
        it("return name sorted correctly", function (done) {
            request.get(`${url}/records/name`, function (error, response, body) {
                expect(response.statusCode).eq(200);
                let result = JSON.parse(body).records.map((a) => a[0]);
                expect(result).eql(['Harris', 'Smith', 'Zumba']);
                done();
            });
        });
        it("return records are missing", function (done) {
            var options = { body: {}, json: true, };
            request.post(`${url}/records`, options, function (error, response, body) {
                request.get(`${url}/records/name`, function (error, response, body) {
                    expect(response.statusCode).eq(422);
                    done();
                });
            });
        });
    });
});


