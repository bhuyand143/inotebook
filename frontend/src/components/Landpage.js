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
            <Link to="/home" class="btn btn-lg btn-secondary bg-white">Start</Link>
          </main>
        </div>
        <footer class="mt-auto text-white-50">
          <p>&copy;2023</p>
        </footer>
      </div>
    </div>
  )
}

export default Landpage