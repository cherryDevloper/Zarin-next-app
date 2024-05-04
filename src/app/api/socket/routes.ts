import { Server as IOServer } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket) {
    res.status(500).json({ error: "No socket found." });
    return;
  }
  //@ts-ignore
  const httpServer: HTTPServer = res.socket.server as HTTPServer;
  let io = (httpServer as any).io as SocketIOServer;

  if (!io) {
    io = new IOServer(httpServer, {
      path: "wss://ws.coincap.io/prices?assets=bitcoin,ethereum",
    });

    (httpServer as any).io = io;

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });

      socket.on("clientMessage", (message) => {
        console.log("Received message:", message);
        socket.emit("serverResponse", { message: "Hello from the server!" });
      });
    });
  }

  res.end();
}
