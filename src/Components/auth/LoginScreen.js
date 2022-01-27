import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogin } from '../../actions/auth'

import '../../styles/administracion.css'
import '../../styles/dasboard.css'
import { images } from '../../Resources/resources'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(email, password));
    }

    return (
        <>
            <div className="page-bg" style={{ backgroundImage: `url(${images.entrada})` }}></div>
            <div className='container-login'>
                <div className='form-login'>
                    <div className="titulos-login">
                        <span>Administración</span>
                        <i></i>
                        <p>Portal EST 19</p>
                    </div>
                    <div className="datos-login">
                        <form
                            className="datos-form-login"
                            onSubmit={handleLogin}
                        >
                            <div className='titulo-datos-login'>
                                <p>Iniciar Sesión</p>
                            </div>
                            <label>Correo Electrónico:</label>
                            <input
                                type="text"
                                name="email"
                                className="inputs-login"
                                autoComplete="off"
                                value={email}
                                onChange={handleInputChange}
                            />
                            <label>Contraseña:</label>
                            <input
                                type="password"
                                name="password"
                                className="inputs-login"
                                value={password}
                                onChange={handleInputChange}
                            />
                            <input type="submit" value="Ingresar" className='btn-login m-4' />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}