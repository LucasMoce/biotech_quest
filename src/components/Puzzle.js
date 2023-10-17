import React, { useState, useRef, useEffect } from 'react';

const Quiz = () => {
  const canvasRef = useRef(null);

  const [circleCadeias, setCircleCadeias] = useState([
    [
      { x: 50, y: 50, label: 'A' },
      { x: 150, y: 50, label: 'G' },
      { x: 250, y: 50, label: 'T' },
      { x: 350, y: 50, label: 'C' },
    ],
    [
      { x: 50, y: 75, label: 'G' },
      { x: 150, y: 75, label: 'C' },
      { x: 250, y: 75, label: 'A' },
      { x: 350, y: 75, label: 'A' },
    ],
    [
      { x: 50, y: 100, label: 'G' },
      { x: 150, y: 100, label: 'T' },
      { x: 250, y: 100, label: 'A' },
    ],
  ]);

  const [dragging, setDragging] = useState({ cadeiaIndex: -1, circleIndex: -1 });

  const encaixes = [
    { x: 50, y: 300, label: 'G' },
    { x: 150, y: 300, label: 'T' },
    { x: 250, y: 300, label: 'A' },
    { x: 350, y: 300, label: 'A' },
    { x: 450, y: 300, label: 'G' },
    { x: 550, y: 300, label: 'T' },
    { x: 650, y: 300, label: 'C' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawShapes = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const circleRadius = 25;
      const encaixeRadius = 25;
      const rectangleWidth = 300;

      // Desenha os encaixes
      encaixes.forEach((encaixe) => {
        context.fillStyle = '#f0f0f0';
        context.beginPath();
        context.arc(encaixe.x, encaixe.y, encaixeRadius, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = '#000000';
        context.font = 'bold 12px Arial';
        context.fillText(encaixe.label, encaixe.x - 5, encaixe.y + 5);
      });

      // Desenha o retângulo fino cinza claro
      context.fillStyle = '#f0f0f0';
      context.fillRect(circleCadeias[0][0].x - circleRadius, circleCadeias[0][0].y - 2, rectangleWidth, 5);

      // Desenha os círculos vermelhos arrastáveis
      circleCadeias.forEach((cadeia, cadeiaIndex) => {
        cadeia.forEach((circlePosition, circleIndex) => {
          context.fillStyle = '#ff0000';
          context.beginPath();
          context.arc(circlePosition.x, circlePosition.y, circleRadius, 0, 2 * Math.PI);
          context.fill();
          context.fillStyle = '#000000';
          context.font = 'bold 12px Arial';
          context.fillText(circlePosition.label, circlePosition.x - 5, circlePosition.y + 5);

          // Verifica se o círculo está encaixado e se os labels coincidem
          const encaixeCorrespondente = encaixes.find(
            (encaixe) =>
              encaixe.label === circlePosition.label &&
              Math.abs(encaixe.x - circlePosition.x) < 5 &&
              Math.abs(encaixe.y - circlePosition.y) < 5
          );

          if (encaixeCorrespondente) {
            // Adiciona um contorno verde ao círculo
            context.strokeStyle = '#00ff00';
            context.lineWidth = 2;
            context.beginPath();
            context.arc(
              circlePosition.x,
              circlePosition.y,
              circleRadius + 2, // Aumenta o raio para que o contorno não cubra o círculo vermelho
              0,
              2 * Math.PI
            );
            context.stroke();
          }
        });
      });
    };

    drawShapes();
  }, [circleCadeias]);

  const handleMouseDown = (cadeiaIndex, circleIndex) => {
    setDragging({ cadeiaIndex, circleIndex });
  };

  const handleMouseUp = () => {
  if (dragging.cadeiaIndex !== -1 && dragging.circleIndex !== -1) {
    // Verifica se todos os círculos da mesma cadeia têm um local disponível para encaixe
    const todosPodemEncaixar = circleCadeias[dragging.cadeiaIndex].every((circlePosition, circleIndex) => {
      const encaixeEncontrado = encaixes.find((encaixe, encaixeIndex) => {
        const distance = Math.sqrt(
          (circlePosition.x - encaixe.x) ** 2 + (circlePosition.y - encaixe.y) ** 2
        );
        return distance < 30 && !circleIsOccupying(encaixeIndex, dragging.cadeiaIndex, circleIndex);
      });
      return encaixeEncontrado;
    });

    // Se todos podem encaixar, ajusta a posição para o encaixe
    if (todosPodemEncaixar) {
      const novasPosicoes = circleCadeias.map((cadeia, cadeiaIndex) =>
        cadeiaIndex === dragging.cadeiaIndex
          ? cadeia.map((circlePosition, circleIndex) => {
              const encaixeEncontrado = encaixes.find((encaixe, encaixeIndex) => {
                const distance = Math.sqrt(
                  (circlePosition.x - encaixe.x) ** 2 + (circlePosition.y - encaixe.y) ** 2
                );
                return distance < 30 && !circleIsOccupying(encaixeIndex, dragging.cadeiaIndex, circleIndex);
              });

              return encaixeEncontrado
                ? { ...circlePosition, x: encaixeEncontrado.x, y: encaixeEncontrado.y }
                : circlePosition;
            })
          : cadeia
      );

      setCircleCadeias(novasPosicoes);
    }

    setDragging({ cadeiaIndex: -1, circleIndex: -1 });
  }
};


  const handleMouseMove = (cadeiaIndex, circleIndex, e) => {
    if (dragging.cadeiaIndex !== -1 && dragging.circleIndex !== -1) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Calcula o deslocamento do círculo em relação à sua posição original
      const offsetX = mouseX - circleCadeias[dragging.cadeiaIndex][dragging.circleIndex].x;
      const offsetY = mouseY - circleCadeias[dragging.cadeiaIndex][dragging.circleIndex].y;

      // Atualiza a posição do círculo arrastado mantendo as posições relativas
      setCircleCadeias((prevCadeias) =>
        prevCadeias.map((cadeia, cIndex) =>
          cIndex === dragging.cadeiaIndex
            ? cadeia.map((circlePosition, ciIndex) => ({
                ...circlePosition,
                x: circlePosition.x + offsetX,
                y: circlePosition.y + offsetY,
              }))
            : cadeia
        )
      );
    }
  };

  const circleIsOccupying = (encaixeIndex, cadeiaIndex, circleIndex) => {
    return circleCadeias.some(
      (cadeia, cIndex) =>
        cIndex !== cadeiaIndex &&
        cadeia.some(
          (position, index) =>
            index !== circleIndex &&
            position.x === encaixes[encaixeIndex].x &&
            position.y === encaixes[encaixeIndex].y
        )
    );
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight - 50}
        onMouseDown={(e) => {
          const rect = canvasRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          // Verifica em qual cadeia e círculo foi clicado
          circleCadeias.forEach((cadeia, cadeiaIndex) => {
            cadeia.forEach((circlePosition, circleIndex) => {
              const distance = Math.sqrt(
                (mouseX - circlePosition.x) ** 2 + (mouseY - circlePosition.y) ** 2
              );
              if (distance <= 25) {
                handleMouseDown(cadeiaIndex, circleIndex);
              }
            });
          });
        }}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => {
          handleMouseMove(dragging.cadeiaIndex, dragging.circleIndex, e);
        }}
      />
    </div>
  );
};

export default Quiz;
