const fs = require('fs');
const path = require('path');
const url = require('url');
const { handleHome, handlePublic, handleLogin } = require('./handler.js');

const router = (req, res) => {
  if (req.url === '/') {
    handleHome(req, res);
  } else if (req.url.startsWith('/public')) {
    handlePublic(req, res);
  } else if(req.url.startsWith("/login")) {
    handleLogin(req, res);
  }
};

module.exports = router;
