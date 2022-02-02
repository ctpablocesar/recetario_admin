import React, { useEffect, useState } from 'react'

import { Receta } from './Receta'
import "rc-switch/assets/index.css";
import '../../../styles/administracion.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusReceta, startDeleteReceta, startLoadingRecetas, startSaveReceta, startSetRecetaActive, startUplaodReceta } from '../../../actions/recetas';
import { Link } from 'react-router-dom';

export const Recetas = () => {

    const dispatch = useDispatch();

    const { saving } = useSelector(state => state.ui);

    const { recetas, active } = useSelector(state => state.recetas)

    useEffect(() => {
        dispatch(startLoadingRecetas())
    }, [saving]);

    const handleDelete = (id,uid) => {
        dispatch(startDeleteReceta(id,uid))
    }

    const handleEdit = (receta) => {
        dispatch(startSetRecetaActive(receta));
    }

    const handleChangeStatus = (id, status, uid) => {
        dispatch(changeStatusReceta(id, status, uid))
        dispatch(startLoadingRecetas())
    }

    return (
        <>
            <div>
                <div className="titulos">
                    <h1 className="seccion animate__animated animate__bounceInDown">Mis Recetas</h1>
                    {/* <button type="button" className="btn btn-success btn-add" onClick={handleOpen}>+ Agregar Anuncio</button> */}
                    <Link className="btn btn-success btn-add" to='/agregar'>+ Agregar receta</Link>
                </div>
                <div className=" cards-responsivas w-100 row justify-content-md-center">

                    {
                        !!recetas[0]
                            ?
                            recetas.map((receta) => (
                                <Receta handleChangeStatus={handleChangeStatus} handleDelete={handleDelete} handleEdit={handleEdit} receta={receta} key={receta.id} />
                            ))
                            :
                            <h1 className='sinContenido'>No hay recetas para mostrar</h1>
                    }

                </div>
            </div>

        </>
    )
}
