const fs = require("fs");
const path = require("path");
const url = require("url");
const { handleHome } = require("handler.js");

const router = (req, res) => {
  const endpoint = req.url;

  if (endpoint === "/") {
    handleHome(req, res);
  }
  if (endpoint.startsWith("/public")) {
  }
};
