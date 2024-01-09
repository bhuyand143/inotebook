import React from 'react'
import { Link } from 'react-router-dom'

const Landpage = () => {
  return (
    <div style={{"margin":"-3.2rem"}} className='d-flex  text-center text-white bg-dark' id="outer">
      <div class="cover-container d-flex w-100 h-100  mx-auto flex-column ">
        <div className='mt-auto'>
          <main class="px-3">
            <h1>iNotebook!</h1>
            <p>Making notekeeping easy!</p>
            <Link to="/home" class="btn btn-lg btn-secondary ">Start</Link>
          </main>
        </div>
        <footer class="mt-auto ">
          <a href="https://www.github.com/bhuyand143/" target='_blank'>&copy;Dibyajyoti Bhuyan</a>
        </footer>
      </div>
    </div>
  )
}

export default Landpage