import React, { useState } from 'react';
import { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
//const MY_FILE_PATH = "my-file.js";
//const MY_FILE_PATH = "C:\Users\carloserochav\Documents\Residencia\Backend\ia_modelForestRegression\apiRest\recibidos\tableClaude.csv";
//const file = MY_FILE_PATH
// process.env.set(MY_FILE_PATH, require.resolve(MY_FILE_PATH));
import { funciones } from '../components/Functions';




const Report = () => {

  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [statistics, setStatistics] = useState({
    mean: null,
    median: null,
    mode: null
  });


  async function fetchData() {
    const parsed = await funciones.getFile();
    setData(parsed.data);
    setHeaders(parsed.meta.fields);
  }


  async function fetchStatistics() {
    const response = await fetch('http://127.0.0.1:5000/statistics');
    const data = await response.json();
    
    setStatistics({
      mean: data.mean,
      median: data.median,
      mode: data.mode
    })    
  }

  //Importancion de archivo a mostrar en tabla
  useEffect(() => {
    fetchData()
    fetchStatistics()    
  }, [location]);


  const columnLengths = headers.map((header) => {
    const values = data.map((row) => row[header]);
    const uniqueValues = [...new Set(values)];
    return { header, length: uniqueValues.length, values: uniqueValues };
  });

  return (
    <div>
      <Container className='container text-white'>
        <h1 className='display-1 color-white mb-5' >Reporte</h1>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h3 className='display-7 text-white'>Promedio</h3>
              <ul className='list-inline'>
                {/* {statistics.mean} */}
                {statistics.mean.map((value, index) =>
                  <li key={index}>
                    Semestre {index + 1} : {value}
                  </li>
                )}
              </ul>
            </div>
            <div className="col-sm">
              <h3 className='display-7 text-white'>Mediana</h3>
              <ul className='list-inline'>
                {/* {statistics.mean} */}
                {statistics.median.map((value, index) =>
                  <li key={index}>
                    Semestre {index + 1} : {value}
                  </li>
                )}
              </ul>
            </div>
            <div className="col-sm">
              <h3 className='display-7 text-white'>Moda</h3>
              <ul className='list-inline'>
                {/* {statistics.mean} */}
                {statistics.mode.map((value, index) =>
                  <li key={index}>
                    Semestre {index + 1} : {value}
                  </li>
                )}
              </ul>
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
