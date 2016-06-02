require('dotenv').load()

var path = require('path')
var express = require('express')
var app = express()

app.use(express.static(path.join(__dirname, 'public')))

var havenondemand = require('havenondemand')
var client = new havenondemand.HODClient(process.env.HOD_APIKEY)

var port = process.env.PORT || 5000

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

//
// '/processing' route
//

app.listen(port, function() {
  console.log('Listening on port: ' + port)
})
