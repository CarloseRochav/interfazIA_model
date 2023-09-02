//import React from 'react'
import Papa from "papaparse"
import React, { useState } from 'react';
import { readString } from 'react-papaparse';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';


const Datatable = () => {

  const [csvData, setCSVData] = useState([]);
  const [csvHeader, setCSVHeader] = useState([]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const text = await file.text();

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


  };


  return (
    <div>
      <h3>DataSet</h3>

      {/* <input type="file" accept=".csv" onChange={handleFileChange} /> */}
      {/* Form.Group : Dentro de estos componentes se carga el archivo a mostrar */}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label><span className="gradient-text">Cargar Archivo</span></Form.Label>
        <Form.Control type="file" accept=".csv" onChange={handleFileChange} className="bg-dark text-white " />
      </Form.Group>

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