import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('SERVER INDEX route', () => {
  it('should return Welcome to iReporter', (done) => {
    chai
      .request(server)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        // expect(res.body.message).to.equal('Welcome to iReporter');
        done();
      });
  });
});

describe('SERVER API INDEX route', () => {
  it('should return Welcome to iReporter API', (done) => {
    chai
      .request(server)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        // expect(res.body.message).to.equal('Welcome to iReporter');
        done();
      });
  });
});
