process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');

beforeEach((done) => {
  knex.migrate.latest({database: 'language_app_test'})
  .then(() => {
    return knex.seed.run();
  })
  .then(() => {
      knex('users').then((users) => {
        allUsers = users;
        done();
      });
  });
});

afterEach((done) => {
  knex.migrate.rollback()
  .then(() => {
    done();
  });
});

describe('GET /', () => {
  it('gets the home page', done => {
    request(app)
    .get('/')
    .expect('Content-Type', 'text/html')
    .end((err, res) => {
      expect(res.status).to.equal(200)
      done();
    })
  })
})

describe('GET /users', () => {
  it('gets the users index page', done => {
    request(app)
    .get('/users')
    .expect('Content-Type', 'text/html')
    .end((err, res) => {
      expect(res.status).to.equal(200)
      done();
    })
  })
  it('retrieves all the users for index page', done => {
    request(app)
    .get('/users')
    .expect('Content-Type', 'text/html')
    .end((err, res) => {
      expect(res.body.length).to.equal(allUsers.length)
      done();
    })
  })
})

