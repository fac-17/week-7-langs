const dbConnection = require('./db_connection');

const postData = (user_name, user_hash, callback) => {
  dbConnection.query(`INSERT INTO users (user_name, user_hash) VALUES ($1, $2)`, [user_name, user_hash], (error, response) => {
    if(error) return callback(error)
    callback(null, response)
    })
}


module.exports = postData;
