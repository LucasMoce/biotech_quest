import React from 'react'
import { useState } from 'react'

const Quiz = () => {

  const [questions, setQuestions] = useState([{
    q: "Qual o nome da primeira ovelha clonada?",
    a: [{ text: "Tereza", isCorrect: false },
    { text: "Chiquinha", isCorrect: false },
    { text: "Dolly", isCorrect: true },
    { text: "Maria de Lurdes Conceição", isCorrect: false }
    ]
 
},
{
    q: "What is the capital of Thailand?",
    a: [{ text: "Lampang", isCorrect: false, isSelected: false },
    { text: "Phuket", isCorrect: false },
    { text: "Ayutthaya", isCorrect: false },
    { text: "Bangkok", isCorrect: true }
    ]
 
},
{
    q: "What is the capital of Gujarat",
    a: [{ text: "Surat", isCorrect: false },
    { text: "Vadodara", isCorrect: false },
    { text: "Gandhinagar", isCorrect: true },
    { text: "Rajkot", isCorrect: false }
    ]
 
}
 
]);

  const teste = () => {
    let a = "";
    for (let i = 0; i< questions[0].a.length; i+= 1){
        a += questions[0].a[i].text 
    }
    return a
  }

  return (
    <div>
      <div 
      className='container text-center mt-5 pt-5 rounded border border-primary border-2 bg-light'
      style={{height:`600px`}}
      >
        <h1 className='text-dark'>Quiz da Biotecnologia</h1>
        <h3 className='mt-5'>{questions[0].q}</h3>
        <p>{questions[0].a.map((option, index) => (
          <p key={index}>{option.text}</p>
        ))}</p>
      </div>
        
    </div>
  )
}

export default Quiz