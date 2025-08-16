import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const rooms = new Map();

function getRandomColor(usedColors) {
  const palette = [
    "#ff4d4f",
    "#40a9ff",
    "#73d13d",
    "#ffa940",
    "#9254de",
    "#13c2c2",
    "#eb2f96",
    "#2f54eb",
    "#52c41a",
    "#fa541c",
    "#faad14",
    "#722ed1",
  ];
  return (
    palette.find((c) => !usedColors.has(c)) ||
    `hsl(${Math.floor(Math.random() * 360)}, 80%, 55%)`
  );
}

app.get("/api/room", (req, res) => {
  const roomId = Math.random().toString(36).slice(2, 11);
  const uniqueId = Math.random().toString(36).slice(2, 20);

  rooms.set(roomId, {
    admin: {
      name: "name from database",
      socketId: "",
      uniqueId: "guestid",
    },
    players: new Map(),
  });

  res.json({ roomId });
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("room:join", ({ roomId, iddd }) => {
    if (!roomId) return;

    const currentRoom = rooms.get(roomId);
    if (!currentRoom) {
      return socket.emit("error", { message: "Room not found" });
    }

    let nameFromDB = "Guest";

    if (currentRoom.admin.uniqueId === iddd) {
      currentRoom.admin.socketId = socket.id;
    }
    socket.data.roomId = roomId;

    socket.join(roomId);

    const usedColors = new Set(
      Array.from(currentRoom.players.values()).map((p) => p.color)
    );
    const color = getRandomColor(usedColors);

    const newPlayer = {
      id: socket.id,
      name: nameFromDB,
      x: Math.floor(Math.random() * 500),
      y: Math.floor(Math.random() * 500),
      color,
    };

    currentRoom.players.set(socket.id, newPlayer);

    socket.emit("init", {
      id: socket.id,
      players: Array.from(currentRoom.players.values()),
    });

    socket.to(roomId).emit("player:join", newPlayer);
  });

  socket.on("player:move", ({ roomId, x, y }) => {
    if (!roomId || typeof x !== "number" || typeof y !== "number") return;
    const currentRoom = rooms.get(roomId);
    if (!currentRoom || !currentRoom.players.has(socket.id)) return;

    const playerState = currentRoom.players.get(socket.id);
    playerState.x = x;
    playerState.y = y;
    currentRoom.players.set(socket.id, playerState);

    socket.to(roomId).emit("player:move", { id: socket.id, x, y });
  });

 socket.on("disconnect", () => {
    const roomId = socket.data.roomId;
    if (!roomId) return;

    const roomData = rooms.get(roomId);
    if (roomData && roomData.players.has(socket.id)) {
      roomData.players.delete(socket.id);
      console.log("✅ deleted from room", roomId);
      socket.to(roomId).emit("player:leave", { id: socket.id });
    }

    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
});
