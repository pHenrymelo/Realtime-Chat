import express, { Application } from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'

class App {
  private app: Application
  private http: http.Server
  private io: Server

  constructor() {
    this.app = express()
    this.http = http.createServer(this.app)
    this.io = new Server(this.http)
    this.listenSocket()
    this.setupRoutes()
    this.app.use(express.static(path.join(__dirname, '/public')))
  }

  listenServer() {
    this.http.listen(4013, () =>
      console.log('🚀 Server is running on http://localhost:4013'),
    )
  }

  listenSocket() {
    this.io.on('connection', (socket) => {
      console.log('user connected', socket.id)

      socket.on('message', (msg) => {
        this.io.emit('message', msg)
      })
    })
  }

  setupRoutes() {
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '/public/index.html'))
    })
  }
}

const app = new App()

app.listenServer()
