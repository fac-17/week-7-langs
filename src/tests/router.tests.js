const tape = require('tape');

const supertest = require('supertest');
const router = require('../router');


tape('running tape', (t) => {
  t.equal(1, 1, 'tests are running. wahoo');
  t.end();
});
