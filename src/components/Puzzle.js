import React, { useState, useRef, useEffect } from 'react';

const Quiz = () => {
  const canvasRef = useRef(null);
  const [circlePosition, setCirclePosition] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);

  // Adicione quatro encaixes
  const encaixes = [
    { x: 100, y: 300 },
    { x: 200, y: 300 },
    { x: 300, y: 300 },
    { x: 400, y: 300 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawShapes = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const circleRadius = 25;
      const encaixeRadius = 25;

      // Desenha os encaixes
      context.fillStyle = '#f0f0f0';
      encaixes.forEach((encaixe) => {
        context.beginPath();
        context.arc(encaixe.x, encaixe.y, encaixeRadius, 0, 2 * Math.PI);
        context.fill();
      });

      // Desenha o círculo vermelho arrastável
      context.fillStyle = '#ff0000';
      context.beginPath();
      context.arc(circlePosition.x, circlePosition.y, circleRadius, 0, 2 * Math.PI);
      context.fill();
    };

    drawShapes();
  }, [circlePosition]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const distance = Math.sqrt(
      (mouseX - circlePosition.x) ** 2 + (mouseY - circlePosition.y) ** 2
    );

    if (distance <= 25) {
      setDragging(true);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);

    // Verifica a proximidade de cada encaixe
    const limiteProximidade = 30;
    const encaixeEncontrado = encaixes.find((encaixe) => {
      const distance = Math.sqrt(
        (circlePosition.x - encaixe.x) ** 2 + (circlePosition.y - encaixe.y) ** 2
      );
      return distance < limiteProximidade;
    });

    // Se um encaixe foi encontrado, ajusta a posição para o encaixe
    if (encaixeEncontrado) {
      setCirclePosition({ x: encaixeEncontrado.x, y: encaixeEncontrado.y });
    }
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setCirclePosition({ x: mouseX, y: mouseY });
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight - 50}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default Quiz;
