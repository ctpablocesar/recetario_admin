import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { enviarTodos, enviarVarios, getCorreos } from '../../../actions/correos';
import { Mails } from './Mails'

export const Correos = () => {

    const dispatch = useDispatch();

    const correos = useSelector(state => state.correos.active);

    const checking = useSelector(state => state.ui.checking);

    const [modo, setModo] = useState(true);

    const [usuraios, setUsuraios] = useState('');

    const [correo, setCorreo] = useState(0);

    useEffect(() => {
        dispatch(getCorreos());
    }, [])

    // useEffect(() => {

    // }, [usuraios])

    useEffect(() => {
        setUsuraios('');
        correos.map((item) => {
            if (item.status) {
                setUsuraios(usuraios + item.correo + ', ');
            }
        })
    }, [checking])


    const setTodos = () => {
        setModo(false);
        setUsuraios('Todos');
    }

    const setVarios = () => {
        setModo(true);
        setUsuraios('');
        dispatch(getCorreos());
    }

    const enviarCorreo = (e) => {
        e.preventDefault();
        const asunto = e.target.asunto.value;
        const mensaje = e.target.mensaje.value;
        if (modo) {
            dispatch(enviarVarios(asunto, mensaje));
        }else{
            dispatch(enviarTodos(asunto, mensaje));
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <center>
                            <button
                                className="btn diseño-active text-light"
                                onClick={() => setVarios()}
                            >Seleccionar usuarios</button>
                            <button
                                className="btn diseño-active text-light"
                                onClick={() => setTodos()}
                            >Todos</button>
                        </center>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        {
                            modo
                            &&
                            <Mails correos={correos} setVarios={setUsuraios} usuraios={usuraios} />
                        }
                    </div>
                    <div className={`${modo ? 'col-md-8' : 'col-md-12'}`}>
                        <form onSubmit={enviarCorreo}>
                            <div className="form-group">
                                {/* <label>Enviar a: </label> */}
                                <span>Enviar a: </span>
                                <span>
                                    {
                                        modo
                                            ?
                                            correos.map((item) => {
                                                if (item.status) {
                                                    return (
                                                             item.correo + ', ' 
                                                    )
                                                }
                                            })
                                            :
                                            'Todos'
                                    }
                                </span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Asunto:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="asunto"
                                    name="asunto"
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Mensaje:</label>
                                <textarea
                                    className="form-control disabled"
                                    id="exampleFormControlTextarea1"
                                    id="mensaje"
                                    name="mensaje"
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <center>
                                    <input
                                        className="btn btn-success text-light"
                                        type="submit"
                                        value="Enviar"
                                    />
                                </center>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
