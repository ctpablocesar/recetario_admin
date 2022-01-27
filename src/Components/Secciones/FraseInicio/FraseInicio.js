import React, { useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingFrase, startUpload, uploadFrase } from '../../../actions/frase';
import "rc-switch/assets/index.css";
import '../../../styles/administracion.css'
import { useForm } from '../../../hooks/useForm';

export const FraseInicio = () => {

    const dispatch = useDispatch()

    const { saving } = useSelector(state => state.ui)

    const { frase } = useSelector(state => state.frase)

    const [titulo, setTitulo] = useState('');

    const [open, setOpen] = useState(false);

    const [vacia, setVacia] = useState(true);

    const [value, handleInputChange, reset] = useForm({ titulo: '', frase: '' });

    const { titulo: tituloForm, frase: contenido } = value

    useEffect(() => {
        dispatch(startLoadingFrase())
    }, [saving])

    const handleGetFrase = () => {
        handleOpen()
    }

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

    const handleSaveFrase = (e) => {
        e.preventDefault()
        dispatch(uploadFrase(tituloForm, contenido))
        setTimeout(() => {
            reset()
            setTitulo('')
            setVacia(true)
        }, 1500);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleReset = (e) => {
        e.preventDefault()
        setTitulo('')
        setVacia(true)
        reset()
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
                    <h1 className="seccion animate__animated animate__bounceInDown">Frase Inicio</h1>
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-success btn-add" onClick={() => handleGetFrase()}>Actual</button>
                </div>
                <div>
                    <form className='calendario mt-5' onSubmit={handleSaveFrase}>
                        <label className="font-weight-bold">Imagen: </label>

                        <div>{
                            vacia
                            ?
                            <button onClick={handleUploadImage} className='btn btn-secondary'>Agregar imagen</button>
                            :
                            <button onClick={handleUploadImage} className='btn btn-secondary'>Actualizar imagen</button>
                            }
                            {
                                !vacia
                                &&
                                <span><b>  {titulo}</b> <i className="fas fa-check-circle"></i></span>
                            }
                        </div>
                        <label className="font-weight-bold">Título:</label>
                        <input
                            type="text"
                            name="titulo"
                            className="form-control disabled tarea"
                            value={tituloForm}
                            onChange={handleInputChange}
                            required
                        />
                        <label className="font-weight-bold">Frase:</label>
                        <textarea
                            name="frase"
                            rows="8"
                            cols="30"
                            className="form-control disabled tarea"
                            value={contenido}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="p-2">
                            <input type="submit" value="Actualizar" className='mt-3 btn btn-success' />
                            <input type="button" value="Resetear" className=' ml-3 mt-3 btn btn-danger' onClick={handleReset} />
                        </div>
                    </form>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Frase inicio actual</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="tarjeta-noticias">
                            <div className="row p-4">
                                <div className="col-md-4">
                                    <img src={frase.imagen} className="w-100" alt="imagen de la noticia" />
                                </div>
                                <div className="col-md-8 px-3">
                                    <div className="card-block px-3">
                                        <h4 className="card-title">{frase.titulo}</h4>
                                        <p className="card-text">{frase.frase}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>

    )
}
