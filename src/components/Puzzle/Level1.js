import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa o componente Link para navegação interna


const Puzzle1 = () => {
  const [circleCadeias, setCircleCadeias] = useState([
    [
      { x: 50, y: 50, label: 'A' },
      { x: 150, y: 50, label: 'G' },
      { x: 250, y: 50, label: 'T' },
      { x: 350, y: 50, label: 'C' },
    ],
    [
      { x: 50, y: 100, label: 'G' },
      { x: 150, y: 100, label: 'T' },
      { x: 250, y: 100, label: 'A' },
      { x: 350, y: 100, label: 'A' },
    ],
    [
      { x: 50, y: 150, label: 'G' },
      { x: 150, y: 150, label: 'T' },
      { x: 250, y: 150, label: 'A' },
    ],
  ]);

  const encaixes = [
    { x: 50, y: 300, label: 'G' },
    { x: 150, y: 300, label: 'T' },
    { x: 250, y: 300, label: 'A' },
    { x: 350, y: 300, label: 'A' },
    { x: 450, y: 300, label: 'G' },
    { x: 550, y: 300, label: 'T' },
    { x: 650, y: 300, label: 'C' },
  ];

  const cadeiaEstatica = [
    { x: 50, y: 400, label: 'C' },
    { x: 150, y: 400, label: 'A' },
    { x: 250, y: 400, label: 'T' },
    { x: 350, y: 400, label: 'T' },
    { x: 450, y: 400, label: 'C' },
    { x: 550, y: 400, label: 'A' },
    { x: 650, y: 400, label: 'G' },
  ];
  
  const canvasRef = useRef(null);

  const [dragging, setDragging] = useState({ cadeiaIndex: -1, circleIndex: -1 });

  

  const checkAnswer = () => {
    // Filtra as cadeias que têm pelo menos um círculo encaixado
    const cadeiasParaVerificar = circleCadeias.filter((cadeia) =>
      cadeia.some((circlePosition) =>
        encaixes.some(
          (encaixe) =>
            encaixe.label === circlePosition.label &&
            Math.abs(encaixe.x - circlePosition.x) < 5 &&
            Math.abs(encaixe.y - circlePosition.y) < 5
        )
      )
    );
  
    // Verifica se todos os encaixes estão ocupados
    const encaixesOcupados = encaixes.every((encaixe) =>
      cadeiasParaVerificar.some((cadeia) =>
        cadeia.some(
          (circlePosition) =>
            Math.abs(circlePosition.x - encaixe.x) < 5 && Math.abs(circlePosition.y - encaixe.y) < 5
        )
      )
    );
  
    // Verifica se todos os círculos encaixados têm o rótulo correto
    const circulosCorretos = cadeiasParaVerificar.every((cadeia) =>
      cadeia.every((circlePosition) => {
        const encaixeCorrespondente = encaixes.find(
          (encaixe) =>
            encaixe.label === circlePosition.label &&
            Math.abs(encaixe.x - circlePosition.x) < 5 &&
            Math.abs(encaixe.y - circlePosition.y) < 5
        );
        return encaixeCorrespondente !== undefined;
      })
    );
  
    // Verifica se todos os encaixes estão ocupados e os círculos encaixados têm o rótulo correto
    if (encaixesOcupados && circulosCorretos) {
      // Redireciona para o link quando a resposta estiver correta
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    } else {
      // Mensagem ou ação para lidar com uma resposta incorreta (opcional)
      console.log('Resposta incorreta. Tente novamente.');
    }
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawShapes = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const circleRadius = 25;
      const encaixeRadius = 25;

      // Desenha os encaixes
      encaixes.forEach((encaixe) => {
        context.fillStyle = '#e0e0e0';
        context.beginPath();
        context.arc(encaixe.x, encaixe.y, encaixeRadius, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = '#c2c2c2';
        context.font = 'bold 12px Arial';
        context.fillText(encaixe.label, encaixe.x - 5, encaixe.y + 5);
      });

      // Desenha os retângulos finos cinza claro para cada cadeia
      circleCadeias.forEach((cadeia) => {
        if (cadeia.length > 0) {
          context.fillStyle = '#f0f0f0';
          context.fillRect(cadeia[0].x - circleRadius, cadeia[0].y - 2, (cadeia.length - 1) * 100, 5);
        }
      });

      // Desenha a cadeia estática
      context.fillStyle = '#f0f0f0';
      context.fillRect(cadeiaEstatica[0].x - circleRadius, cadeiaEstatica[0].y - 2, (cadeiaEstatica.length - 1) * 100, 5);

      // Desenha os círculos vermelhos arrastáveis
      circleCadeias.forEach((cadeia, cadeiaIndex) => {
        cadeia.forEach((circlePosition, circleIndex) => {
          const color = getColorForLabel(circlePosition.label);
          context.fillStyle = color;
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

      // Desenha os círculos da cadeia estática
      cadeiaEstatica.forEach((circlePosition) => {
        const color = getColorForLabel(circlePosition.label);
        context.fillStyle = color;
        context.beginPath();
        context.arc(circlePosition.x, circlePosition.y, circleRadius, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = '#000000';
        context.font = 'bold 12px Arial';
        context.fillText(circlePosition.label, circlePosition.x - 5, circlePosition.y + 5);
      });
    };

    const getColorForLabel = (label) => {
      switch (label) {
        case 'C':
          return '#9ac8fc';
        case 'G':
          return '#cab1fc';
        case 'A':
          return '#fabc93';
        case 'T':
          return '#ffda91';
        case 'U':
          return '#fff491';
        default:
          return '#ff0000'; // Cor padrão se não houver correspondência
      }
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
      <div className="justify-content-center mt-3 text-center">
        <Link to="/puzzle" className="btn btn-primary mr-2">
          Voltar à Seleção
        </Link>

        <button className="btn btn-danger mx-2" onClick={checkAnswer}>
          <h4>Verificar Resposta</h4>
        </button>

        <Link to={`/puzzle/2`} className="btn btn-info ml-2">
          Próximo Nível
        </Link>
      </div>

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

export default Puzzle1;
