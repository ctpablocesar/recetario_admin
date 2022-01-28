import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startUplaodReceta } from '../../../actions/recetas';
import { useForm } from '../../../hooks/useForm';

export const EditReceta = () => {

    const dispatch = useDispatch();

    const { active } = useSelector(state => state.recetas)

    const [tiempo, setTiempo] = useState(active.tiempo);

    const [ocacion, setOcacion] = useState(active.ocacion);

    const [vacia, setVacia] = useState(true);

    const [value, handleInputChange, reset, setValue] = useForm({
        titulo: '',
        descripcion: '',
        ingredientes: '',
        procedimiento: '',
        etiquetas: '',
        tipo: ''
    });

    useEffect(() => {
        active && setValue({
            titulo: active.titulo,
            descripcion: active.descripcion,
            ingredientes: active.ingredientes,
            tiempo: active.timepo,
            procedimiento: active.procedimiento,
            etiquetas: active.etiquetas,
            tipo: active.tipo,
            ocacion: active.ocacion
        })
    }, [active])

    const upLoadReceta = (e) => {
        e.preventDefault()
        setTimeout(() => {
            dispatch(startUplaodReceta(value))
            exit()
        }, 2000);
    }

    const exit = () => {
        document.querySelector('#regresar').click();
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
                <h1 className="seccion animate__animated animate__bounceInDown">Editar receta</h1>
            </div>

            <div className=" justify-content-center modal-dialog-centered">


                <form className='col-sm-10' onSubmit={upLoadReceta}>
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
                        <label for="exampleFormControlInput1">Etiquetas:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="etiquetas"
                            name="etiquetas"
                            value={value.etiquetas}
                            onChange={handleInputChange}
                            required
                            autoFocus
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Ocacion:</label>
                        <select class="form-control" id="ocacion" name='ocacion' value={ocacion} onChange={handleChangeOcacion}>
                            <option value="desayuno">Desayuno</option>
                            <option value="comida">Comida</option>
                            <option value="cena">Cena</option>
                        </select>
                    </div>
                    <center>
                        < button type="submit" className='btn btn-success'>Actualizar</button>
                        &nbsp;&nbsp;
                        <button type="button" className="btn btn-danger">Cancelar</button>
                    </center>
                </form>
            </div>
        </div >
    </>
};

{/* <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
    <div className="modal-header">
    <h5 className="modal-title" id="exampleModalLongTitle">Editar receta</h5>
    </div>
<div className="modal-body"> */}

{/* <div className=" justify-content-center modal-dialog-centered">
    <div className='form-group col-sm-10'>

        <div className="titulos">
            <h1 className="seccion animate__animated animate__bounceInDown">Editar receta</h1>
        </div>

        <form onSubmit={handleUploadImage}>
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
                        rows="2"
                        cols="10"
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
                <label className="col-sm-2 col-form-label">Ingredientes: </label>
                <div className="col-sm-9">
                    <input
                        type="text"
                        className="form-control"
                        id="link"
                        name='link'
                        value={value.ingredientes}
                        onChange={handleInputChange}
                    />
                </div>
            </div>


            <div className="modal-footer">
                <button type="button" className="btn btn-danger">Cancelar</button>
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
</div> */}
{/* </div>
    </div>
</div> */}