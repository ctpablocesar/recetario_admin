import React from 'react'
import Switch from 'rc-switch';
import "rc-switch/assets/index.css";

export const Imagen = ({ handleChangeStatus, handleEdit, handleDelete, onChange, data }) => {

    const { titulo, imagen, id, status } = data;

    return (
        <div className="card col-md-3 imagen-galeria" style={{ width: '18rem' }}>
            <img className="card-img-top mt-3" src={imagen} alt="titulo de la imagen" />
            <div className="card-body">
                <h5 className="text-center card-title">{titulo}</h5>
                <div className="flexd">
                    <div className="centrar divstatus">
                        <span>Status </span>
                        <Switch
                            checked={status}
                            onChange={() => handleChangeStatus(id, status)}
                            onClick={() => handleChangeStatus(id, status)}
                        />
                    </div>
                    <div className="centrar text-center diveliminar" onClick={() => handleDelete(id)}>
                        <span>Eliminar</span>
                        <i className="fas fa-trash-alt eliminar"></i>
                    </div>
                </div>

            </div>
        </div>
    )
}
