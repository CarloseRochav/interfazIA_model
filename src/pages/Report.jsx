import React, { useState } from 'react';
import { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
//const MY_FILE_PATH = "my-file.js";
//const MY_FILE_PATH = "C:\Users\carloserochav\Documents\Residencia\Backend\ia_modelForestRegression\apiRest\recibidos\tableClaude.csv";
//const file = MY_FILE_PATH
// process.env.set(MY_FILE_PATH, require.resolve(MY_FILE_PATH));
import Papa from "papaparse"




const Report = () => {

  // const [csvData, setCSVData] = useState([]);
  // const [csvHeader, setCSVHeader] = useState([]);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);


  //Importancion de archivo a mostrar en tabla

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:5000/uploads/tableClaude.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      const parsed = Papa.parse(csv, { header: true });
      setData(parsed.data);
      setHeaders(parsed.meta.fields);
    }

    fetchData();
  }, [location]);


  const columnLengths = headers.map((header) => {
    const values = data.map((row) => row[header]);
    const uniqueValues = [...new Set(values)];
    return { header, length: uniqueValues.length, values: uniqueValues };
  });


  return (
    <div>
      <Container className='container text-white'>
        <h1 className='display-1 color-white'>Reporte</h1>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              One of three columns
            </div>
            <div className="col-sm">
              One of three columns
            </div>
            <div className="col-sm">
              One of three columns
            </div>
          </div>
          <div className="row mt-5">
            
            
            <h2 className='display-3 text-white'>Tabla</h2>
            <div className="table-responsive table-responsive-sm table-responsive-md">
              {/* Con esta clase de bootstrap hacemos que no rebase la anchura de la pagina */}

              {/* Tabla */}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      {headers.map((header) => (
                        <td key={header}>{row[header]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

          </div>
        </div>
      </Container>

    </div>
  )
}

export default Report
