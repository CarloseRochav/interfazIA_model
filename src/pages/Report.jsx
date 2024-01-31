import React, { useState } from 'react';
import { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { funciones } from '../components/Functions';
import ReactImageMagnify from 'react-image-magnify';
//Utilizar modal con react ; instead de "alert"
import Modal from 'react-modal';


Modal.setAppElement('#root');


const Report = () => {

  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [statistics, setStatistics] = useState({});
  //State para Modal
  const [isOpen, setIsOpen] = useState(false);

   //Mostra confirmacion para actulizar documento
   const toggleVisibility = () => {
    setIsOpen(true)
  }

  //Funcion para manejar respuestas
  const handleClick = async (answer) => {

    if (answer === "Si") {      

      setIsOpen(false);
      setShowMessage(true)
      //window.location.href = "/report"
      //navigate("/report") //redireccion al componente de "report"

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



  async function fetchData() {
    const parsed = await funciones.getFile();
    setData(parsed.data);
    setHeaders(parsed.meta.fields);
  }


  // async function fetchStatistics() {
  //   const response = await fetch('http://127.0.0.1:5000/statistics');
  //   const data = await response.json();

  //   await setStatistics(data)    
  //   console.log("Esta es la data "+ JSON.stringify(data))
  //   console.log(" Mean "+data.mean)  
  // }


  //Importancia de useEffect para renderizar en vivo/tiempo real la informacion que se solicitu al api
  useEffect(() => {
    fetchData()
    // const fetchStats = async () => {
    //   const response = await fetch('http://127.0.0.1:5000/statistics');
    //   const data = await response.json();
    //   setStatistics(data);
    // }
    // fetchStats();
  }, []);

  // const columnLengths = headers.map((header) => {
  //   const values = data.map((row) => row[header]);
  //   const uniqueValues = [...new Set(values)];
  //   return { header, length: uniqueValues.length, values: uniqueValues };
  // });

  return (
    <div>
      <Container className='container'>
        <h1 className='display-1 mb-5' >Reporte</h1>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h3 className='display-7'>Promedio</h3>
              <ul className='list-inline'>
                {/* {statistics.mean} */}
                {statistics.mean && statistics.mean.map((value, index) =>
                  <li key={index} className='text-weight-bold'>
                    Semestre {index + 1} : {value}
                  </li>
                )}
              </ul>
            </div>
            <div className="col-sm">
              <h3 className='display-7'>Mediana</h3>
              <ul className='list-inline'>

                {statistics.median && statistics.median.map((value, index) =>
                  <li key={index}>
                    Semestre {index + 1} : {value}
                  </li>
                )}
              </ul>
            </div>
            <div className="col-sm">
              <h3 className='display-7'>Moda</h3>
              <ul className='list-inline'>
                {/* {statistics.mean} */}
                {statistics.mode && statistics.mode.map((value, index) =>
                  <li key={index}>
                    Semestre {index + 1} : {value}
                  </li>
                )}
              </ul>
            </div>
          </div>
          {/* Graficas de todos los semestres */}
          {/* Otra alternativa al Grid, en lugar de row y col, usar las clases de Flexbox de Bootstrap:flexbox
          Con .d-flex makes que los elementos internos se muestren uno al lado del otro.
          De esta manera no usamos las columnas de grid, sino flexbox puro. */}
          <div className="d-flex">
            <div>
              <h3>1er Semestre</h3>
              <img src="http://127.0.0.1:5000/stats/first" style={{ maxWidth: "80%" }} />
              
            </div>
            <div>
              <h3>2do Semestre</h3>
              <img src="http://127.0.0.1:5000/stats/second" style={{ maxWidth: "80%" }} />              
              
            </div>
            <div>
              <h3>3er Semestre</h3>
              <img src="http://127.0.0.1:5000/stats/third" style={{ maxWidth: "80%" }} />             
              
            </div>
          </div>
          <div className="d-flex">
            <div>
              <h3>4to Semestre</h3>
              <img src="http://127.0.0.1:5000/stats/fourth" style={{ maxWidth: "80%" }} />
            </div>
            <div>
              <h3>5to Semestre</h3>
              <img src="http://127.0.0.1:5000/stats/fifth" style={{ maxWidth: "80%" }} />
            </div>
            <div>
              <h3>6to Semestre</h3>
              <img src="http://127.0.0.1:5000/stats/sixth" style={{ maxWidth: "80%" }} />
            </div>
          </div>
          <div className="d-flex">
            <div>
              <h3>7mo Semestre</h3>
              <img src="http://127.0.0.1:5000/stats/seventh" style={{ maxWidth: "80%" }} />
            </div>
            <div>
              <h3>8vo Semestre</h3>
              <img src="http://127.0.0.1:5000/stats/eighth" style={{ maxWidth: "80%" }} />
            </div>
            <div>
              <h3>9no Semestre</h3>
              <img src="http://127.0.0.1:5000/stats/ninth" style={{ maxWidth: "80%" }} />
            </div>
          </div>

          <div className="row mt-5">
            <h2 className='display-3'>Tabla</h2>
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
          <button className=' m-2' onClick={toggleVisibility}>Guardar reporte</button>
        </div>

        {/* Utilizacion de modal como alternativa a "Alert" element */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => { handleClick("No") }}>
        {/* Recomendacion: No pasar directamente la funcion, simo, por un callback */}

        <div className="modal-body w-70 h-25 p-5">

          <h2 className='display-5'>Confirmar que se agregaran las siguientes predicciones :</h2>
          <ul className='list-inline'>
          {/* {predicts.map((value, index) =>
            <li key={index}>
              Semestre {index + 1} : {value}
            </li>
          )} */}
        </ul>
          
          <h2 className='display-5'> al siguiente periodo ?</h2>

          <a className="btn btn-success" href='http://127.0.0.1:5000/save_report' download onClick={()=>{handleClick("Si")}}>Si</a>
          <button className="btn btn-danger m-2" onClick={() => {/*opción No*/; handleClick("No"); }}>No</button>          

        </div>

      </Modal>


      </Container>            
    </div>
  )
}

export default Report
