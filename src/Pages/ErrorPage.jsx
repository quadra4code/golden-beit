import React from 'react';
import { Link } from 'react-router-dom';
const ErrorPage = () => {
  return (
    <main className='error'>
      <div className='container'>
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to='/' className='return-home'>GO BACK HOME</Link>
      </div>
    </main>
  )
}

export default ErrorPage