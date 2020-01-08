const app = require('../app');
const chai = require('chai');
const request = require('supertest');

describe('Login', () => {
  it('responds with json', done => {
    request(app)
      .post('user/login')
      .send({ email: 'admin_tony@gmail.com', password: '123456789' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(201);
        res.status.should.equal('success');
        done();
      });
  });
});
