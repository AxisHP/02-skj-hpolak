import { useEffect, useRef, useState } from "react";

type Obstacle = {
  x: number;
  width: number;
  height: number;
  passed: boolean;
};

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 280;
const GROUND_HEIGHT = 48;

const CAPYBARA_WIDTH = 52;
const CAPYBARA_HEIGHT = 40;
const CAPYBARA_X = 90;

const GRAVITY = 0.62;
const JUMP_FORCE = -13;

const getCookieNumber = (name: string): number => {
  if (typeof document === "undefined") {
    return 0;
  }

  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${encodeURIComponent(name)}=`));

  if (!cookie) {
    return 0;
  }

  const value = Number(decodeURIComponent(cookie.split("=")[1] ?? "0"));
  return Number.isNaN(value) ? 0 : value;
};

const setCookieNumber = (name: string, value: number) => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    String(value)
  )}; max-age=31536000; path=/; samesite=lax`;
};

const SixSeven = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => getCookieNumber("capybara67-best"));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let running = false;
    let gameOver = false;
    let capybaraY = CANVAS_HEIGHT - GROUND_HEIGHT - CAPYBARA_HEIGHT;
    let capybaraVelocityY = 0;
    let speed = 6;
    let frame = 0;
    let localScore = 0;
    let localBestScore = getCookieNumber("capybara67-best");

    let obstacles: Obstacle[] = [];
    let nextObstacleIn = 90;

    const restart = () => {
      capybaraY = CANVAS_HEIGHT - GROUND_HEIGHT - CAPYBARA_HEIGHT;
      capybaraVelocityY = 0;
      speed = 6;
      frame = 0;
      localScore = 0;
      obstacles = [];
      nextObstacleIn = 90;
      running = true;
      gameOver = false;
      setScore(0);
    };

    const jump = () => {
      if (!running) {
        restart();
        return;
      }

      const onGround = capybaraY >= CANVAS_HEIGHT - GROUND_HEIGHT - CAPYBARA_HEIGHT - 0.2;
      if (onGround && !gameOver) {
        capybaraVelocityY = JUMP_FORCE;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        jump();
      }
      if (event.code === "Enter" && gameOver) {
        restart();
      }
    };

    const handlePointerDown = () => {
      jump();
    };

    const spawnObstacle = () => {
      const height = 34 + Math.random() * 18;
      const width = 36 + Math.random() * 18;
      obstacles.push({
        x: CANVAS_WIDTH + 8,
        width,
        height,
        passed: false,
      });
      nextObstacleIn = 65 + Math.floor(Math.random() * 55);
    };

    const drawCapybara = (x: number, y: number) => {
      const bob = Math.sin(frame / 5) * 1.5;

      ctx.fillStyle = "#8c5a36";
      ctx.fillRect(x + 6, y + 10 + bob, 34, 24);

      ctx.fillStyle = "#9a6a44";
      ctx.fillRect(x + 30, y + 4 + bob, 20, 20);

      ctx.fillStyle = "#7a4b2e";
      ctx.fillRect(x + 31, y + bob, 7, 8);
      ctx.fillRect(x + 42, y + bob, 7, 8);

      ctx.fillStyle = "#3c2a21";
      ctx.fillRect(x + 44, y + 10 + bob, 3, 3);
      ctx.fillRect(x + 48, y + 14 + bob, 2, 2);

      ctx.fillStyle = "#f7f2e8";
      ctx.fillRect(x + 6, y + 16 + bob, 6, 4);
      ctx.fillRect(x + 18, y + 16 + bob, 6, 4);
    };

    const drawBackground = () => {
      ctx.fillStyle = "#fffdf6";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = "#f4f0e1";
      ctx.fillRect(0, CANVAS_HEIGHT - GROUND_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);

      ctx.strokeStyle = "#d8cdb6";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, CANVAS_HEIGHT - GROUND_HEIGHT + 0.5);
      ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_HEIGHT + 0.5);
      ctx.stroke();

      ctx.fillStyle = "#d9d3c1";
      for (let i = 0; i < 40; i += 1) {
        const dotX = (i * 80 - (frame * speed) / 2) % (CANVAS_WIDTH + 80);
        const normalizedX = dotX < 0 ? dotX + CANVAS_WIDTH + 80 : dotX;
        ctx.fillRect(normalizedX, CANVAS_HEIGHT - GROUND_HEIGHT + 25 + ((i % 3) * 4), 3, 3);
      }
    };

    const drawObstacle67 = (obstacle: Obstacle) => {
      const y = CANVAS_HEIGHT - GROUND_HEIGHT - obstacle.height;

      ctx.fillStyle = "#2f7a47";
      ctx.fillRect(obstacle.x, y, obstacle.width, obstacle.height);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px monospace";
      ctx.textAlign = "center";
      ctx.fillText("67", obstacle.x + obstacle.width / 2, y + obstacle.height - 10);

      ctx.strokeStyle = "#245f36";
      ctx.lineWidth = 2;
      ctx.strokeRect(obstacle.x, y, obstacle.width, obstacle.height);
    };

    const hasCollision = (obstacle: Obstacle) => {
      const capybaraBox = {
        x: CAPYBARA_X + 4,
        y: capybaraY + 4,
        width: CAPYBARA_WIDTH - 10,
        height: CAPYBARA_HEIGHT - 4,
      };

      const obstacleBox = {
        x: obstacle.x + 2,
        y: CANVAS_HEIGHT - GROUND_HEIGHT - obstacle.height,
        width: obstacle.width - 4,
        height: obstacle.height,
      };

      return (
        capybaraBox.x < obstacleBox.x + obstacleBox.width &&
        capybaraBox.x + capybaraBox.width > obstacleBox.x &&
        capybaraBox.y < obstacleBox.y + obstacleBox.height &&
        capybaraBox.y + capybaraBox.height > obstacleBox.y
      );
    };

    const loop = () => {
      frame += 1;
      drawBackground();

      if (running && !gameOver) {
        capybaraVelocityY += GRAVITY;
        capybaraY += capybaraVelocityY;

        const groundY = CANVAS_HEIGHT - GROUND_HEIGHT - CAPYBARA_HEIGHT;
        if (capybaraY > groundY) {
          capybaraY = groundY;
          capybaraVelocityY = 0;
        }

        nextObstacleIn -= 1;
        if (nextObstacleIn <= 0) {
          spawnObstacle();
        }

        obstacles = obstacles.filter((obstacle) => obstacle.x + obstacle.width > -10);

        obstacles.forEach((obstacle) => {
          obstacle.x -= speed;

          if (!obstacle.passed && obstacle.x + obstacle.width < CAPYBARA_X) {
            obstacle.passed = true;
            localScore += 1;
            setScore(localScore);

            if (localScore > localBestScore) {
              localBestScore = localScore;
              setBestScore(localBestScore);
              setCookieNumber("capybara67-best", localBestScore);
            }
          }

          if (hasCollision(obstacle)) {
            gameOver = true;
            running = false;
          }
        });

        speed += 0.0018;
      }

      obstacles.forEach(drawObstacle67);
      drawCapybara(CAPYBARA_X, capybaraY);

      ctx.fillStyle = "#3f3a2f";
      ctx.font = "bold 20px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`Score: ${localScore}`, 20, 32);
      ctx.fillText(`Best: ${localBestScore}`, 20, 58);

      if (!running && !gameOver) {
        ctx.fillStyle = "#3f3a2f";
        ctx.font = "bold 24px monospace";
        ctx.textAlign = "center";
        ctx.fillText("Press SPACE / TAP to Start", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 6);
        ctx.font = "16px monospace";
        ctx.fillText("Jump over the 67 obstacles", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 24);
      }

      if (gameOver) {
        ctx.fillStyle = "rgba(255, 253, 246, 0.75)";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = "#3f3a2f";
        ctx.font = "bold 36px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10);
        ctx.font = "18px monospace";
        ctx.fillText("Press ENTER or TAP to Restart", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 26);
      }

      animationRef.current = window.requestAnimationFrame(loop);
    };

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("pointerdown", handlePointerDown);

    animationRef.current = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-3 p-md-4">
              <h1 className="h3 h-md-2 text-center fw-bold mb-3">Capybara 67 Runner</h1>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-100 mw-100 border border-2 rounded bg-white shadow-sm"
        />
              <p className="text-center text-muted fw-semibold mt-3 mb-1">
                Controls: SPACE / UP ARROW / TAP to jump
              </p>
              <p className="text-center text-secondary small mb-0">
                Score: {score} | Best: {bestScore}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SixSeven;
