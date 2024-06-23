# Dapr Example: Invoke WebSocket

This repository contains an example chat app of using Dapr to invoke a WebSocket service. The example demonstrates how to set up a simple WebSocket server and a client that communicates with it via Dapr's service invocation capabilities.

## Prerequisites

- [Dapr CLI1.13.0](https://docs.dapr.io/getting-started/install-dapr-cli/)
- [Docker 26.1.3](https://www.docker.com/products/docker-desktop)
- [Node.js 16.20.2](https://nodejs.org/en/download/) (for the example WebSocket server and client)

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/ilhamarrouf/dapr-invoke-ws.git
```

### 2. Enter project directory and change node version
```sh
cd dapr-invoke-ws
```
```sh
nvm use
```

### 2. Setup and run API sidecar
```sh
cd api
```
```sh
npm install
```
```sh
dapr run --app-id api --app-port 9000 --app-protocol http --dapr-http-port 3500 node app.js
```

### 3. Setup and run Client sidecar
```sh
cd app
```
```sh
npm install
npm run buildclient
```
```sh
dapr run --app-id app --app-port 8080 npm run buildandstart
```