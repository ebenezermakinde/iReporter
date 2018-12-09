import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('GET all interventions', () => {
  it('should return all interventions', (done) => {
    chai
      .request(server)
      .get('/api/v1/interventions')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        // expect(res.body.status).to.equal(200);
        done();
      });
  });
});
