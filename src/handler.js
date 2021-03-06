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
const postData = require("../database/postData");
const { comparePasswords, hashPassword } = require("./authHelper");
const { getCookie, authCheck, deleteCookieLogout } = require("./loggedIn");
const { parse } = require("cookie");
const { sign, verify } = require("jsonwebtoken");

const SECRET = process.env.SECRET;

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
  let allData = "";
  req.on("data", chunk => {
    allData += chunk;
  });
  req.on("end", () => {
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
        let dbUsernames = [];
        response.forEach(user => {
          dbUsernames.push(user.user_name);
        });
        //if user exists, ask them to pick another username
        if (dbUsernames.includes(username)) {
          res.writeHead(500, "Content-type: text/html");
          res.end(
            "<h1 style='font-size: 5vh; text-align: center;'>Sorry, this username is already taken!<br> Please, go back and pick a different username.</h1>"
          );
        } else {
          hashPassword(password, (err, hashResponse) => {
            if (err) {
              return err;
            } else {
              console.log(hashResponse);
              postData(username, hashResponse, (err, dbResponse) => {
                if (err) {
                  res.writeHead(500, "Content-type: text/html");
                  res.end(
                    "<h1 style='font-size: 5vh; text-align: center;'>Ooops! Something's gone wrong! :'(</h1>"
                  );
                } else {
                  const cookie = sign({ username }, SECRET);
                  res.writeHead(302, {
                    Location: "/about",
                    "Set-Cookie": `loggedIn=${cookie}; HttpOnly`
                  });
                  return res.end();
                }
              });
              return hashResponse;
            }
          });
        }

        // console.log("dbUsernames", dbUsernames.includes(username));
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

const handleLogin = (req, res) => {
  let allData = "";
  req.on("data", chunk => {
    allData += chunk;
  });
  req.on("end", () => {
    const { username, password } = qs.parse(allData);
    getData(username, (error, response) => {
      if (error) {
        res.writeHead(500, "Content-type: text/html");
        res.end("<h1>Ooops! Something's gone wrong!</h1>");
      } else {
        let hash = response[0].user_hash;
        comparePasswords(password, hash, (compErr, compRes) => {
          if (compErr) {
            res.writeHead(500, "Content-type: text/html");
            res.end("<h1>Ooops! Something's gone wrong!</h1>");
          } else {
            const cookie = sign({ username }, SECRET);
            res.writeHead(302, {
              Location: "/about",
              "Set-Cookie": `loggedIn=${cookie}; HttpOnly`
            });
            return res.end();
          }
        });
      }
    });
  });
};

const handleAbout = (req, res) => {
  const filePath = path.join(__dirname, "..", "public/about.html");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.writeHead(403, { "Content-Type": "text/html" });
      res.end("<h1> 403: Forbidden, please register or login </h1>");
    } else {
      // Check cookie not tampered with
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(file);
    }
  });
};

module.exports = {
  handleHome,
  handlePublic,
  handleRegister,
  handleLogin,
  handleAbout
};
