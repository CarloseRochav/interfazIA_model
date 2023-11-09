import React from 'react'
import { useState, useEffect } from 'react';
import '../App.css'
import { funciones } from './Functions'

//Utilizar modal con react 
import Modal from 'react-modal';
Modal.setAppElement('#root');

const Results = (props) => {


  //Uso de States
  const [predicts, setPredicts] = useState([]);//O []
  const [question, setQuestion] = useState({
    text: "¿Desea continuar?",
    answer: ""
  }); //To handle the question to validate the Updating Event  
  const [showMessage, setShowMessage] = useState(false); //Manejar tiempo para mostrar mensaje
  const [isOpen, setIsOpen] = useState(false);

 

  //Mostra confirmacion para actulizar documento
  const toggleVisibility = () => {
    setIsOpen(true)
  }

  //Impresion de predicciones+    
  console.log("Predicciones  : " + predicts)//Forma correcta de imprimir los valores de predicciones del objeto 


  //Funcion para manejar respuestas
  const handleClick = async (answer) => {

    if (answer === "Si") {
      try {

        //Validar que el archivo existe
        if (!predicts) {
          console.log("No existe valor en predicciones")
        }

        console.log("Predicciones a enviar : ", predicts)

        const request = await fetch("http://127.0.0.1:5000/update", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(predicts)

        });

        const response = await request.json()
        // [object Promise]", indicates that you are trying to log a Promise 
        // object to the console instead of the resolved value of the Promise. This is because 
        // Promises are asynchronous and return immediately, before the data is actually  available. 

        console.log("Estatus : " + response.messagge)
        // The error message you are seeing, "[object object]", suggests that you are 
        // trying to log an object to the console without specifying which property or value you want to log.          

      } catch (error) {
        console.error("Validate Error : " + error)
      }
      finally {
        setIsOpen(false);
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false);
        }, 5000); // desaparece después de 5 segundos

      }
    }

    if (answer === "No") {
      setIsOpen(false)
    }

    setQuestion({
      ...question,
      answer
    });
    
  }

  return (
    <div className='Results'>

      <div className="text-black module main">

        <h3>Grupos :</h3>

        {/* Clase de bootstrap para quitar la viñeta */}
        <ul className='list-inline'>
          {predicts.map((value, index) =>
            <li key={index}>
              Semestre {index + 1} : {value}
            </li>
          )}
        </ul>
        {/* Boton para llamar al evento de fetch y desplegar en la lsita*/}
        <button className='glow-on-hover m-2' onClick={async ()=> setPredicts(await funciones.getData())}>Entrenar</button>
        <button className='glow-on-hover m-2' onClick={toggleVisibility}>Agregar</button>
      </div>


      {/* Elemento para mostrar mensaje/aviso */}
      {showMessage && <span className='badge bg-success bg-opacity-25 fs-4'> Documento actualizado!</span>}


      {/* Element to handle the Question to confirm the event to update doc */}

      {/* {visible && <div className='card p-4'>
        <div className='card-body'>{question.text}</div>

        <button className="btn btn-success m-1" onClick={() => handleClick("Si")}>Si</button>
        <button className="btn btn-danger m-1" onClick={() => handleClick("No")}>No</button>
      </div>}
       */}


      {/* Utilizacion de modal como alternativa a "Alert" element */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => { handleClick("No") }}>
        {/* Recomendacion: No pasar directamente la funcion, simo, por un callback */}

        <div className="modal-body w-50 h-25 p-5">

          <h2 className='display-4'>¿Deseas actualizar el documento?</h2>

          <button className="btn btn-success m-2" onClick={() => {/*opción Sí*/; handleClick("Si"); }}>Sí</button>
          <button className="btn btn-danger m-2" onClick={() => {/*opción No*/; handleClick("No"); }}>No</button>

        </div>

      </Modal>

    </div>
  )
}

export default Results;