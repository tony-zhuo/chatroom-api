const app = require('../app');
const chai = require('chai');
const request = require('supertest');

let APItoken;

describe('user/login', () => {
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
        APItoken = res.token;
        done();
      });
  });
});

describe('user/all', () => {
  it('responds with json', done => {
    request(app)
      .post('user/all')
      .set('Authorization', `Bearer ${APItoken}`)
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

describe('user/me', () => {
  it('responds with json', done => {
    request(app)
      .post('user/me')
      .set('Authorization', `Bearer ${APItoken}`)
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

describe('msg/all', () => {
  it('responds with json', done => {
    request(app)
      .post('msg/all')
      .set('Authorization', `Bearer ${APItoken}`)
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

describe('msg/send', () => {
  it('responds with json', done => {
    request(app)
      .post('msg/all')
      .set('Authorization', `Bearer ${APItoken}`)
      .send({ text: 'unit test' })
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
