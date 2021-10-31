const express = require('express')
const path = require('path')
const restPoint = require('./restRoute.js')
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/rest', restPoint)
  .get('/', (req, res) => res.render('public/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
