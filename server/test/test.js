import chai from 'chai';
import chaiHttp from 'chai-http';

const { expect } = chai;
const server = require('../server');

chai.use(chaiHttp);
describe('Api test suite', () => {
  describe('GET default endpoint api/v1', () => {
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

  describe('GET all red-flags', () => {
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

  describe('GET one red-flag', () => {
    it('should return one red-flag', (done) => {
      chai
        .request(server)
        .get('/api/v1/red-flags/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal(200);
          expect(res.body.data[0]).to.be.an('object');
          done();
        });
    });
  });

  describe('POST a red-flag', () => {
    it('should add a red-flag', (done) => {
      const redFlag = {
        type: 'Intervention',
        location: '223 456.1',
        Images: [],
        Videos: [],
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
  });

  describe('PATCH an incident comment', () => {
    it('should update an incident comment', (done) => {
      const newComment = {
        comment: 'egbeda bad roads',
      };
      chai
        .request(server)
        .patch('/api/v1/red-flags/2/comment')
        .send(newComment)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(202);
          expect(res.body.data[0].message).to.equal('Updated red-flag record\'s comment');
          done();
        });
    });

    it('should have edited the comment', (done) => {
      chai
        .request(server)
        .get('/api/v1/red-flags/2')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data[0].comment).to.equal('egbeda bad roads');
          done();
        });
    });
  });

  describe('PATCH an incident location', () => {
    it('should update an incident location', (done) => {
      const newLocation = {
        location: 'ketu',
      };
      chai
        .request(server)
        .patch('/api/v1/red-flags/2/location')
        .send(newLocation)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(202);
          expect(res.body.data[0].message).to.equal('Updated red-flag record\'s location');
          done();
        });
    });

    it('should have edited the location', (done) => {
      chai
        .request(server)
        .get('/api/v1/red-flags/2')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data[0].location).to.equal('ketu');
          done();
        });
    });
  });

  describe('DELETE a red-flag', () => {
    it('should delete a red flag', (done) => {
      chai
        .request(server)
        .delete('/api/v1/red-flags/2')
        .end((err, res) => {
          expect(res.status).to.equal(202);
          expect(res.body.data[0].message).to.equal('red flag record has been deleted');
          done();
        });
    });
  });
});
