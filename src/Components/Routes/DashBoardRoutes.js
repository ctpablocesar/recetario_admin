import React from 'react'
import ScrollToTop from 'react-scroll-up';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Navbar } from '../Ui/Navbar';
import { Footer } from '../Ui/Footer';

import { Contacto } from '../Secciones/Contacto/Contacto';
import { Recetas } from '../Secciones/Recetas/Recetas';

import '../../styles/dasboard.css'
import { Error } from '../Secciones/Error';
import { EditReceta } from '../Secciones/Recetas/EditReceta';
import { AddReceta } from '../Secciones/Recetas/AddReceta';
import { Galeria } from '../Secciones/Galeria/Galeria';

export const DashBoardRoutes = ({ history }) => {

    return (
        <div className="wrapper">
            <header className="main-head">
                <Navbar />
            </header>
            <article className="content">
                <Switch>
                    <Route exact path='/editar' component={EditReceta} />
                    <Route exact path="/contacto" component={Contacto} />
                    <Route exact path="/recetas" component={Recetas} />
                    <Route exact path="/agregar" component={AddReceta} />
                    <Route exact path="/galeria" component={Galeria} />
                    <Route path="*" component={Error} />
                </Switch >
            </article>
            <footer className="main-footer">
                <Footer />
            </footer>
            <ScrollToTop showUnder={350}>
                <i className="fas fa-arrow-up go-up"></i>
            </ScrollToTop >
        </div>
    )
}