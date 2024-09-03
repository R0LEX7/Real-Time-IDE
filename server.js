import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { ACTIONS } from "./actions.js";
import { socket } from "./src/socket.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const userSocketMap = {};
function getAllConnectedClients(roomId, io) {
  // Map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected: ", socket.id);
    socket.on("hello", (value) => {
      console.log("Received value from client: ", value);
    });
    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
      console.log("Received value from client: ", username);
      userSocketMap[socket.id] = username;
      socket.join(roomId);
      const allClients = getAllConnectedClients(roomId, io);

      allClients.forEach(({ socketId }) => {
        io.to(socketId).emit(ACTIONS.JOINED, {
          allClients,
          username,
          socketId: socket.id,
        });
      });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, value }) => {
      socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { value });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
      io.to(socketId).emit(ACTIONS.SYNC_CODE, code);
    });

    socket.on(ACTIONS.RUN , ({roomId , output}) =>{
      socket.in(roomId).emit(ACTIONS.RUN , {output})
    } )

    socket.on("disconnecting", () => {
      console.log("disconnecting.....");
      const rooms = [...socket.rooms];
      rooms.forEach((roomId) => {
        socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
          socketId: socket.id,
          username: userSocketMap[socket.id],
        });
      });
      delete userSocketMap[socket.id];
      socket.leave();
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
