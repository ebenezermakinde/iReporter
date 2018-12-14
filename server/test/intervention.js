import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;

chai.use(chaiHttp);

// without tables TESTS
describe('GET all interventions WITHOUT TABLE', () => {
  it('should return an error', (done) => {
    chai
      .request(server)
      .get('/api/v1/interventions')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Access restricted');
        done();
      });
  });
});

describe('GET one intervention WITHOUT TABLE', () => {
  it('should return error for one intervention', (done) => {
    chai
      .request(server)
      .get('/api/v1/interventions/2')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Access restricted');
        done();
      });
  });
});

describe('POST interventions WITHOUT TABLE', () => {
  it('should return error for creating interventions', (done) => {
    const values = { type: 'intervention', location: 'gbagada', comment: 'we will not stay silent' };
    chai
      .request(server)
      .post('/api/v1/interventions')
      .send(values)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});

describe('DELETE interventions WITHOUT TABLE', () => {
  it('should return error for deleting interventions', (done) => {
    chai
      .request(server)
      .delete('/api/v1/interventions/1')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});

describe('PATCH comment interventions WITHOUT TABLE', () => {
  it('should return error for patching interventions comment', (done) => {
    chai
      .request(server)
      .patch('/api/v1/interventions/1/comment')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});

describe('PATCH locatiom interventions WITHOUT TABLE', () => {
  it('should return error for patching interventions comment', (done) => {
    chai
      .request(server)
      .patch('/api/v1/interventions/1/location')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});
