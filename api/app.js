const express = require('express')
const bodyParser = require('body-parser')
const WebSocket = require('ws').WebSocket
const { createServer } = require('http')
const app = express()

app.use(bodyParser.json())
app.use('/', require('./routes'))

const port = process.env.PORT || 9000
const server = createServer(app)
const wss = new WebSocket.Server({ server })

wss.on('connection', (socket) => {
  console.info(`Total connected clients: ${wss.clients.size}`)
  app.locals.clients = wss.clients

  socket.send(
    JSON.stringify({
      type: 'connect',
      message: 'Welcome to Dapr Chat App'
    })
  )
})

server.listen(port, () => {
  console.log(`Node subscriber server running on port: ${port}`)
})
