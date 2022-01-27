import React from 'react'
import ScrollToTop from 'react-scroll-up';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Navbar } from '../Ui/Navbar';
import { Footer } from '../Ui/Footer';

import { CalendarioEscolar } from '../Secciones/CalendarioEscolar/CalendarioEscolar';
import { FraseInicio } from '../Secciones/FraseInicio/FraseInicio';
import { Galeria } from '../Secciones/Galeria/Galeria';
import { Noticias } from '../Secciones/Noticias/Noticias';
import { Contacto } from '../Secciones/Contacto/Contacto';
import { Anuncios } from '../Secciones/Anuncios/Anuncios';

import '../../styles/dasboard.css'

export const DashBoardRoutes = ({ history }) => {

    return (
        <div className="wrapper">
            <header className="main-head">
                <Navbar />
            </header>
            <article className="content">
                <Switch>
                    <Route path="/admin/calendario" component={CalendarioEscolar} />
                    <Route path="/admin/frase" component={FraseInicio} />
                    <Route path="/admin/galeria" component={Galeria} />
                    <Route path="/admin/noticias" component={Noticias} />
                    <Route path="/admin/contacto" component={Contacto} />
                    <Route exact path="/admin/anuncios" component={Anuncios} />
                    <Redirect to="/admin/anuncios" />
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