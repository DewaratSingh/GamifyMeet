import React, { useRef, useEffect } from "react";
import Circle from "../../cdn/circle";
import ImgObj from "../../cdn/imgObj";
import { io } from "socket.io-client";
import { obj } from "../../cdn/map";

const socket = io("http://localhost:3000", {
  autoConnect: true,
});

const Main = () => {
  const canvasRef = useRef(null);
  const otherPlayers = useRef(new Map());
  const myIdRef = useRef(null);

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

    const params = new URLSearchParams(window.location.search);
    const roomId = params.get("room");
    const iddd = params.get("iddd");

    const player = new Circle(canvas.width / 2, canvas.height / 2, 20, "red");
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

    let lastSent = { x: player.initialPo.X, y: player.initialPo.Y };

    socket.on("connect", () => {
      myIdRef.current = socket.id;
      if (roomId) socket.emit("room:join", { roomId, iddd });
    });

    socket.on("init", ({ id, players }) => {
      otherPlayers.current.clear();
      players.forEach((p) => {
        if (id === p.id) {
          player.color = p.color;
          player.initialPo.X = p.x;
          player.initialPo.Y = p.y;
        } else {
          otherPlayers.current.set(
            p.id,
            new Circle(p.x, p.y, 20, p.color || "gray")
          );
        }
      });
    });

    socket.on("player:join", ({ id, x, y, color }) => {
      if (id !== myIdRef.current && !otherPlayers.current.has(id)) {
        otherPlayers.current.set(id, new Circle(x, y, 20, color || "gray"));
      }
    });

    socket.on("player:move", ({ id, x, y }) => {
      if (id === myIdRef.current) return;
      const circle = otherPlayers.current.get(id);
      if (circle) {
        circle.initialPo.X = x;
        circle.initialPo.Y = y;
      }
    });

    socket.on("player:leave", ({ id }) => {
      alert("");
      otherPlayers.current.delete(id);
    });

    function animation() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (keys.w || keys.ArrowUp) player.initialPo.Y -= speed;
      if (keys.s || keys.ArrowDown) player.initialPo.Y += speed;
      if (keys.a || keys.ArrowLeft) player.initialPo.X -= speed;
      if (keys.d || keys.ArrowRight) player.initialPo.X += speed;

      camera.x = player.initialPo.X - canvas.width / 2;
      camera.y = player.initialPo.Y - canvas.height / 2;

      //--------------------------------drawing object-------------------------------------------------------------------------------------------------
      img.draw(ctx, camera, false);
      obj.forEach((obj) => {
        obj.draw(ctx, camera, false);
      });

      //--------------------------------drawing other player-------------------------------------------------------------------------------------------------
      for (const op of otherPlayers.current.values()) {
        op.draw(ctx, camera, false);
      }

      //--------------------------------drawing player-------------------------------------------------------------------------------------------------
      player.draw(ctx, camera, false);

      //----------------------------------------------------------------------------------------------------------------------------------------------------------------
      if (
        player.initialPo.X !== lastSent.x ||
        player.initialPo.Y !== lastSent.y
      ) {
        lastSent = { x: player.initialPo.X, y: player.initialPo.Y };
        if (roomId) socket.emit("player:move", { roomId, ...lastSent });
      }

      requestAnimationFrame(animation);
    }

    animation();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      socket.off();
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="bg-[#3AAE65] h-[90vh] w-[90vw] m-auto mt-2"
      />
    </div>
  );
};

export default Main;
