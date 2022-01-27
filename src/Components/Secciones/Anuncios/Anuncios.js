import React, { useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal';

import { Anuncio } from './Anuncio'
import "rc-switch/assets/index.css";
import '../../../styles/administracion.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusAnuncio, resetAnuncios, startDeleteAnuncio, startLoadingAnuncios, startSaveAnuncio, startSetAnuncioActive, startUplaodAnuncio, startUpload } from '../../../actions/anuncios';
import { useForm } from '../../../hooks/useForm';

export const Anuncios = () => {

    const dispatch = useDispatch();

    const { saving } = useSelector(state => state.ui);

    const { anuncios, active } = useSelector(state => state.anuncios)

    const [open, setOpen] = useState(false);

    const [titulo, setTitulo] = useState('');

    const [vacia, setVacia] = useState(true);

    const [value, handleInputChange, reset, setValue] = useForm({ titulo: '', descripcion: '', link: '' });

    useEffect(() => {
        dispatch(startLoadingAnuncios())
    }, [saving]);

    useEffect(() => {
        active.imagen && setValue({ titulo: active.titulo, descripcion: active.descripcion, link: active.link })
    }, [active])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset()
        dispatch(resetAnuncios())
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

    const handleSaveAnuncio = (e) => {
        e.preventDefault()
        const titulo = e.target.titulo.value;
        const desc = e.target.descripcion.value;
        const link = e.target.link.value;
        if (active.id) {
            setTimeout(() => {
                dispatch(startUplaodAnuncio(titulo, desc, link))
                handleClose()
                setTitulo('')
            }, 2000);
        } else {
            setTimeout(() => {
                dispatch(startSaveAnuncio(titulo, desc, link))
                handleClose()
                setTitulo('')
            }, 2000);
        }
    }

    const handleDelete = (id) => {
        dispatch(startDeleteAnuncio(id))
    }

    const handleEdit = (anuncio) => {
        dispatch(startSetAnuncioActive(anuncio));
        setOpen(true)
    }

    const handleChangeStatus = (id, status) => {
        dispatch(changeStatusAnuncio(id, status))
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
                <div className="titulos">
                    <h1 className="seccion animate__animated animate__bounceInDown">Anuncios</h1>
                    <button type="button" className="btn btn-success btn-add" onClick={handleOpen}>+ Agregar Anuncio</button>
                </div>
                <div className=" cards-responsivas w-100 row justify-content-md-center">

                    {
                        !!anuncios[0]
                            ?
                            anuncios.map((anuncio) => (
                                <Anuncio handleChangeStatus={handleChangeStatus} handleDelete={handleDelete} handleEdit={handleEdit} anuncio={anuncio} key={anuncio.id} />
                            ))
                            :
                            <h1 className='sinContenido'>No hay anuncios para mostrar</h1>
                    }

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Agregar Anuncio</h5>
                                </div>
                                <div className="modal-body">

                                    <form onSubmit={handleSaveAnuncio}>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Título: </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="titulo"
                                                    name="titulo"
                                                    value={value.titulo}
                                                    onChange={handleInputChange}
                                                    required
                                                    autoFocus
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Descripción: </label>
                                            <div className="col-sm-9">
                                                <textarea
                                                    name="textarea"
                                                    rows="5"
                                                    cols="30"
                                                    className="form-control disabled"
                                                    id="descripcion"
                                                    name="descripcion"
                                                    value={value.descripcion}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Link: </label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="link"
                                                    name='link'
                                                    value={value.link}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label >Imagen del anuncio:&nbsp;</label>
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
