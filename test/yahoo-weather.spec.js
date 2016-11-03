var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var yahooHelpers = require('./yahoo-helpers.js');

chai.use(chaiHttp);

var apiBase = 'https://query.yahooapis.com';

describe('Yahoo Weather API', function() {

    it("returns a result for Santa Monica, CA", function() {
        return chai.request(apiBase)
            .get(yahooHelpers.getUrlForLocation('Santa Monica, CA'))
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('query');
                expect(res.body.query).to.have.property('results');
                expect(res.body.query.results).to.be.instanceof(Object);
        });
    });

    it("returns null results for invalid location", function() {
        return chai.request(apiBase)
            .get(yahooHelpers.getUrlForLocation('AAAAAAAAAAAAAAAA'))
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('query');
                expect(res.body.query).to.have.property('results');
                expect(res.body.query.results).to.be.null;
            });
    });

});