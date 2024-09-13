import React from 'react'
import {Link} from 'react-router-dom'
import "./HomeStyle.css"

export default function Home() {
  return (<>
  <h4>
    <span className='word'>Welcome </span>
    <span className='word'>to</span>
    <span className='word'>MyApp</span>
     
  </h4>

    <div className='intro'>
      
      <h6>
          <span className="word">your</span>
          <span className="word">life</span>
          <span className="word">Simplify </span>
          <span className="word">and</span>
          <span className="word">stay</span>
          <span className="word">organized</span>
          <span className="word">with</span>
          <span className="word">our</span>
          <span className="word">intuitive</span>
          <span className="word">to-do</span>
          <span className="word">list</span>
          <span className="word"> app.</span>
          <span className="word">Whether</span>
          <span className="word">you’re</span>
          <span className="word">managing</span>
          <span className="word">daily</span>
          <span className="word">tasks,</span>
          <span className="word">planning</span>
          <span className="word">a project,</span>
          <span className="word">or just</span>
          <span className="word">trying</span>
          <span className="word">to keep</span>
          <span className="word">track</span>
          <span className="word">of everything,</span>
          <span className="word">MyApp</span>
          <span className="word">is</span>
          <span className="word">here</span>
          <span className="word">to help.</span>
          <span className="word">Stay</span>
          <span className="word">focused,</span>
          <span className="word">reduce</span>
          <span className="word">stress,</span>
          <span className="word">and accomplish</span>
          <span className="word">more</span>
          <span className='word'>every</span>
          <span className='word' >day.</span>
        </h6>

        <button className='start'><Link to="/Login">Start Now !</Link> </button>

    </div>
    </>
  );
}
