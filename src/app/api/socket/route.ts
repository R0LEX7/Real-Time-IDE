import { Server } from "socket.io";
import { NextResponse, NextRequest as req } from "next/server";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected", socket.id);

      socket.on("message", (msg) => {
        console.log("Message received:", msg);
        // Broadcast message to all clients
        io.emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });
  }
  res.end();
}
