import React, { useState } from 'react';
import { images } from '../../Resources/resources';
import '../../styles/administracion.css';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

    const dispatch = useDispatch();

    const [abrir, setAbrir] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(startLogout());
    }

    return (
        <div className='navbar2'>
            <nav className="mb-1 navbar navbar-expand-lg navbar-dark default-color">
                <div className="text-center logotext">
                    <img src={images.logo} alt="logo" className="navbar-brand logoimg" height="90" /><br />Panel de administración
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
                    <div className="text-center alinearlinks">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Secciones
                                </span>
                                <div className="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-3">
                                    <Link className="dropdown-item waves-effect waves-light" to='/admin/anuncios'>Anuncios</Link>
                                    <Link className="dropdown-item waves-effect waves-light" to='/admin/calendario'>Calendario Escolar</Link>
                                    <Link className="dropdown-item waves-effect waves-light" to='/admin/frase'>Frase Inicio</Link>
                                    <Link className="dropdown-item waves-effect waves-light" to='/admin/galeria'>Galería</Link>
                                    <Link className="dropdown-item waves-effect waves-light" to='/admin/noticias'>Noticias</Link>
                                    <Link className="dropdown-item waves-effect waves-light" to='/admin/contacto'>Contacto</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav ml-auto nav-flex-icons">
                        <li className="nav-item">
                            <span className="nav-link waves-effect waves-light logout" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                            </span>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}