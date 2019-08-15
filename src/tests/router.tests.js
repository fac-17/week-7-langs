const tape = require('tape');
const supertest = require('supertest');

const router = require('../router');


tape('running tape', (t) => {
  t.equal(1, 1, 'tests are running. wahoo');
  t.end();
});

tape('home route should return 200 and index html', (t) => {
  supertest(router)
    .get('/')
    .end((err, res) => {
      t.error(err, 'home route does not throw error');
      t.equal(res.statusCode, 200, 'Home should return 200 status code');
      t.equal(res.headers['content-type'], 'text/html', 'stuffff');
      t.end();
    });
});
