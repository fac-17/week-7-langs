"use strict";

const { parse } = require("cookie");
const { sign, verify } = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const send401 = () => {
  const message = "fail!";
  res.writeHead(401, {
    "Content-Type": "text/plain",
    "Content-Length": message.length
  });
  return res.end(message);
};

const getCookie = (userDetails, SECRET) => {
  const cookie = sign(userDetails, SECRET);
  res.writeHead(302, {
    Location: "/about",
    "Set-Cookie": `loddedIn=${cookie}; HttpOnly`
  });
  return res.end();
};

const deleteCookieLogout = () => {
  res.writeHead(302, {
    Location: "/",
    "Set-Cookie": "loggedIn=0; Max-Age=0"
  });
  return res.end();
};

const authCheck = () => {
  if (!req.headers.cookie) return send401();

  const { loggedIn } = parse(req.headers.cookie);

  if (!loggedIn) return send401();

  return verify(loggedIn, SECRET, (err, loggedIn) => {
    if (err) {
      return send401();
    } else {
      const message = `Your user id is: ${loggedIn.userId}`;
      res.writeHead(200, {
        "Content-Type": "text/plain",
        "Content-Length": message.length
      });
      return res.end(message);
    }
  });
};

module.exports = { getCookie, authCheck, deleteCookieLogout };
