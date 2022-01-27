import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal';

import "rc-switch/assets/index.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusGaleria, resetActiveImage, startDeleteGaleria, startLoadingImages, startSavingImage, startUpload } from '../../../actions/galeria';
import { useForm } from '../../../hooks/useForm';
import { Imagen } from './Imagen';

export const Galeria = () => {

    const dispatch = useDispatch()

    const { saving } = useSelector(state => state.ui)

    const { imagenes, active } = useSelector(state => state.galeria)

    const [vacia, setVacia] = useState(true);

    const [open, setOpen] = useState(false);

    const [titulo, setTitulo] = useState('');

    useEffect(() => {
        dispatch(startLoadingImages())
    }, [saving])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch(resetActiveImage())
    };

    const handleUploadImage = (e) => {
        e.preventDefault()
        document.querySelector('#imageSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setTitulo(e.target.files[0].name)
            dispatch(startUpload(file))
            setVacia(false);
        }
    }

    const handleSaveImage = (e) => {
        e.preventDefault()
        setTimeout(() => {
            dispatch(startSavingImage())
            handleClose()
            setTitulo('')
        }, 2000);
    }

    const handleDelete = (id) => {
        dispatch(startDeleteGaleria(id))
    }

    const handleChangeStatus = (id, status) => {
        dispatch(changeStatusGaleria(id, status))
    }

    return (
        <>
            <input
                type="file"
                name='file'
                id="imageSelector"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div>
                <div className="titulos mb-5">
                    <h1 className="seccion animate__animated animate__bounceInDown">Galería</h1>
                    <button type="button" className="btn btn-success btn-add" onClick={handleOpen}>+ Agregar Imagen</button>
                </div>
                <div>
                    <div className="row d-flex justify-content-center">

                        {
                            !!imagenes[0]
                                ?
                                imagenes.map((data) => (
                                    <Imagen handleChangeStatus={handleChangeStatus} handleDelete={handleDelete} data={data} key={data.id} />
                                ))
                                :
                                <h1 className='sinContenido'>No hay imágenes para mostrar</h1>
                        }
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Agregar imagen</h5>
                                </div>
                                <div className="modal-body">

                                    <form onSubmit={handleSaveImage}>
                                        <div className="form-group">
                                            <label >Imagen de la galería:&nbsp;</label>
                                            {
                                                !!titulo || active.tituloImagen
                                                    ?
                                                    <>
                                                        <button onClick={handleUploadImage} className='btn btn-secondary'>Actualizar imagen</button>

                                                        {
                                                            !!titulo
                                                                ?
                                                                <span><b> {titulo}</b> <i className="fas fa-check-circle"></i></span>
                                                                :
                                                                <span><b> {active.tituloImagen}</b> <i className="fas fa-check-circle"></i></span>
                                                        }
                                                    </>
                                                    :
                                                    <button onClick={handleUploadImage} className='btn btn-secondary'>Agregar imagen</button>

                                            }
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" onClick={handleClose}>Cancelar</button>
                                            {
                                                active.id
                                                    ?
                                                    < button type="submit" className={`btn btn-success`}>Actualizar</button>
                                                    :

                                                    <button type="submit" className={`btn btn-success ${vacia && 'btn-disabled'}`}>Guardar</button>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>

        </>
    )
}
