import React, { useRef, useEffect } from "react";
import Circle from "../../cdn/circle";
import ImgObj from "../../cdn/imgObj";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000", {
  autoConnect: true,
});

const Main = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const camera = {
      x: 0,
      y: 0,
      range: {
        xFrom: -canvas.width,
        xTo: canvas.width,
        yFrom: -canvas.width,
        yTo: canvas.width,
      },
    };

    const speed = 5;

    // Local player and other players (by socket id)
    const player = new Circle(canvas.width / 2, canvas.height / 2, 20, "red");
    const otherPlayers = new Map();

    // Background sample image
    const img = new ImgObj(50, 50, "/OIP.jpeg", 100, 100);

    const keys = {
      w: false,
      a: false,
      s: false,
      d: false,
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };

    const handleKeyDown = (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
      } else if (keys.hasOwnProperty(e.key.toLowerCase())) {
        keys[e.key.toLowerCase()] = true;
      }
    };

    const handleKeyUp = (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
      } else if (keys.hasOwnProperty(e.key.toLowerCase())) {
        keys[e.key.toLowerCase()] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    let myId = null;
    let lastSent = { x: player.initialPo.X, y: player.initialPo.Y };

    socket.on("connect", () => {
      console.log("✅ Connected to Socket:", socket.id);
    });

    socket.on("init", ({ id, players }) => {
      myId = id;

      players.forEach((p) => {
        if (p.id === myId) {
          player.initialPo.X = p.x;
          player.initialPo.Y = p.y;
        } else if (!otherPlayers.has(p.id)) {
          otherPlayers.set(p.id, new Circle(p.x, p.y, 20, "gray"));
        }
      });
    });

    socket.on("player:join", ({ id, x, y }) => {
      if (id === myId) return;
      if (!otherPlayers.has(id)) {
        otherPlayers.set(id, new Circle(x, y, 20, "gray"));
      }
    });

    socket.on("player:move", ({ id, x, y }) => {
      if (id === myId) return;
      const p = otherPlayers.get(id);
      if (p) {
        p.initialPo.X = x;
        p.initialPo.Y = y;
      } else {
        otherPlayers.set(id, new Circle(x, y, 20, "gray"));
      }
    });

    socket.on("player:leave", ({ id }) => {
      otherPlayers.delete(id);
    });

    function animation() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (keys.w || keys.ArrowUp) player.initialPo.Y -= speed;
      if (keys.s || keys.ArrowDown) player.initialPo.Y += speed;
      if (keys.a || keys.ArrowLeft) player.initialPo.X -= speed;
      if (keys.d || keys.ArrowRight) player.initialPo.X += speed;

      camera.x = player.initialPo.X - canvas.width / 2;
      camera.y = player.initialPo.Y - canvas.height / 2;

      img.draw(ctx, camera, false);
      otherPlayers.forEach((op) => op.draw(ctx, camera, false));
      player.draw(ctx, camera, false);

      if (player.initialPo.X !== lastSent.x || player.initialPo.Y !== lastSent.y) {
        lastSent = { x: player.initialPo.X, y: player.initialPo.Y };
        socket.emit("player:move", lastSent);
      }

      requestAnimationFrame(animation);
    }

    animation();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      socket.off("connect");
      socket.off("init");
      socket.off("player:join");
      socket.off("player:move");
      socket.off("player:leave");
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="bg-[#3AAE65] h-[90vh] w-[90vw] m-auto mt-2"
      ></canvas>
    </div>
  );
};

export default Main;
