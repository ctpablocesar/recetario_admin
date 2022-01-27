import React from 'react'
import Switch from 'rc-switch';
import Moment from 'react-moment';
import 'moment/locale/es';


export const Anuncio = ({ handleChangeStatus, handleEdit, handleDelete, anuncio }) => {

    const { titulo, descripcion, imagen, fecha, id, status, link } = anuncio;

    return (
        <div className="card col-sm-5 tarjeta-noticias m-3">
            <div className="row no-gutters">
                <div className="col-sm-5 p-3">
                    <img className="card-img" src={imagen} alt="imagen del anuncio" />
                </div>
                <div className="col-sm-7">
                    <div className="card-body">
                        <h5 className="card-title"><strong>{titulo}</strong></h5>
                        <p className="card-text">{descripcion}</p>
                        <a href={link} target="_blank">{link}</a>
                        <p className="card-text text-right"><small className="text-muted"> <Moment fromNow>{fecha}</Moment></small></p>
                    </div>
                </div>
            </div>
            <div className='edicion'>
                <div className="centrar divstatus">
                    <span>Status </span>
                    <Switch
                        checked={status}
                        onChange={() => handleChangeStatus(id, status)}
                        onClick={() => handleChangeStatus(id, status)}
                    />
                </div>
                <div className="centrar diveditar" onClick={() => handleEdit(anuncio)}>
                    <span>Editar </span>
                    <i className="fas fa-edit editar"></i>
                </div>
                <div className="centrar diveliminar" onClick={() => handleDelete(id)}>
                    <span>Eliminar </span>
                    <i className="fas fa-trash-alt eliminar"></i>
                </div>
            </div>
        </div>
    )
}