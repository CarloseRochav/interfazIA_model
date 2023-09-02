import { useState } from 'react'
import './App.css'
//import { results } from './components/results'
import 'bootstrap/dist/css/bootstrap.min.css';
import Results from './components/Results'
import Datatable from './components/Datatable'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Videobackground from './components/Videobackground';


function App() {

  const numerosPrimos = [2, 4, 6, 8, 10]

  return (
    <>

      <Videobackground/>      

      <h1 className='title'>Prediccion  de  grupos</h1>

      <div className="text-black module main">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>         */}
        <Results numerosPrimos={numerosPrimos} />
      </div>
      <div className='text-black module main'>
        <Datatable />
      </div>
      {/* <div>
        <video autoplay muted loop src="./assets/videoBackground.mp4"></video>
      </div> */}

    </>
  )
}

export default App
