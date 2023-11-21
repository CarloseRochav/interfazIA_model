import React from 'react'
import Results from './Results'
import Datatable from './Datatable'

const Dashboard = () => {
    return (
        <div>
            <div className='containerWhole'>

                <h1 className='title'>Predicción  de  grupos</h1>

                {/* <button onClick={() => setCount((count) => count + 1)}>
count is {count}
</button>         */}
                {/* <Results numerosPrimos={numerosPrimos} /> */}
                <Results />

                <div className='text-black module main shadow-lg'>
                    <Datatable />
                </div>
                {/* <div>
<video autoplay muted loop src="./assets/videoBackground.mp4"></video>
</div> */}

            </div>

        </div>
    )
}

export default Dashboard
