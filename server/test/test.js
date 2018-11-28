const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const server = require('../../server');

chai.use(chaiHttp);

describe('Test server.js', () => {
  it('should return Hello World!', (done) => {
    chai
      .request(server)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        done();
      });
  });
});
