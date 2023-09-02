import React from 'react'
import vback from '../assets/videoBackground.mp4'

const Videobackground = () => {
  return (
    <div>
        <video id="background-video" src={vback} autoPlay loop muted/>        
    </div>
  )
}

export default Videobackground