import React from 'react';
import { Link } from 'react-router-dom';

export const Error = () => {
  return <div className='error_404'>
    <center>
      <strong>
        <h1>Error 404</h1>
      </strong>
      <h2>Pagina no encontrada</h2>
      <i className="fas fa-times"></i>
      <br />
      <div className="nav-item">
        <Link className='btn diseño-active' to='/recetas'>
          <span className="nav-link btn-error">
            Volver a recetas
          </span>
        </Link>
      </div>
    </center>
  </div>;
};
