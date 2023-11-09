//import React from 'react'
//import Papa from "papaparse"
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { funciones } from "./Functions";

const Datatable = () => {

  const [csvData, setCSVData] = useState([]);
  const [csvHeader, setCSVHeader] = useState([]);
  const [fileUpload, setFileUpload] = useState(null)//Estado para almacenar el archivo recibido
  //Hooks can only be called inside of the body of a function component. 
  //Visit https://react.dev/warnings/invalid-hook-call-warning for more info about Hooks

  const handleSubmit = async (e) => {
    await funciones.uploadFile(fileUpload)
  }

  //Capturar informacion cuando se detecta un comportamiento diferente, change ; Diferente del evento enviar
  const handleFileChange = async (e) => {
    await setFileUpload(e.target.files[0]);

    //const file = e.target.files[0]


    //Errores en la desestructuración
    const {data,meta,errors} = await funciones.castFile(fileUpload)
    const result = await funciones.castFile(fileUpload)
    console.log("Resultados Getting : "+result)
    await setCSVData(data);
    await setCSVHeader(meta.fields);

    //__Cortado Paaparse

    
  }


  return (
    <div>
      <h3>DataSet</h3>
      
      <div className="mb-3">
        <form onSubmit={handleSubmit}>
          <input className="form-control" type="file" onChange={handleFileChange} />
          <button className="btn btn-outline-secondar m-2" type="submit">Enviar</button>
        </form>
      </div>

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