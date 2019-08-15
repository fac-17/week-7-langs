const dbConnection = require('./db_connection');

const postData = (user_name, user_hash, callback) => {
  dbConnection.query(``, (error, response) => {
    if(error) return callback(error)
    callback(null, response)
    })
}


module.exports = postData;
