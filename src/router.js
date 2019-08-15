const fs = require("fs");
const path = require("path");
const url = require("url");
const {
  handleHome,
  handlePublic,
  handleRegister,
  handleLogin
} = require("./handler.js");

const router = (req, res) => {
  if (req.url === "/") {
    handleHome(req, res);
  } else if (req.url.startsWith("/public")) {
    handlePublic(req, res);
  } else if (req.url.startsWith("/register")) {
    console.log("i'm in router register");
    handleRegister(req, res);
  } else if (req.url.startsWith("/login")) {
    console.log("We are in login");
    handleLogin(req, res);
  } else {
    const notFound =
      '<p style="font-size: 10vh; text-align: center;">404, Sorry, this page doesn\'t exist!</p>';
    res.writeHead(404, {
      "Content-type": "text/html",
      "Content-length": notFound.length
    });
    res.end(notFound);
  }
};

module.exports = router;
