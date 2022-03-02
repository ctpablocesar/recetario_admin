import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { startLogout } from '../../actions/auth';
import { images } from '../../Resources/resources';
import '../../styles/administracion.css';

export const Navbar = () => {

    const dispatch = useDispatch();

    const rol = useSelector(state => state.auth.rol);

    const [abrir, setAbrir] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(startLogout());
    }

    return (
        <div className='navbar2'>
            <nav className="mb-1 navbar navbar-expand-lg navbar-dark default-color">
                <div className="text-center logotext">
                    <img src={images.logo} alt="logo" className="navbar-brand logoimg" height="90" />
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-3" aria-controls="navbarSupportedContent-3" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setAbrir(!abrir)}>
                    {
                        !abrir
                            ?
                            <span className="navbar-toggler-icon"></span>
                            :
                            <span className="fas fa-times icono-x"></span>
                    }
                </button>


                <div className=" text-center collapse navbar-collapse" id="navbarSupportedContent-3">
                    <ul className="navbar-nav ml-auto nav-flex-icons">
                        <li className="nav-item">
                            <Link className='btn diseño-active' to='/recetas'>
                                <span className="nav-link">
                                    Recetas
                                </span>
                            </Link>
                            {
                                rol === 'admin'
                                &&
                                <>
                                    <Link className="btn diseño-active" to='/contacto'>
                                        <span className="nav-link waves-effect waves-light logout">
                                            Contacto
                                        </span>
                                    </Link>
                                    <Link className="btn diseño-active" to='/galeria'>
                                        <span className="nav-link waves-effect waves-light logout">
                                            Galeria
                                        </span>
                                    </Link>
                                    <Link className="btn diseño-active" to='/correos'>
                                        <span className="nav-link waves-effect waves-light logout">
                                            Correos
                                        </span>
                                    </Link>
                                </>
                            }
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto nav-flex-icons">
                        <li className="nav-item">
                            <div className="btn diseño-active">
                                <span className="nav-link waves-effect waves-light logout" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}