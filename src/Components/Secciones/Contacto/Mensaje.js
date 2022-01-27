
import React from 'react'
import Moment from 'react-moment';
import 'moment/locale/es';

export const Mensaje = ({handleDelete, mensaje}) => {

    const { nombre, asunto, mensaje: message, fecha, id, telefono, correo = '' } = mensaje;

    return (
        <div className="col-md-3 card mb-3 imagen-galeria card-contacto" style={{ maxWidth: '18rem' }}>
            <div className="card-header font-weight-bold text-uppercase">{nombre}</div>
            <div className="card-body">
                <h5 className="card-title text-success font-weight-bold">ASUNTO</h5>
                <p>{asunto}</p>
                <div className="card-text">
                    <label className="font-weight-bold">Mensaje:</label>
                    <p className="text-justify">{message}</p>
                    <div className="contacto">
                        <hr />
                        <h5 className="card-title text-success font-weight-bold">CONTACTO</h5>
                        <label className="font-weight-bold">Teléfono:</label>
                        <p>{telefono}</p>
                        <label className="font-weight-bold">Correo electrónico:</label>
                        <p>{correo}</p>
                    </div>
                    <p className="card-text text-right"><small className="text-muted"> <Moment fromNow>{fecha}</Moment></small></p>
                </div>
                <hr />
                <div className="centrar text-center diveliminar" onClick={() => handleDelete(id)}>
                    <span>Eliminar</span>
                    <i className="fas fa-trash-alt eliminar"></i>
                </div>
            </div>
        </div>
    )
}
