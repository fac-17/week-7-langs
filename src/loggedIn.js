const cookie = require('cookie')
const jwt = require('jsonwebtoken')

 module.exports = (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  console.log('im cookies: ', cookies)
  const ourCookie = cookies.token
  console.log('im ourcookie: ', ourCookie)

  if(ourCookie){
    try {
      const verifedCookie = jwt.verify(ourCookie, process.env.SECRET)
      if(verifedCookie.username) return verifedCookie
    } catch (e) {
        console.log('Cookie is not here')
        res.writeHead(301, {Location: '/', 'Set-Cookie': 'token=false; Max-Age=0'})
        res.end()
        return e
    }
  } else return false
}
