const bodyParser = require('body-parser'),
      cors = require('cors'),
      express = require('express'),
      mongoClient = require('mongodb').MongoClient,
      url = process.env.MONGODB_URI || 'mongodb://localhost:27017/usa-spending',
      path = require('path')
      port = process.env.PORT || 3000,
      serveStatic = require('serve-static')

const app = express()
app.use(serveStatic(__dirname + "/../dist"))
app.use(cors({
  origin:[
    '*'
  ],
  methods:['GET'],
  credentials: true
}))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err
  // const db = client.db('usa-spending')
  const db = client.db('heroku_53chkz70')
  require('./routes.js')(app, db)
  app.listen(port, () => {
    console.log(`The API is accessible on port ${port}`)
  })
})
