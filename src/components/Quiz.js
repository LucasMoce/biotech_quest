import React from 'react'
import { useState } from 'react'

const Quiz = () => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [atualQuestion, setAtualQuestion] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [acabou, setAcabou] = useState(false);

  const [quizData, setQuizData] = useState([
    {
      question: "O que é a Biotecnologia ?",
      options: ['O estudo das rochas e minerais', "O uso de  organismos vivos para criar produtos e processos úteis", "A Exploração exploração do espaço sideral", "A  construção de edifícios sustentáveis."],
      answer: "O uso de  organismos vivos para criar produtos e processos úteis"
    },
    {
      question: "Qual o nome da primeira ovelhada clonada?",
      options: ['Dolly', "Maria Chiquinha", "Renata", "Mariana Fonseca"],
      answer: "Dolly"
    },
    {
      question: "Qual o nome da terceira ovelhada clonada?",
      options: ['Dolly', "Maria Chiquinha", "Renata", "Mariana Fonseca"],
      answer: "Dolly"
    },
    {
      question: "Qual o nome da quarta ovelhada clonada?",
      options: ['Dolly', "Maria Chiquinha", "Renata", "Mariana Fonseca"],
      answer: "Dolly"
    },
    {
      question: "Qual o nome da quinta ovelhada clonada?",
      options: ['Dolly', "Maria Chiquinha", "Renata", "Mariana Fonseca"],
      answer: "Dolly"
    },
  ])

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderOptions = (options) =>
  {
    return options.map((option, index) => (
      <>
        <label htmlFor={option} className='mt-3' style={{fontFamily:"'Brush Script MT', cursive;",fontSize:`2rem`}}>
        <input 
        type="radio"
        name="quizOption"
        value={option}
        checked={selectedOption == option}
        onChange={handleOptionChange} 
        className='me-3'
        id={option}
        />
        {option}
        </label>
        <br />
      </>
    ))
  }

  const processAnswer = (()=> {
    if (selectedOption == quizData[atualQuestion].answer)
    {
      setPontos(pontos + 1);
      if (atualQuestion < quizData.length -1) {
        setAtualQuestion(atualQuestion + 1);
      } else {setAcabou(true)}
    } else {
      if (atualQuestion < quizData.length -1) {
        setAtualQuestion(atualQuestion + 1);
      } else {setAcabou(true)}
    }
  })

  return (
    <div>
      <div className='container mt-5 pt-5 rounded border border-danger border-5 bg-light'style={{height:`600px`}}>
        <p className='text-dark text-center' style={{fontSize:`30px`}}>Quiz da Biotecnologia</p>
        <div className='mx-auto' style={{width:`80%`}}>
          {acabou ? 
            <>
              <h1 className='text-center mt-5'>Sua pontuação: {pontos}/{quizData.length}</h1>
            </>
          :
            <>
              <h1 className='mt-4 text-center'>{quizData[atualQuestion].question}</h1>
              {renderOptions(quizData[atualQuestion].options)}
              <button className='btn btn-danger mt-5 translate-middle btn-lg' style={{marginLeft:`50%`, marginRight:`50%`}} onClick={processAnswer}>Enviar</button>
              <h4 className='text-center'>{atualQuestion +1}/{quizData.length}</h4>
            </>
          }         
        </div>       
      </div>
      
    </div>
  )
}

export default Quiz