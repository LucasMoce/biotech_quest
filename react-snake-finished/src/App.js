import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "./useInterval";
import {
  CANVAS_SIZE,
  SNAKE_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from "./constants";

const App = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apples, setApples] = useState([]);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const appleSymbols = ['A', 'T', 'C', 'G'];


  const generateFixedLengthSequence = () => {
    const possibleLetters = ["A", "C", "T", "G"];
    const sequenceLength = 10; // Sempre terá 10 caracteres
  
    const sequence = [];
    for (let i = 0; i < sequenceLength; i++) {
      const randomIndex = Math.floor(Math.random() * possibleLetters.length);
      const randomLetter = possibleLetters[randomIndex];
      sequence.push(randomLetter);
    }
  
    return sequence.join("");
  };

  const generateComplementarySequence = (sequence) => {
    const complementarySequence = [];
    for (let i = 0; i < sequence.length; i++) {
      const nucleotide = sequence[i];
      let complement;
  
      if (nucleotide === "A") {
        complement = "T";
      } else if (nucleotide === "T") {
        complement = "A";
      } else if (nucleotide === "C") {
        complement = "G";
      } else if (nucleotide === "G") {
        complement = "C";
      } else {
        // Handle invalid nucleotides here
        complement = "?"; // Use "?" for unknown nucleotides
      }
  
      complementarySequence.push(complement);
    }
  
    return complementarySequence.join("");
  };

  const displaySequence = () => {
    const sequenceDiv = document.getElementById("sequence-display");
    const randomSequence = generateFixedLengthSequence();
    const complementarySequence = generateComplementarySequence(randomSequence);
  
    sequenceDiv.textContent = "Sequence: " + randomSequence;
    sequenceDiv.textContent += "\nComplementary: " + complementarySequence;
  };
  

  
  

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const moveSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);

    const generateUniqueApple = () => {
      let newApple;
      do {
        newApple = [
          Math.floor(Math.random() * (CANVAS_SIZE[0] / SCALE)),
          Math.floor(Math.random() * (CANVAS_SIZE[1] / SCALE))
        ];
      } while (checkCollision(newApple) || apples.some(apple => apple[0] === newApple[0] && apple[1] === newApple[1]));
      return newApple;
    };
    
    const createApples = (count) => {
      const newApples = [];
      for (let i = 0; i < count; i++) {
        newApples.push(generateUniqueApple());
      }
      return newApples;
    };            

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = newSnake => {
    let ateApples = 0;
    let newApples = [...apples];
  
    for (let i = 0; i < newSnake.length; i++) {
      for (let j = 0; j < newApples.length; j++) {
        if (newSnake[i][0] === newApples[j][0] && newSnake[i][1] === newApples[j][1]) {
          newApples.splice(j, 1);
          ateApples++;
        }
      }
    }
  
    if (ateApples > 0) {
      const additionalApples = createApples(4 - newApples.length); // Gere apenas o número restante de maçãs
      newApples = [...newApples, ...additionalApples];
      setApples(newApples.slice(0, 4)); // Mantenha apenas as primeiras 4 maçãs
      return true;
    }
    return false;
  };
  
  
  

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSnake(SNAKE_START);
    const initialApples = createApples(4); // Inicialmente, gere 4 maçãs
    setApples(initialApples);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "pink";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
  
    context.font = "1px Arial"; // Ajuste o tamanho da fonte para 10px
    context.textAlign = "center";
    context.textBaseline = "middle";
  
    apples.forEach(([x, y], index) => {
      context.fillStyle = "lightblue";
      context.fillRect(x, y, 1, 1);
      context.fillStyle = "black";
      context.fillText(appleSymbols[index], x + 0.5, y + 0.5);
    });
    
  }, [snake, apples, gameOver, appleSymbols]);
  
useEffect(() =>{
  displaySequence();
}, []);

  return (
    <div role="button" tabIndex="0" onKeyDown={e => moveSnake(e)}>
      <canvas
        style={{ border: "1px solid black" }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      <div id="sequence-display" style={{ textAlign: "center" }}></div>
      {gameOver && <div>GAME OVER!</div>}
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default App
