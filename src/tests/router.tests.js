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
      t.equal(res.headers['content-type'], 'text/html', 'home route returns correct content type');
      t.end();
    });
});

tape('public route returns files with content type and status code', (t) => {
  supertest(router)
    .get('/public/style.css')
    .end((err, res) => {
      t.error(err, 'style.css route does not throw error');
      t.equal(res.statusCode, 200, 'style.css should return 200 status code');
      t.equal(res.headers['content-type'], 'text/css', 'style.css route returns correct content type');
    });

  supertest(router)
    .get('/public/dom.js')
    .end((err, res) => {
      t.error(err, 'dom.js route does not throw error');
      t.equal(res.statusCode, 200, 'dom.js should return 200 status code');
      t.equal(res.headers['content-type'], 'application/javascript', 'dom.js route returns correct content type');
      t.end();
    });
});

tape("Login route responds with 302 and redirects to about on successfult log-in", t=> {
  supertest(router)
  .get('/login')
  .end((err, res) => {
    t.error(err, 'login route redirects to about on successful log in');
    t.equal(res.statusCode, 302, "status code should be 302");
    t.equal(res.headers["content-type"], "about/html", "about.html");
    t.end();
  })
})
