/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const bcrypt = require("bcryptjs");
const querystring = require("querystring");
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
  //Receive info
  let allData = "";

  req.on("data", chunk => {
    allData += chunk;
  });
  req.on("end", () => {
    const parsedData = JSON.parse(allData);
    console.log("JSON DATA: ", parsedData);
    console.log("Query string", querystring.parse(allData));

    const username = parsedData.user;
    const password = parsedData.password;

    //check username is not taken already
    getUsernames((error, response) => {
      if(error) {
        res.writeHead(500, "Content-type: text/html");
        res.end("<h1>Sorry, unable to get usernames</h1>");
        console.log(error);
      } else {
        //go through array
        if(username === user_name){
          //send message Username already taken ERR
        } else {
          // encrypt password and resgiter user, send success message
        let users = JSON.stringify(response);
        console.log("DB users ", users);
        res.writeHead(200, {"content-type": "application/json"});
        res.end(users);
        }
      }
    });

    //return success

    //return message this username is already taken

    // Only if registration is successful

    res.writeHead(302, { Location: "/about" });
    res.end();
  });

  // Create JWT

  //jwt.sign({ user:  /*USERNAME*/ }, process.env.SECRET);

  // encrypt pass
};

module.exports = { handleHome, handlePublic, handleRegister };
