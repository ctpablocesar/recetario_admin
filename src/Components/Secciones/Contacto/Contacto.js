import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMensaje, startLoadingMensajes } from '../../../actions/contacto'
import { Mensaje } from './Mensaje'


export const Contacto = () => {

    const dispatch = useDispatch()

    const { mensajes } = useSelector(state => state.contacto)

    const { saving } = useSelector(state => state.ui)

    useEffect(() => {
        dispatch(startLoadingMensajes())
    }, [saving]);

    const handleDelete = (id) => {
        dispatch(deleteMensaje(id))
    }

    return (
        <>

            <div className="titulos">
                <h1 className="seccion animate__animated animate__bounceInDown">Contacto</h1>
            </div>
            <div className="row d-flex justify-content-center">

                {
                    !!mensajes[0]
                        ?
                        mensajes.map((data) => (
                            <Mensaje handleDelete={handleDelete} mensaje={data} key={data.id} />
                        ))
                        :
                        <h1 className='sinContenido'>No hay mensajes para mostrar</h1>
                }


            </div>

        </>
    )
}
