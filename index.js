const express    = require('express')
const app        = express()
const path       = require('path')
const hbs        = require('hbs')
// const markdown   = require('helper-markdown')
const port      = 3000

var components = require('./docs/components')

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (request, response) => {
  return response.render('index', components = {components});
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

app.get('/', (request, response) => {
  throw new Error('oops')
})

app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err)
  response.status(500).send('Something broke!')
})

app.use('/assets', express.static(path.join(__dirname, 'assets')))

// Helpers
// hbs.registerHelper('markdown', markdown());
hbs.registerHelper('toJSON', (context) => {
  "use strict";
  return JSON.stringify(context);
});


// Partials
hbs.registerPartials(__dirname + '/views')
hbs.registerPartials(__dirname + '/views/layouts')
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerPartials(__dirname + '/views/sections')
