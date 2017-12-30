/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../common/typography/Heading';

/**
 * Component
 */
class MasPage extends React.Component {

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'Instituto Aleman de Idioma y Cultura'
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./MasPage.scss');
    }

    //*** Template ***//

    render() {
        return (
            <div className="mas-page">
                <div className="mas-page__title">
                    <Heading size="large">
                        Becas para nuestros alumnos
                    </Heading>
                </div>
                <div className="mas-page__block">
                    <div className="mas-page__content">
                        <p>&bull; Alumnos que hayan rendido y aprobado (con una buena nota) por lo menos el examen “Goethe-Zertifikat B1,” Nivel B1 y continúen estudiando el idioma en el instituto tienen la posibilidad de acceder a una beca que consiste en un curso de alemán en un Goethe-Institut de Alemania con todo pago otorgado a del Goethe-Institut de Munich.</p>
                        <br></br>
                        <p>&bull; El Instituto Alemán sorteará una beca de estudio de un año de duración en el instituto cada año en el evento de ”Alemania Puertas abiertas”</p>
                        <br></br>
                        <p>&bull; Más información sobre becas en Alemania obtiene por el DAAD http://www.daad.org.ar/es/ (Servicio académico intercambio Alemán)</p>
                        <br></br>
                        <p>&bull; Estudiantes de Instituto Alemán de Idioma y Cultura que ganaron la beca otorgado por el Goethe-Institut</p>
                        <br></br>
                        <p>&bull; Año 2004 Ingrid Kramer, Corrientes, 2006 Jorge Cubells, Resistencia, 2007 Maria Pía Martina, Resistencia, 2007 Milagros Giménez, Resistencia, 2008 Maximiliano Villaroel, Corrientes, 2009 Federico Diaz, Resistencia, 2010 Lucas Diel, Barranqueras. 2011 Silvina Espíndola Moschner, Resistencia. 2012 Marcos Stach, Las Breñas, 2013 Belen Besga, Resistencia.</p>
                        <br></br>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default MasPage;
