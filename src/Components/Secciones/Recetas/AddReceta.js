import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLoadingRecetas, startSaveReceta, startUplaodReceta } from '../../../actions/recetas';
import { useForm } from '../../../hooks/useForm';

export const AddReceta = () => {

    const dispatch = useDispatch();

    const { active } = useSelector(state => state.recetas)

    const [tiempo, setTiempo] = useState(active.tiempo);

    const [ocacion, setOcacion] = useState(active.ocacion);

    const uid = useSelector(state => state.auth.uid);

    const [vacia, setVacia] = useState(true);

    const [value, handleInputChange, reset, setValue] = useForm({
        titulo: '',
        descripcion: '',
        ingredientes: '',
        procedimiento: '',
        tipo: ''
    });

    const saveReceta = (e) => {
        e.preventDefault()
        setTimeout(() => {
            dispatch(startSaveReceta(value,tiempo,ocacion,uid))
            exit()
        }, 2000);
    }

    const exit = () => {
        document.querySelector('#regresar').click();
        setTimeout(() => {
            // useEffect(() => {
                dispatch(startLoadingRecetas())
            // }, [saving]);
        }, 200);
    }

    const handleChangeTiempo = (e) => {
        const tiempoNew = e.target.value;
        setValue({
            ...value,
            tiempo: tiempoNew
        })
        setTiempo(tiempoNew);
    }

    const handleChangeOcacion = (e) => {
        const ocacionNew = e.target.value;
        setValue({
            ...value,
            ocacion: ocacionNew
        })
        setOcacion(ocacionNew);
    }

    return <>
        <Link className="btn btn-success btn-add" to='/recetas' id='regresar' style={{ display: 'none' }}></Link>

        <div>
            <div className="titulos">
                <h1 className="seccion animate__animated animate__bounceInDown">Agregar receta</h1>
            </div>

            <div className=" justify-content-center modal-dialog-centered">


                <form className='col-sm-10' onSubmit={saveReceta}>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Titulo:</label>
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
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Descripcion:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="descripcion"
                            name="descripcion"
                            value={value.descripcion}
                            onChange={handleInputChange}
                            required
                            autoFocus
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Ingredientes:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ingredientes"
                            name="ingredientes"
                            value={value.ingredientes}
                            onChange={handleInputChange}
                            required
                            autoFocus
                        />
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Tiempo:</label>
                        <select class="form-control" id="tiempo" name='tiempo' value={tiempo} onChange={handleChangeTiempo}>
                            <option value="corto">Corto</option>
                            <option value="medio">Medio</option>
                            <option value="largo">Largo</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlInput1">Procedimiento:</label>
                        <textarea
                            rows="10"
                            cols="10"
                            type="text"
                            className="form-control disabled"
                            id="procedimiento"
                            name="procedimiento"
                            value={value.procedimiento}
                            onChange={handleInputChange}
                            required
                            autoFocus
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Tipo:</label>
                        <select class="form-control" id="ocacion" name='ocacion' value={ocacion} onChange={handleChangeOcacion}>
                            <option value="desayuno">Desayuno</option>
                            <option value="comida">Comida</option>
                            <option value="cena">Cena</option>
                        </select>
                    </div>
                    <center>
                        < button type="submit" className='btn btn-success' >Guardar</button>
                        &nbsp;&nbsp;
                        <Link className="btn btn-danger" to='/recetas'>Cancelar</Link>
                    </center>
                </form>
            </div>
        </div >
    </>
};