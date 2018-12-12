import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('GET all red-flags', () => {
  it('should return an error', (done) => {
    chai
      .request(server)
      .get('/api/v1/interventions')
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('No intervention(s) record found');
        done();
      });
  });
});

describe('GET one intervention', () => {
  it('should return error for one intervention', (done) => {
    chai
      .request(server)
      .get('/api/v1/interventions/2')
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(res.body);
        expect(err).to.equal(null);
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('No 2,intervention(s) record found');
        done();
      });
  });
});
