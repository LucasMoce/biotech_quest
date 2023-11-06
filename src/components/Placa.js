import React, { useEffect, useRef, useState } from 'react';

const Placa = () => {
  const canvasRef = useRef(null);
  const [colonies, setColonies] = useState([]);
  const [counted, setCounted] = useState(0);
  const [timer, setTimer] = useState(30); // Exemplo: 30 segundos por round
  const [number, setNumber] = useState('');
  const [coloniesnumber, setColoniesNumber] = useState(0);
  const [jogando, setJogando] = useState(true);
  const [ganhou, setGanhou] = useState(false);
  const [texto, setTexto] = useState("teste");


  // Função para gerar colônias aleatórias
  const generateColonies = (numberOfColonies, canvasRadius) => {
    let newColonies = [];
    for (let i = 0; i < numberOfColonies; i++) {
      let x, y, colonyRadius, distanceFromCenter;
      do {
        x = Math.random() * canvasRadius * 2; // Coordenada x dentro do diâmetro
        y = Math.random() * canvasRadius * 2; // Coordenada y dentro do diâmetro
        colonyRadius = Math.random() * 10 + 5; // Raio entre 5 e 15
        distanceFromCenter = Math.sqrt(Math.pow(x - canvasRadius, 2) + Math.pow(y - canvasRadius, 2));
        // Verifica se o centro da colônia está dentro do círculo da placa
      } while (distanceFromCenter + colonyRadius > canvasRadius);
      newColonies.push({
        x: x,
        y: y,
        radius: colonyRadius,
        counted: false
      });
    }
    setColoniesNumber(numberOfColonies)
    console.log(numberOfColonies)
    return newColonies;
  };

  // Desenha as colônias no canvas
  const drawColonies = (ctx, colonies) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpa o canvas
    colonies.forEach(colony => {
      ctx.beginPath();
      ctx.arc(colony.x, colony.y, colony.radius, 0, Math.PI * 2);
      ctx.fillStyle = colony.counted ? 'red' : 'black'; // Muda a cor se contada
      ctx.fill();
    });
  };

  // Configura o canvas e desenha as colônias
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Define o tamanho do canvas
    canvas.width = 500;
    canvas.height = 500;

    // Gera colônias aleatórias e desenha
    const canvasRadius = canvasRef.current.width / 2; // Raio é metade da largura do canvas
    const newColonies = generateColonies(Math.floor(Math.random() * 50) + 10, canvasRadius);
    setColonies(newColonies);
    drawColonies(context, newColonies);
  }, []);

  // Atualiza o contador e verifica se a colônia foi clicada
  const handleCanvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let found = false;

    const updatedColonies = colonies.map(colony => {
      const distance = Math.sqrt(Math.pow(colony.x - x, 2) + Math.pow(colony.y - y, 2));
      if (!found && !colony.counted && distance < colony.radius) {
        // Colônia clicada e não contada
        setCounted(prevCounted => prevCounted + 1);
        found = true; // Evita múltiplas colônias sendo contadas no mesmo clique
        return { ...colony, counted: true }; // Marca a colônia como contada
      }
      return colony;
    });

    if (found) {
      setColonies(updatedColonies);
      const context = canvasRef.current.getContext('2d');
      drawColonies(context, updatedColonies); // Redesenha as colônias com a nova cor
    }
  };

  // Lógica do temporizador
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      // O tempo acabou
      clearInterval(interval);
      setJogando(false);
      if (jogando) {setTexto("O tempo acabou!")}
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (number == coloniesnumber)
    {
        setGanhou(true)
    } else {
        setTexto("Número de colônias errado!")
    }
    setJogando(false);
    console.log(number);
  };

  const handleNextLevel = () => {
    //Ir para o próximo nivel
  };
  

  return (
    <div className='text-center'>
    {jogando ? 
        <>
        <canvas ref={canvasRef} onClick={handleCanvasClick} className='border m-1 border-2' style={{borderRadius:'250px'}}></canvas>
        <div className=''>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='numberInput'>Colônias contadas:</label> <br />
                    <input
                    type='number'
                    className='mt-1'
                    id='numberInput'
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    />
                </div>
                <button type='submit' className='btn btn-sm btn-danger m-1'>
                    Enviar
                </button>
            </form>
            <span>Tempo restante: {timer}</span>
        </div>
        </>    
    :
        <>
        {ganhou ? 
            <>
                <h2 className='mt-5'>Você Ganhou!</h2>
                <button className='btn btn-danger mt-2' onClick={handleNextLevel}>Próxima fase</button>
            </>
        :
            <>
                <h2 className='mt-5'>Você perdeu!</h2>
                <h2>{texto}</h2>
                <button className='btn btn-danger mt-2' onClick={handleNextLevel}>Próxima fase</button>
            </>
        }
        </>
     }
    </div>
  );
}

export default Placa;
