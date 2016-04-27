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

// GET Home
describe('GET /', () => {
  it('gets the home page', done => {
    request(app)
    .get('/')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      expect(res.status).to.equal(200)
      done();
    })
  })
})

// GET All Users
describe('GET /users', () => {
  it('gets the users index page', done => {
    request(app)
    .get('/users')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      expect(res.status).to.equal(200)
      done();
    })
  })
  it('retrieves all the users for index page', done => {
    request(app)
    .get('/users')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      // console.log('RESBODY', res)
      // console.log('ERRORRRRRRRR', err)
      expect(res.text).to.contain('Thomas')
      expect(res.text).to.contain('Dumbledore')
      expect(res.text).to.contain('Homer')
      done();
    })
  })
})

//***************************************************************************
//TESTING IS LIMITED BECAUSE SIMULATING A USER LOGGED IN VIA
// GOOGLE oAuth IS GOING TO TAKE MORE TIME THAN WE WANT
// 
// MATT SAID TO MOVE ON AND PRIORITIZE OTHER FEATURES
// GIVEN TIME CONSTRAINTS OF THIS PROJECT
//***************************************************************************

// ***THIS TEST FAILS B/C TEST USERS CANNOT LOG IN
// GET a Specific User
describe('GET users/1', () => {
  it('gets the user\'s show page', (done) => {
    request(app)
    .get('/users/1')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end((err, res) => {
      expect(res.text).to.contain('Current User: Thomas')
      done();
    })
  })
})
  // Is the user logged in
  // Does the user's page load
  // Is the user's information displayed
  // If current user is different, are they redirected to the /users page

// GET User Edit Page

// INSERT a User (using Google oAuth) -- CAN THIS BE TESTED??

// PUT Update a User

// DEL a User

// INSERT a New Thread

// GET a Specific Thread 

