import React from 'react'
import { useState, useEffect } from 'react';
import '../App.css'

const Results = (props) => {

  //const numerosPrimos = [2,4,6,8,10];
  //console.log(props.numerosPrimos)    


  const [predicts, setPredicts] = useState([null]);//O []
  const [question, setQuestion] = useState({
    text: "¿Desea continuar?",
    answer: ""
  }); //To handle the question to validate the Updating Event
  const [visible, setVisible] = useState(false);  //Manejar visibilidad 
  const [showMessage, setShowMessage] = useState(false); //Manejar tiempo para mostrar mensaje


  //Request para obtener las predicciones
  const getPredictions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/train');
      const data = await response.json();
      //Al setear el estado, accede directamente a la propiedad predictions en lugar de todo el objeto data:
      // ;; Recomendacion
      setPredicts(data.predicciones)
    } catch (error) {
      console.error("Frontent dice  : " + error);
    } finally {
      console.log('Proceso terminado');
    }
  };


  
      //Mostra confirmacion para actulizar documento
    const toggleVisibility = () => {
      setVisible(true);
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
  
        // if (confirm("¿ Seguro que deseas agregar nuevos valores ? ")) //Validacion ; Confirmacion de actualizar datos
        // {
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
         setVisible(false)
         setShowMessage(true)
       }
    }

    if (answer === "No") {
      setVisible(false);
    }

    setQuestion({
      ...question,
      answer
    });
  }


  useEffect(() => {
    // código a ejecutar

    setShowMessage(true);
    
    setTimeout(() => {
      setShowMessage(false);  
    }, 3000); // desaparece después de 5 segundos
    
  }, []);


  return (
    <div className='Results'>

      <div className="text-black module main">

        <h3>Grupos :</h3>

        {/* Clase de bootstrap para quitar la viñeta */}
        <ul className='list-inline'>
          {predicts.map((value, index) =>
            <li>
              Semestre {index + 1} : {value}
            </li>
          )}
        </ul>
        {/* Boton para llamar al evento de fetch y desplegar en la lsita*/}
        <button className='glow-on-hover m-2' onClick={() => getPredictions()}>Entrenar</button>
        <button className='glow-on-hover m-2' onClick={toggleVisibility}>Agregar</button>
      </div>

        
      {/* Elemento para mostrar mensaje/aviso */}
      {showMessage && <span className='badge bg-success bg-opacity-25 fs-4'> Documento actualizado!</span>}


      {/* Element to handle the Question to confirm the event to update doc */}

      {visible && <div className='card p-4'>
        <div className='card-body'>{question.text}</div>

        <button className="btn btn-success m-1" onClick={() => handleClick("Si")}>Si</button>
        <button className="btn btn-danger m-1" onClick={() => handleClick("No")}>No</button>
      </div>}


    </div>
  )
}

export default Results;