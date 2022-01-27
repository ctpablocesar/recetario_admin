import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { saveCalendario, startLoadCalendario, startUpload } from '../../../actions/calendario';

export const CalendarioEscolar = () => {

    const dispatch = useDispatch();

    const { saving } = useSelector(state => state.ui)

    const { calendario } = useSelector(state => state.calendario)

    useEffect(() => {
        dispatch(startLoadCalendario())
    }, [saving])

    const handleUploadImage = (e) => {
        e.preventDefault()
        document.querySelector('#imageSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUpload(file))
        }
        setTimeout(() => {
            dispatch(saveCalendario())
        }, 2000);
    }

    return (
        <>
            <div>
                <input
                    type="file"
                    name='file'
                    id="imageSelector"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <div className="titulos">
                    <h1 className="seccion animate__animated animate__bounceInDown">Calendario Escolar</h1>
                </div>



                <form onSubmit={handleUploadImage}>
                    <div className="calendario">
                        <label className="font-weight-bold">Imagen:</label>
                        <input
                            type="submit"
                            id="save"
                            value="Actualizar imagen"
                            className='btn btn-success btn-add'
                        />
                    </div>
                </form>
            </div>
            <div className="text-center container mt-5 mb-5">
                {
                    !saving
                    &&
                    <img src={calendario} width="600" height="250" alt="calendarioescolar" className="img-fluid" />
                }
            </div>
        </>
    )
}
