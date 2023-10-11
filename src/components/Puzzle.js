import React, { useState, useRef, useEffect } from 'react';

const Quiz = () => {
  const canvasRef = useRef(null);
  const [circlePosition, setCirclePosition] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawShapes = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const circleRadius = 25;
      const encaixeRadius = 25;

      const encaixeX = window.innerWidth / 2;
      const encaixeY = (window.innerHeight - 50) / 2 + 50;

      // Desenha o círculo cinza (encaixe) no centro da tela
      context.fillStyle = '#f0f0f0';
      context.beginPath();
      context.arc(encaixeX, encaixeY, encaixeRadius, 0, 2 * Math.PI);
      context.fill();

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

    const encaixeX = window.innerWidth / 2;
    const encaixeY = (window.innerHeight - 50) / 2 + 50;

    const distance = Math.sqrt(
      (circlePosition.x - encaixeX) ** 2 + (circlePosition.y - encaixeY) ** 2
    );

    // Define um limite de proximidade para "prender" o círculo ao encaixe
    const limiteProximidade = 30;

    if (distance < limiteProximidade) {
      // Se estiver próximo o suficiente, ajusta a posição para o centro do encaixe
      setCirclePosition({ x: encaixeX, y: encaixeY });
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
      <h1>PUZZZZZZZLEEE</h1>
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
