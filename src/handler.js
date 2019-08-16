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
                  // give them a cookie here?
                  res.writeHead(302, "Content-type: text/html");
                  res.end(
                    "<h1 style='font-size: 5vh; text-align: center;'>Hurray! You are signed up!</h1>"
                  );
                  console.log("success");
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
            //const cookie = sign(userDetails, SECRET);
            res.writeHead(302, {
              Location: "/about" //,
              //"Set-Cookie": `jwt=${cookie}; HttpOnly`
            });
            return res.end();
          }
        });
        // Get all usernames from getUsernames
        // response.forEach(user => {
        //   dbUsernames.push(user.user_name);
        // });
        //compare our username (from Login) to each
        // if (dbUsernames.includes(username)) {
        //   console.log("Cool!");
        //   let index = dbUsernames.indexOf(username);
        //   console.log("Obj:", Object.entries(dbUsernames[index]));
        // check password
        // getHashes((err, res) => {
        //   if (err) {
        //     res.writeHead(500, "Content-type: text/html");
        //     res.end("<h1>Ooops! Something's gone wrong!</h1>");
        //   } else {
        //     let dbHashes = [];
        //     res.forEach(user => {
        //       dbHashes.push(user.user_hash);
        //     });
        //     console.log("Hashes: ", dbHashes);
        //     console.log("Password,", password);

        //     dbHashes.forEach(item => {
        //       comparePasswords(password, item, (error, boo) => {
        //         if (error) {
        //           res.writeHead(500, "Content-type: text/html");
        //           res.end("<h1>Sorry, password wasn't retrieved</h1>");
        //         } else {
        //           console.log("Boo:", boo);
        //         }
        //       });
        //     });
        //   }
        // });
        // } else {
        //   res.writeHead(500, "Content-type: text/html");
        //   res.end("<h1>Sorry, your username does not exist</h1>");
        // }

        // if password match -> login
      }
    });
  });
};

const handleAbout = (req, res) => {
  const filePath = path.join(__dirname, "..", "public/about.html");
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

module.exports = {
  handleHome,
  handlePublic,
  handleRegister,
  handleLogin,
  handleAbout
};
