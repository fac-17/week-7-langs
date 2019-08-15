const dbConnection = require('./db_connection')

const getData = callback => {
  dbConnection.query( , (error, response) => {
  if(error) return callback(error)
  callback(null, response.rows)
  })
}


module.exports = getData
