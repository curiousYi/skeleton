const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {resolve} = require('path')
const package = require('APP')
const passport = require('passport')



if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (dev & testing only)
  app.use(require('volleyball'))
}  

app
  // We'll store the whole session in a cookie
  .use(require('cookie-session') ({
    name: 'session',
    keys: process.env.SESSION_SECRET || 'an insecure secret key',
  }))

  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

   // Authentication middleware
   .use(passport.initialize())
   .use(passport.session())

  // Serve static files from ../public
  .use(express.static(resolve(__dirname, '..', 'public')))

  // Serve api
  .use('/api', require('./api'))
  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

if (module === require.main) {
  // Start listening only if we're the main module.
  // 
  // https://nodejs.org/api/modules.html#modules_accessing_the_main_module
  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`--- Started HTTP Server for ${package.name} ---`)      
      console.log(`Listening on ${JSON.stringify(server.address())}`)
    }
  )
}

module.exports = app
