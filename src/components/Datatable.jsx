//import React from 'react'
import Papa from "papaparse"
import React, { useState } from 'react';
import { readString } from 'react-papaparse';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';




const Datatable = () => {

  const [csvData, setCSVData] = useState([]);
  const [csvHeader, setCSVHeader] = useState([]);
  const [fileUpload, setFileUpload] = useState(null)//Estado para almacenar el archivo recibido
  //Hooks can only be called inside of the body of a function component. 
  //Visit https://react.dev/warnings/invalid-hook-call-warning for more info about Hooks


  const handleSubmit = async (e) => {

    try {


      //Validar que el archivo existe
      if (!fileUpload) {
        console.log("No se encontro ningun archivo")
      }

      //Upload file to endpoint POST Method   

      //   //Object necessery to load file
      const formData = new FormData();
      formData.append("file", fileUpload);


      const response = fetch('http://127.0.0.1:5000/upload', {
        method: "POST",
        body: formData
      });


      return console.log("Respuesta : " + response.json())
      //   //Al setear el estado, accede directamente a la propiedad predictions en lugar de todo el objeto data:
      //   // ;; Recomendacion
      //setPredicts(data.predicciones)
    } catch (error) {
      console.log("Error al procesar request : " + error);
    } finally {
      console.log('Proceso terminado');
    }

    //Aqui hace el proceso para mostrarlo con el render en la tabla   


  }




  //Capturar informacion cuando se detecta un comportamiento diferente, change ; Diferente del evento enviar
  const handleFileChange = (e) => {
    setFileUpload(e.target.files[0]);

    const file = e.target.files[0]


    //Este proceso que sigue es necesario ya que no recibe el archivo con un formato adecuado para su lectura
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;

      Papa.parse(text, {

        header: true,
        // Esta opción permite que 'papaparse' intente automáticamente convertir los valores 
        // analizados a los tipos de datos apropiados (números, fechas, booleanos, etc.). Esto puede ser especialmente útil si tienes campos numéricos en tu archivo CSV.
        dynamicTyping: true,
        // Esta opción le indica a 'papaparse' que ignore las líneas vacías en el archivo CSV durante 
        //el proceso de análisis. Esto puede ser útil para evitar errores o problemas al analizar filas vacías.
        skipEmptyLines: true,
        complete: (result) => {
          const { data, meta, errors } = result;

          if (errors.length === 0) {
            setCSVData(data);
            setCSVHeader(meta.fields);
          } else {
            console.error('Error parsing CSV:', errors);
          }
        },

      });
    }

    reader.readAsText(file);

  }


  return (
    <div>
      <h3>DataSet</h3>

      {/* <input type="file" accept=".csv" onChange={handleFileChange} /> */}
      {/* Form.Group : Dentro de estos componentes se carga el archivo a mostrar */}
      {/* <Form.Group controlId="formFile" className="mb-3">
        <Form.Label><span className="gradient-text">Cargar Archivo</span></Form.Label>
        <Form.Control type="file" accept=".csv" onChange={handleFileChange} className="bg-dark text-white " />
      </Form.Group> */}


      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Enviar</button>
      </form>

      <div className="csv-table-container container-fluid">
        {csvData.length > 0 && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                {csvHeader.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {csvHeader.map((header) => (
                    <td key={header}>{row[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  )
}

export default Datatable;