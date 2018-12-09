import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('GET all red-flags', () => {
  describe('GET all red-flags ERROR', () => {
    after('Add incident to database', (done) => {
      const redFlag = {
        type: 'red-flag',
        location: '223 456.1',
        comment: 'Ekiti main-bypass horrible',
      };
      chai
        .request(server)
        .post('/api/v1/red-flags')
        .send(redFlag)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should return an error red-flags', (done) => {
      chai
        .request(server)
        .get('/api/v1/red-flags')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(404);
          // expect(res.body.status).to.equal(200);
          done();
        });
    });
  });

  describe('GET all red-flags SUCCESS', () => {
    it('should return an all red-flags', (done) => {
      chai
        .request(server)
        .get('/api/v1/red-flags')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          // expect(res.body.status).to.equal(200);
          done();
        });
    });
  });
});


describe('GET one red-flags', () => {
  after('Add incident to database', (done) => {
    const redFlag = {
      type: 'red-flag',
      location: '223 456.1',
      comment: 'Ekiti main-bypass horrible',
    };
    chai
      .request(server)
      .post('/api/v1/red-flags')
      .send(redFlag)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should return error for one red-flags', (done) => {
    chai
      .request(server)
      .get('/api/v1/red-flags/1')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(500);
        // expect(res.body.status).to.equal(200);
        done();
      });
  });

  it('should return one red-flags', (done) => {
    chai
      .request(server)
      .get('/api/v1/red-flags/32')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        // expect(res.body.status).to.equal(200);
        done();
      });
  });
});
