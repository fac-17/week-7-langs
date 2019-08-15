const dbConnection = require("./db_connection");

const getData = callback => {
  dbConnection.query(
    `SELECT user_name, user_hash FROM users;`,
    (error, response) => {
      if (error) return callback(error);
      callback(null, response.rows);
    }
  );
};

const getUsernames = callback => {
  dbConnection.query(`SELECT user_name FROM users;`, (error, response) => {
    if (error) return callback(error);
    callback(null, response.rows);
  });
};

const getHashes = callback => {
  dbConnection.query(`SELECT user_hash FROM users;`, (error, response) => {
    if (error) return callback(error);
    callback(null, response.rows);
  });
};

module.exports = { getData, getUsernames, getHashes };
