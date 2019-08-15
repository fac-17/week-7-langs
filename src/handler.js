/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const bcrypt = require("bcryptjs");
const querystring = require("querystring");
const qs = require("qs");
const { getData, getUsernames, getHashes } = require("../database/getData");

const handleHome = (req, res) => {
  const filePath = path.join(__dirname, "..", "public/index.html");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1> 404: Page Not Found </h1>");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(file);
    }
  });
};

const handlePublic = (req, res) => {
  const filePath = path.join(__dirname, "..", req.url);
  const extension = path.extname(req.url);

  const extensionType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".ico": "image/x-icon"
  };

  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1> 404: Page Not Found </h1>");
    } else {
      res.writeHead(200, { "Content-Type": extensionType[extension] });
      res.end(file);
    }
  });
};

const handleRegister = (req, res) => {
  console.log("gets into register handler");
  let allData = "";
  req.on("data", chunk => {
    allData += chunk;
  });
  req.on("end", () => {
    console.log("gets into req.onend");
    console.log(qs.parse(allData));
    const { username, password } = qs.parse(allData);
    console.log(username, password);
    //getUsername and compare
    //check username is not taken already
    getUsernames((error, response) => {
      if (error) {
        res.writeHead(500, "Content-type: text/html");
        res.end("<h1>Sorry, unable to get usernames</h1>");
        console.log(error);
      } else {
        dbUsernames = [];
        response.forEach(user => {
          dbUsernames.push(user.user_name);
        });
        //if user exists, ask them to pick another username
        if (dbUsernames.includes(username)) {
          res.writeHead(500, "Content-type: text/html");
          res.end("<h1 style='font-size: 5vh; text-align: center;'>Sorry, this username is already taken!<br> Please, go back and pick a differen username.</h1>");
        }

        console.log("dbUsernames", dbUsernames.includes(username));
        // else {
        // // encrypt password
        // // postData - register user into database
        // if user registration has error with database, print 500 server error
        // else redirect to about page and welcome new user
      }
    });
  //   res.writeHead(302, { Location: "/" });
  //   res.end();
  });
};

module.exports = { handleHome, handlePublic, handleRegister };
