import React from 'react'
import Switch from 'rc-switch';
import Moment from 'react-moment';
import 'moment/locale/es';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export const Receta = ({ handleChangeStatus, handleEdit, handleDelete, receta: receta }) => {

    const { titulo, descripcion, ingredientes, tiempo, procedimiento, etiquetas, status, fecha, tipo, ocacion, id } = receta;

    const newProcedimiento = procedimiento.length > 30 ? `${procedimiento.slice(0, 30)}` : procedimiento;

    return (
        <div className="card col-sm-5 tarjeta-noticias m-3">
            <div className="row no-gutters">
                {/* <div className="col-sm-5 p-3">
                    <img className="card-img" src={imagen} alt="imagen del anuncio" />
                </div> */}
                <div className="col-sm-12">
                    <div className="card-body">
                        <h5 className="card-title"><strong>{titulo}</strong></h5>
                        <p className="card-text"><strong>Descripcion: </strong>{descripcion}</p>
                        <p className="card-text"><strong>Procedimiento: </strong>{newProcedimiento}
                            {
                                procedimiento.length > 30 &&
                                <a href='#' target="_blank">...ver mas</a>
                            }
                        </p>
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
                <div className="centrar diveditar" onClick={() => handleEdit(receta)}>
                    {/* <span>Editar </span> */}
                    <Link to='/editar'>Editar</Link>
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