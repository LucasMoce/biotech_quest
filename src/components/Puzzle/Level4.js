import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa o componente Link para navegação interna


const Puzzle1 = () => {
  const [circleCadeias, setCircleCadeias] = useState([
    [
      { x: 875, y: 100, label: 'X' },
      { x: 975, y: 100, label: 'X' },
    ],
    [
      { x: 775, y: 175, label: 'X' },
      { x: 875, y: 175, label: 'X' },
      { x: 975, y: 175, label: 'X' },
      { x: 1075, y: 175, label: 'X' },
    ],
    [
      { x: 825, y: 400, label: 'X' },
      { x: 925, y: 400, label: 'X' },
      { x: 1025, y: 400, label: 'X' },
    ],
  ]);

  const encaixes = [
    { x: 525, y: 550, label: 'X' },
    { x: 625, y: 550, label: 'X' },
    { x: 725, y: 550, label: 'X' },
    { x: 825, y: 550, label: 'X' },
    { x: 925, y: 550, label: 'X' },
    { x: 1025, y: 550, label: 'X' },
    { x: 1125, y: 550, label: 'X' },
    { x: 1225, y: 550, label: 'X' },
    { x: 1325, y: 550, label: 'X' },
  ];

  const complementPairs = {
    'A': 'T',
    'T': 'A',
    'C': 'G',
    'G': 'C'
  };
  
  const cadeiaEstatica = encaixes.map(item => ({
    x: item.x,
    y: item.y + 100,
    label: complementPairs[item.label]
  }));

  const cor = {
    linha: '#d4d4d4',
    letra: '#000000',
    resposta: '#fc3a3a',
    encaixe: '#d4d4d4',
  }
  const nextLvl = `/puzzle/5`
  
  const canvasRef = useRef(null);

  const [dragging, setDragging] = useState({ cadeiaIndex: -1, circleIndex: -1 });

  const [respostaCorreta, setRespostaCorreta] = useState(null);

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
      setRespostaCorreta(true);} 
    else {
      setRespostaCorreta(false);}
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
        context.fillStyle = cor.encaixe;
        context.beginPath();
        context.arc(encaixe.x, encaixe.y, encaixeRadius, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = cor.resposta;
        context.font = 'bold 12px Arial';
        context.fillText(encaixe.label, encaixe.x - 5, encaixe.y + 5);
      });

      // Desenha os retângulos finos cinza claro para cada cadeia
      circleCadeias.forEach((cadeia) => {
        if (cadeia.length > 0) {
          context.fillStyle = cor.linha;
          context.fillRect(cadeia[0].x - circleRadius, cadeia[0].y - 2, (cadeia.length - 1) * 100, 5);
        }
      });

      // Desenha a linha da cadeia estática
      context.fillStyle = cor.linha;
      context.fillRect(cadeiaEstatica[0].x - circleRadius, cadeiaEstatica[0].y - 2, (cadeiaEstatica.length - 1) * 100, 5);

      // Desenha os círculos vermelhos arrastáveis
      circleCadeias.forEach((cadeia, cadeiaIndex) => {
        cadeia.forEach((circlePosition, circleIndex) => {
          const color = getColorForLabel(circlePosition.label);
          context.fillStyle = color;
          context.beginPath();
          context.arc(circlePosition.x, circlePosition.y, circleRadius, 0, 2 * Math.PI);
          context.fill();
          context.fillStyle = cor.letra;
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
        context.fillStyle = cor.letra;
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
      {/* Botões */}
      <div className="justify-content-center mt-3 text-center">
        <Link to="/puzzle" className="btn btn-primary mr-2">
          Voltar à Seleção
        </Link>

        <button className="btn btn-danger mx-2" onClick={checkAnswer}>
          <h4>Verificar Resposta</h4>
        </button>

        <Link to={nextLvl} className="btn btn-info ml-2">
          Próximo Nível
        </Link>
      </div>

      {/* Mensagem de sucesso ou falha */}
      {respostaCorreta !== null && (
        <div className={`alert ${respostaCorreta ? 'alert-success' : 'alert-danger'} text-center mt-3`} role="alert">
          {respostaCorreta ? 'Resposta correta!' : 'Resposta incorreta. Tente novamente.'}
        </div>
      )}

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
