const express = require('express')
const app = express()
const path = require('path')
const hbs  = require('hbs')
const port = 3000

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (request, response) => {
  return response.render('index');
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
hbs.registerPartials(__dirname + '/views')
hbs.registerPartials(__dirname + '/views/layouts')
