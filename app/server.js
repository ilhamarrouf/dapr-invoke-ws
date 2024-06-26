const express = require('express')
const path = require('path')
const request = require('request')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const daprPort = process.env.DAPR_HTTP_PORT || 3500
const daprUrl = `http://localhost:${daprPort}/v1.0`
const port = 8080

app.post('/publish', (req, res) => {
  console.log("Publishing: ", req.body)
  const publishUrl = `${daprUrl}/invoke/api/method/message`
  console.log()
  request( { uri: publishUrl, method: 'POST', json: req.body } )
  res.sendStatus(200)
})

// Serve static files
app.use(express.static(path.join(__dirname, 'client/build')))
// For all other requests, route to React client
app.get('*', function (_req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`))
