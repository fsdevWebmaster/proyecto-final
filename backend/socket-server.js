import express from 'express'
import { Server } from 'socket.io'
import { getStep } from './utils/app.utils.js'
import http from 'http'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

export const socketApp = server.listen(process.env.SOCKET_PORT, () => {
  io.on("connect",(socket) => {
    socket.on("driverUi", async (data) => {
      const step = await getStep(data)
      socket.emit("step", step)
    })
  })
  console.log(`Socket server listening at :${process.env.SOCKET_PORT}`);
})



