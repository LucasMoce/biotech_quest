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
    { x: 50, y: 300, label: 'A' },
    { x: 150, y: 300, label: 'B' },
    { x: 250, y: 300, label: 'C' },
    { x: 350, y: 300, label: 'D' },
    { x: 450, y: 300, label: 'E' },
    { x: 550, y: 300, label: 'F' },
    { x: 650, y: 300, label: 'G' },
    { x: 750, y: 300, label: 'H' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawShapes = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const circleRadius = 25;
      const encaixeRadius = 25;
      const rectangleWidth = 300; // Largura do retângulo

      // Desenha os encaixes
      encaixes.forEach((encaixe, index) => {
        context.fillStyle = '#f0f0f0';
        context.beginPath();
        context.arc(encaixe.x, encaixe.y, encaixeRadius, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = '#000000';
        context.font = 'bold 12px Arial'; // Ajuste a fonte e tamanho conforme necessário
        context.fillText(encaixe.label, encaixe.x - 5, encaixe.y + 5);
      });

      // Desenha o retângulo fino cinza claro
      context.fillStyle = '#f0f0f0';
      context.fillRect(circlePositions[0].x - circleRadius, circlePositions[0].y - 2, rectangleWidth, 5);

      // Desenha os círculos vermelhos arrastáveis
      context.fillStyle = '#ff0000';
      circlePositions.forEach((circlePosition, index) => {
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
      // Verifica se todos os círculos têm um local disponível para encaixe
      const todosPodemEncaixar = circlePositions.every((circlePosition, index) => {
        const encaixeEncontrado = encaixes.find((encaixe, encaixeIndex) => {
          const distance = Math.sqrt(
            (circlePosition.x - encaixe.x) ** 2 + (circlePosition.y - encaixe.y) ** 2
          );
          return distance < 30 && !circleIsOccupying(encaixeIndex);
        });
        return encaixeEncontrado;
      });

      // Se todos podem encaixar, ajusta a posição para o encaixe
      if (todosPodemEncaixar) {
        const novasPosicoes = circlePositions.map((circlePosition, index) => {
          const encaixeEncontrado = encaixes.find((encaixe, encaixeIndex) => {
            const distance = Math.sqrt(
              (circlePosition.x - encaixe.x) ** 2 + (circlePosition.y - encaixe.y) ** 2
            );
            return distance < 30 && !circleIsOccupying(encaixeIndex);
          });

          return encaixeEncontrado
            ? { x: encaixeEncontrado.x, y: encaixeEncontrado.y }
            : circlePosition;
        });

        setCirclePositions(novasPosicoes);
      }

      setDragging(false);
    }
  };

  const handleMouseMove = (e) => {
    if (dragging !== false) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Calcula o deslocamento do círculo em relação à sua posição original
      const offsetX = mouseX - circlePositions[dragging].x;
      const offsetY = mouseY - circlePositions[dragging].y;

      // Atualiza a posição de todos os círculos mantendo as posições relativas
      setCirclePositions((prevPositions) =>
        prevPositions.map((position, index) => ({
          x: position.x + offsetX,
          y: position.y + offsetY,
        }))
      );
    }
  };

  const circleIsOccupying = (encaixeIndex) => {
    return circlePositions.some(
      (position, index) =>
        index !== dragging &&
        position.x === encaixes[encaixeIndex].x &&
        position.y === encaixes[encaixeIndex].y
    );
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
