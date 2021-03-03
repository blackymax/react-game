import React, { useState, useRef, useEffect, ReactElement } from "react";
import { useInterval } from "./useInterval";
// import { Header } from "./components";
import { Footer } from "./components";
import { Score } from "./components";
import { AboutGame } from "./components";
import { Settings } from "./components";
import { BestScores } from "./components";
import { GameOverWindow } from "./components";
import { Pause } from "./components";
import { SNAKE_START, APPLE_START, SCALE_SMALL, SPEED_SLOW, SPEED_FAST, DIRECTIONS } from "./constants";
import "./assets/styles/normalize.css";
import "./assets/styles/style.css";

const App = (): ReactElement => {
  const canvasRef: any = useRef();
  const CANVAS_SIZE: Array<number> =
    window.innerHeight < window.innerWidth
      ? [window.innerHeight / 2, window.innerHeight / 2]
      : [window.innerWidth / 2, window.innerWidth / 2];
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, 0]);
  const [speed, setSpeed] = useState(SPEED_SLOW);
  const [gameOver, setGameOver] = useState(false);
  const [pause, setPause] = useState(false);
  const [score, setScore] = useState(0);
  const [lastDir, setLastDir] = useState([0, 0]);
  const [gameAboutWindow, setGameAbout] = useState(false);
  const [bestScoreWindow, setBestScoreWindow] = useState(false);
  const [settingsWindow, setSettingsWindow] = useState(false);
  const [auto, setAuto] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [music, setMusic] = useState(false);
  const [sound, setSound] = useState(false);
  const [SCALE, setScale] = useState(SCALE_SMALL);
  const [theme, setTheme] = useState(["pink", "green", "lightblue", "aqua"]);
  const [themeMode, setThemeMode] = useState("light");
  const [speedMode, setSpeedMode] = useState("slow");
  const [sizeMode, setSizeMode] = useState("small");
  const [musicVol, setMusicVol] = useState(1);
  const [soundVol, setSoundVol] = useState(1);
  let newSnakeHead: Array<number> = undefined;
  const aud: any = useRef(undefined);
  const eatSound: any = useRef(undefined);

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(0);
    setDir([0, 0]);
    setAuto(false);
    setGameOver(true);
    setGameStart(false);
  };

  const moveSnake = ({ keyCode }) => {
    if ((keyCode === 38 && dir === DIRECTIONS[40]) || (keyCode === 40 && dir === DIRECTIONS[38])) {
      if (keyCode === 38) {
        setDir(DIRECTIONS[40]);
        setLastDir(DIRECTIONS[40]);
      } else if (keyCode === 40) {
        setDir(DIRECTIONS[38]);
        setLastDir(DIRECTIONS[38]);
      }
    } else if ((keyCode === 37 && dir === DIRECTIONS[39]) || (keyCode === 39 && dir === DIRECTIONS[37])) {
      if (keyCode === 37) {
        setDir(DIRECTIONS[39]);
        setLastDir(DIRECTIONS[38]);
      } else if (keyCode === 39) {
        setDir(DIRECTIONS[37]);
        setLastDir(DIRECTIONS[37]);
      }
    } else if (keyCode === 27 && pause === false) {
      setPause(true);
    } else if (keyCode === 27 && pause === true) {
      setDir(lastDir);
      setPause(false);
    } else {
      setDir(DIRECTIONS[keyCode]);
      setLastDir(DIRECTIONS[keyCode]);
    }
  };

  const createApple = () => apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece, snk = snake) => {
    if (piece[0] * SCALE >= CANVAS_SIZE[0] || piece[0] < 0 || piece[1] * SCALE >= CANVAS_SIZE[1] || piece[1] < 0) {
      return true;
    }
    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) {
        return true;
      }
    }
    return false;
  };

  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple: any = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      setScore(score + 1);
      if (sound) {
        eatSound.current.play();
      }
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy: any = JSON.parse(JSON.stringify(snake));
    if (pause === true && music === true) {
      setMusic(false);
    }
    if (pause !== true && gameStart === true) {
      newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
      snakeCopy.unshift(newSnakeHead);
      if (checkCollision(newSnakeHead)) {
        endGame();
      }
      if (!checkAppleCollision(snakeCopy)) {
        snakeCopy.pop();
      }
      setSnake(snakeCopy);
      if (auto) {
        playAuto();
        if (checkCollision(newSnakeHead)) {
          endGame();
        }
      }
    }
  };

  const startGame = () => {
    setScore(0);
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    if (speedMode === "slow") {
      setSpeed(SPEED_SLOW);
    } else {
      setSpeed(SPEED_FAST);
    }
    setGameOver(false);
    setGameStart(true);
  };

  const resetFields = () => {
    setGameAbout(false);
    setSettingsWindow(false);
    setBestScoreWindow(false);
  };

  const playAuto = () => {
    if (snake[0][0] - apple[0] > 0) {
      setDir(DIRECTIONS[37]);
    } else if (snake[0][1] - apple[1] > 0) {
      setDir(DIRECTIONS[38]);
    } else if (snake[0][0] - apple[0] < 0) {
      setDir(DIRECTIONS[39]);
    } else if (snake[0][1] - apple[1] < 0) {
      setDir(DIRECTIONS[40]);
    }
  };

  const openModal = (e) => {
    switch (e.target.className) {
      case "about-game":
        if (!gameAboutWindow) {
          resetFields();
          setGameAbout(true);
        } else {
          resetFields();
        }
        break;
      case "best-scores":
        if (!bestScoreWindow) {
          resetFields();
          setBestScoreWindow(true);
        } else {
          resetFields();
        }
        break;
      case "settings":
        if (!settingsWindow) {
          resetFields();
          setSettingsWindow(true);
        } else {
          resetFields();
        }
        break;
      default:
        resetFields();
    }
  };
  const switchAutoPlay = () => {
    if (auto) {
      setAuto(false);
      endGame();
    } else {
      setAuto(true);
      startGame();
    }
  };

  const handleGameOver = (name: any) => {
    setGameOver(false);
    localStorage.setItem(name.value, `${score}`);
  };

  const playMusic = () => {
    setMusic(true);
    aud.current.play();
  };

  const pauseMusic = () => {
    setMusic(false);
    aud.current.pause();
  };

  const handleSound = () => {
    if (sound) {
      setSound(false);
    } else {
      setSound(true);
    }
  };

  const pickThemeDark = () => {
    setThemeMode("dark");
    setTheme(["red", "gray", "gold", "blueviolet"]);
  };

  const pickThemeLight = () => {
    setThemeMode("light");
    setTheme(["pink", "green", "lightblue", "aqua"]);
  };

  useEffect(() => {
    const context: any = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = theme[0];
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = theme[1];
    snake.forEach(([x, y]) => context.fillRect(x + 0.1, y + 0.1, 0.8, 0.8));
    context.fillStyle = theme[2];
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => moveSnake(e)}
      className="app-wrapper"
      style={{
        background: `${
          themeMode === "dark"
            ? "linear-gradient(to right, #74ebd5, #acb6e5)"
            : "linear-gradient(to right, #74ebd5, #acb6e5)"
        }`,
        backgroundSize: "cover"
      }}
    >
      <header>
        <h1 onClick={resetFields}>CYBERSNAKE</h1>
        <div className={"app-header-buttons"}>
          <button className={!bestScoreWindow ? "best-scores" : "best-scores active"} onClick={openModal}>
            lead
          </button>
          <button className={!settingsWindow ? "settings" : "settings active"} onClick={openModal}>
            set
          </button>
          <button className={!gameAboutWindow ? "about-game" : "about-game active"} onClick={openModal}>
            info
          </button>
        </div>
      </header>
      <main>
        <audio ref={aud} src={"./assets/audio/Yeah Yeah Yeahs - Heads Will Roll.mp3"} loop={true} />
        <audio ref={eatSound} src={"./assets/audio/eat.mp3"} />
        <Score scoreTitle={score} />
        {gameAboutWindow && <AboutGame />}
        {pause && <Pause />}
        {settingsWindow && (
          <Settings
            musicPlay={playMusic}
            musicPause={pauseMusic}
            stateMus={music}
            stateSnd={sound}
            soundHandler={handleSound}
            handleScale={setScale}
            themeDarkHandler={pickThemeDark}
            themeLightHandler={pickThemeLight}
            themeState={themeMode}
            handleSpeedState={setSpeedMode}
            handleSpeed={setSpeed}
            handleSizeMode={setSizeMode}
            speedState={speedMode}
            sizeState={sizeMode}
            audio={aud.current}
            sound={eatSound.current}
            handleMusicVolume={setMusicVol}
            musicVolState={musicVol}
            handleSoundVolume={setSoundVol}
            soundVolState={soundVol}
          />
        )}
        {bestScoreWindow && <BestScores data={Object.entries(localStorage)} />}
        <canvas
          style={{ border: "1px solid black", backgroundColor: theme[3] }}
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />
        {gameOver && <GameOverWindow info={score} change={handleGameOver} />}
        <div className={"start-game-block"}>
          <button onClick={startGame} className={!gameStart ? "start-game" : "start-game active"}>
            Start Game
          </button>
          <button onClick={switchAutoPlay} className={!auto ? "autoplay-game" : "autoplay-game active"}>
            Autoplay
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
