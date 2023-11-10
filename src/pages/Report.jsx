import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';



const Report = () => {

  const [csvData, setCSVData] = useState([]);
  const [csvHeader, setCSVHeader] = useState([]);
  


  return (
    <div>
      <Container className='container'>
        <h1>Hola mundo</h1>
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
          <div className="row">
            <h2 className='display-3 text-white'>Tabla</h2>

            {/* Tabla */}
            
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
      </Container>

    </div>
  )
}

export default Report
