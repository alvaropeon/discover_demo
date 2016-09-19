require('dotenv').load()

var path = require('path')
var express = require('express')
var app = express()

app.use(express.static(path.join(__dirname, 'public')))

var havenondemand = require('havenondemand')

var HOD_API_KEY = "key"

try {
  var vcap_services = JSON.parse(process.env.VCAP_SERVICES)
  HOD_API_KEY =  vcap_services['hod-demo'][0].credentials.HOD_API_KEY

  console.log('Key: ' + HOD_API_KEY)
} catch (e) {
  console.log('Error: HOD Service not found')
  console.log(e)
} finally {

}

var client = new havenondemand.HODClient(HOD_API_KEY)

//var client = new havenondemand.HODClient("be3cc18c-fc74-4e03-a730-35aca378cb8a")
//var client = new havenondemand.HODClient(process.env.HOD_APIKEY)

var port = process.env.PORT || 5000

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/process', function(req, res) {
  var url = req.query.url
  var data = {url: url}
  client.call('extractconcepts', data, function(err1, resp1, body1) {
    if (err1) {
      console.log(err1)
      res.sendStatus(500)
    } else {
      console.log('Extracted concepts')
      var conceptsPayload = resp1.body
      client.call('analyzesentiment', data, function(err2, resp2, body2) {
        if (err2) {
          console.log(err2)
          res.sendStatus(500)
        } else {
          console.log('Extracted sentiments')
          var sentimentsPayload = resp2.body
          res.status(200).json({concepts: conceptsPayload, sentiments: sentimentsPayload})
        }
      })
    }
  })
})

app.listen(port, function() {
  console.log('Listening on port: ' + port)
})
