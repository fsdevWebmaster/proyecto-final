import { isJourneyValid } from "./journeyWS.js";

const wsDisconnect = () => {
  console.log('A user disconnected');
}

const journeyUpdated = (socket) => {
  socket.on('journey:send_journey', async (data) => {
    const isValidInfo = await isJourneyValid(data.id);
    socket.local.emit('journey:updated_journey', { journeyUpdate: isValidInfo.isValid });
  });
}

export const initSocketEvents = (server) => {
  server.on('connection', (socket) => {
    console.log('WS connection ready', socket.id);

    journeyUpdated(socket);
  });

  server.on('disconnect', wsDisconnect);  
}