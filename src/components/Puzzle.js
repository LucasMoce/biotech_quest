import React, { useState, useRef, useEffect } from 'react';

const Quiz = () => {
  const canvasRef = useRef(null);
  const [circlePositions, setCirclePositions] = useState([
    { x: 50, y: 50 },
    { x: 150, y: 50 },
    { x: 250, y: 50 },
    { x: 350, y: 50 },
  ]);

  const [dragging, setDragging] = useState(false);

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

      // Desenha os círculos vermelhos arrastáveis
      context.fillStyle = '#ff0000';
      circlePositions.forEach((circlePosition) => {
        context.beginPath();
        context.arc(circlePosition.x, circlePosition.y, circleRadius, 0, 2 * Math.PI);
        context.fill();
      });
    };

    drawShapes();
  }, [circlePositions]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Verifica qual círculo foi clicado
    const clickedCircleIndex = circlePositions.findIndex((circlePosition) => {
      const distance = Math.sqrt(
        (mouseX - circlePosition.x) ** 2 + (mouseY - circlePosition.y) ** 2
      );
      return distance <= 25;
    });

    if (clickedCircleIndex !== -1) {
      setDragging(clickedCircleIndex);
    }
  };

  const handleMouseUp = () => {
    if (dragging !== false) {
      // Verifica a proximidade de cada encaixe
      const limiteProximidade = 30;
      const encaixeEncontrado = encaixes.find((encaixe) => {
        const distance = Math.sqrt(
          (circlePositions[dragging].x - encaixe.x) ** 2 +
            (circlePositions[dragging].y - encaixe.y) ** 2
        );
        return distance < limiteProximidade;
      });

      // Se um encaixe foi encontrado, ajusta a posição para o encaixe
      if (encaixeEncontrado) {
        setCirclePositions((prevPositions) => {
          const newPositions = [...prevPositions];
          newPositions[dragging] = {
            x: encaixeEncontrado.x,
            y: encaixeEncontrado.y,
          };
          return newPositions;
        });
      }

      setDragging(false);
    }
  };

  const handleMouseMove = (e) => {
    if (dragging !== false) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Atualiza a posição do círculo arrastável enquanto o mouse é movido
      setCirclePositions((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions[dragging] = { x: mouseX, y: mouseY };
        return newPositions;
      });
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
