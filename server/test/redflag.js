import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('GET all red-flags WITHOUT TABLE', () => {
  it('should return an error', (done) => {
    chai
      .request(server)
      .get('/api/v1/red-flags')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Access restricted');
        done();
      });
  });
});

describe('GET one red-flags WITHOUT TABLE', () => {
  it('should return error for one red-flags', (done) => {
    chai
      .request(server)
      .get('/api/v1/red-flags/2')
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

describe('POST red-flags WITHOUT TABLE', () => {
  it('should return error for creating red-flag', (done) => {
    const values = { type: 'red-flag', location: 'ketu', comment: 'we will not stay silent' };
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .send(values)
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

describe('DELETE red-flags WITHOUT TABLE', () => {
  it('should return error for deleting red-flag', (done) => {
    chai
      .request(server)
      .delete('/api/v1/red-flags/1')
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

describe('PATCH red-flags WITHOUT TABLE', () => {
  it('should return error for patching red-flag', (done) => {
    chai
      .request(server)
      .patch('/api/v1/red-flags/1/comment')
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

describe('PATCH red-flags WITHOUT TABLE', () => {
  it('should return error for patching red-flag location', (done) => {
    chai
      .request(server)
      .patch('/api/v1/red-flags/1/location')
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
