const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {resolve} = require('path')
// symlink from node_modules/APP to the root of the app.
// We can require paths relative to the app root by
// saying require('APP/whatever').
//
// This next line requires our root index.js:
const package = require('APP')


if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (dev & testing only)
  app.use(require('volleyball'))
}  

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

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
