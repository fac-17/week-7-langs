const fs = require('fs');
const path = require('path');
const url = require('url');
const { handleHome, handlePublic } = require('./handler.js');

const router = (req, res) => {
  if (req.url === '/') {
    handleHome(req, res);
  }
  if (req.url.startsWith('/public')) {
    handlePublic(req, res);
  }
};

module.exports = router;
