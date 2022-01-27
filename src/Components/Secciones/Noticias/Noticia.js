import React from 'react'
import Switch from 'rc-switch';
import "rc-switch/assets/index.css";
import Moment from 'react-moment';
import 'moment/locale/es';

export const Noticia = ({ handleChangeStatus, handleEdit, handleDelete, onChange, noticia }) => {

    const { titulo, descripcion, fecha, imagen, id, status, link } = noticia;

    return (
        <div className="card tarjeta-noticias">
            <div className="row p-4">
                <div className="col-md-4">
                    <img src={imagen} className="w-100" alt="imagen de la noticia" />
                </div>
                <div className="col-md-8 px-3">
                    <div className="card-block px-3">
                        <h4 className="card-title">{titulo}</h4>
                        <p className="card-text">{descripcion}</p>
                        <a href={link} target="_blank">{link}</a>
                        <p className="card-text text-right"><small className="text-muted"><Moment fromNow>{fecha}</Moment></small></p>
                    </div>
                </div>
                <div className='col-md-12 edicion'>
                    <div className="centrar divstatus">
                        Status
                        <Switch
                            checked={status}
                            onChange={() => handleChangeStatus(id, status)}
                            onClick={() => handleChangeStatus(id, status)}
                        />
                    </div>
                    <div className="centrar diveditar" onClick={() => handleEdit(noticia)}>
                        Editar
                        <i className="fas fa-edit editar"></i>
                    </div>
                    <div className="centrar diveliminar" onClick={() => handleDelete(id)}>
                        Eliminar
                        <i className="fas fa-trash-alt eliminar"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
