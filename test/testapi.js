const request = require('supertest');
const app = require('../app'); //reference to you app.js file

describe('GET /author', function () {
    it('respond with json containing a list of all authors', function (done) {
        request(app)
            .get('/author')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});