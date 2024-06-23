const router = require('express').Router()
const WebSocket = require('ws').WebSocket

const broadcast = (clients, text) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: "message",
        text
      }))
    }
  })
}

router.post('/message', (req, res) => {
  const { message } = req.body

  if (message) {
    broadcast(req.app.locals.clients, message)
  }

  res.sendStatus(200)
})

module.exports = router
