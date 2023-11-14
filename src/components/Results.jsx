import React from 'react'
import { useState, useEffect } from 'react';
import '../App.css'
import { funciones } from './Functions'
import { useNavigate } from 'react-router-dom';
//para redireccionamiento


//Utilizar modal con react ; instead de "alert"
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

  const navigate = useNavigate()// Metodo para poder hacer redireccion de componentes/paginas 

  //Mostra confirmacion para actulizar documento
  const toggleVisibility = () => {
    setIsOpen(true)
  }

  //Impresion de predicciones+    
  console.log("Predicciones  : " + predicts)//Forma correcta de imprimir los valores de predicciones del objeto 


  //Funcion para manejar respuestas
  const handleClick = async (answer) => {

    if (answer === "Si") {

      funciones.addNewPredicts(predicts)

      setIsOpen(false);
      setShowMessage(true)
      //window.location.href = "/report"
      navigate("/report") //redireccion al componente de "report"

      setTimeout(() => {
        setShowMessage(false);
      }, 5000); // desaparece después de 5 segundos

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
        <button className='glow-on-hover m-2' onClick={async () => setPredicts(await funciones.getData())}>Entrenar</button>
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

        <div className="modal-body w-70 h-25 p-5">

          <h2 className='display-5'>Confirmar que se agregaran las siguientes predicciones :</h2>
          <ul className='list-inline'>
          {predicts.map((value, index) =>
            <li key={index}>
              Semestre {index + 1} : {value}
            </li>
          )}
        </ul>
          
          <h2 className='display-5'> al siguiente periodo ?</h2>

          <button className="btn btn-success m-2" onClick={() => {/*opción Sí*/; handleClick("Si"); }}>Sí</button>
          <button className="btn btn-danger m-2" onClick={() => {/*opción No*/; handleClick("No"); }}>No</button>

        </div>

      </Modal>

    </div>
  )
}

export default Results;