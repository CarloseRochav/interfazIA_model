import React from 'react'
import { useState, useEffect } from 'react';

const Results = (props) => {

    //const numerosPrimos = [2,4,6,8,10];
    //console.log(props.numerosPrimos)    

    
    const [predicts, setPredicts] = useState([]);//O []


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
    
    //Solo necesaria cuando se debe desplegar en pantalla sin ningun evento
    // useEffect(() => {
    //   getPredictions();
    // }, []);

    //Impresion de predicciones+    
    console.log("Predicciones  : " + predicts)//Forma correcta de imprimir los valores de predicciones del objeto
  

  return (
    <div>
    <h3>Resultados :</h3>

        {/* Clase de bootstrap para quitar la viñeta */}
        <ul className='list-inline'> 
        {predicts.map((value,index)=>
            <li>
                Semestre {index+1} : {value}
            </li>
        )}
        </ul>
        {/* Boton para llamar al evento de fetch y desplegar en la lsita*/}
        <button className='glow-on-hover' onClick={()=>getPredictions()}>Entrenar</button>
            
    </div>
  )
}

export default Results;