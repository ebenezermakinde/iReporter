const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
const server = require('../server');

chai.use(chaiHttp);
describe('Api test suite', () => {

  describe('Test server.js', () => {
    it('should return Hello World!', (done) => {
      chai
        .request(server)
        .get('/api/v1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('welcome to the API');
          done();
        });
    });
  });

  describe('/ GET all red-flags', () => {
    it('should return all red-flags', (done) => {
      chai
        .request(server)
        .get('/api/v1/red-flags')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal(200);
          done();
        });
    });
  });
});
