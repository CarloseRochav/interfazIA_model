import React from 'react'
import { useState, useEffect } from 'react';
import '../App.css'

const Results = (props) => {

  //const numerosPrimos = [2,4,6,8,10];
  //console.log(props.numerosPrimos)    


  const [predicts, setPredicts] = useState([null]);//O []


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


  //Request to send data to Update
  const updateData = async () => {
    try {
      
      //Validar que el archivo existe
      if (!predicts) {
        console.log("No existe valor en predicciones")
      }
      
      console.log("Predicciones a enviar : ",predicts)

      const response = await fetch("http://127.0.0.1:5000/update", {
        method: 'POST',        
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(predicts)
        
        
      });

      messagge = response.messagge;

      console.log("Estatus : " + messagge)      

    } catch (error) {
      console.error("Validate Error : " + error)
    } 
    // finally {
    //   console.log("Actualizacion correcta")
    // }
  };

  //Solo necesaria cuando se debe desplegar en pantalla sin ningun evento
  // useEffect(() => {
  //   getPredictions();
  // }, []);

  //Impresion de predicciones+    
  console.log("Predicciones  : " + predicts)//Forma correcta de imprimir los valores de predicciones del objeto


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
        <button className='glow-on-hover m-2' onClick={() => updateData()}>Agregar</button>
      </div>
    </div>
  )
}

export default Results;