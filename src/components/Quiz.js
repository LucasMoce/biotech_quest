import React from 'react'
import { useState } from 'react'

const Quiz = () => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [atualQuestion, setAtualQuestion] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [acabou, setAcabou] = useState(false);

  const [quizData, setQuizData] = useState([
    {
      question: "Qual o nome da primeira ovelhada clonada?",
      options: ['Dolly', "Maria Chiquinha", "Renata", "Mariana Fonseca"],
      answer: "Dolly"
    },
    {
      question: "Qual o nome da segunda ovelhada clonada?",
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
        <label htmlFor={option} className='mt-3'>
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
      <div className='container mt-5 pt-5 rounded border border-primary border-5 bg-light'style={{height:`600px`}}>
        <h1 className='text-dark text-center'>Quiz da Biotecnologia</h1>
        <div className='mx-auto' style={{width:`500px`}}>
          {acabou ? 
            <>
              <h3 className='text-center mt-5'>Sua pontuação: {pontos}/{quizData.length}</h3>
            </>
          :
            <>
              <h4 className='mt-4'>{quizData[atualQuestion].question}</h4>
              {renderOptions(quizData[atualQuestion].options)}
              <button className='btn btn-primary mt-5 translate-middle' style={{marginLeft:`50%`, marginRight:`50%`}} onClick={processAnswer}>Enviar</button>
              <h4 className='text-center'>{atualQuestion +1}/{quizData.length}</h4>
            </>
          }         
        </div>       
      </div>
      
    </div>
  )
}

export default Quiz