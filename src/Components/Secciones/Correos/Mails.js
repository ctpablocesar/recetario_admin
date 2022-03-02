import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setCorreos } from '../../../actions/correos';

export const Mails = ({ correos, setVarios, usuraios }) => {

    const dispatch = useDispatch();

    const checking = useSelector(state => state.ui.checking);

    // useEffect(() => {
        
    // }, [checking]);

    const changeStatus = (correo) => {
        dispatch(setCorreos(correo))
    }

    return (
        <>
            <ul className="list-group">
                {
                    correos.map((correo, index) => (
                        <li className={`list-group-item btn m-1 text-light ${correo.status ? 'bg-success' : 'bg-danger'}`} key={index} onClick={() => changeStatus(correo.correo)}>
                            {correo.correo}
                        </li>
                    ))
                }
            </ul>
        </>
    )
}
