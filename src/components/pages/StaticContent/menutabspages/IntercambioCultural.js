/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../../common/typography/Heading';

/**
 * Component
 */
class IntercambioCultural extends React.Component {

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'Instituto Aleman de Idioma y Cultura'
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./menuTabsPagesStyles.scss');
    }

    //*** Template ***//

    render() {
        return (
            <div className="common-tabs-page">
              <div className="common-tabs-page__title">
                  <Heading size="large">
                    Intercambio Cultural
                  </Heading>
              </div>
              <div className="common-tabs-page__block">
                <div className="common-tabs-page__content">
                  <p>Organiza el Instituto Alemán de Idioma y Cultura de Resistencia con la Universidad de Nürnberg, Facultad de ciencias de la educación.</p>
                  <p>La idea se basa en que, alumnos de Instituto de hasta 35 años de edad, participan en un intercambio con estudiantes Alemanes de la Universidad de Nürnberg durante 3 semanas.</p>
                  <p>Los alumnos/estudiantes intercambian alojamiento en sus casas/departamentos de aquí y de Alemania, para poder vivir una experiencia real y cotidiana de los participantes.</p>
                  <p>Nuestros alumnos recibirán un curso intensivo de idioma alemán durante 2 semanas en la Universidad de Nürnberg. Los Estudiantes de Nürnberg recibirán también un curso intensivo de idioma español en el instituto Alemán de Resistencia.</p>
                  <p>Además, en ambos sitios, se desarrollará un programa cultural, con excursiones. En ambas partes se entregarán, a la finalización del intercambio, un certificado de participación. Destinatarios: Alumnos del Instituto Nivel de idioma: un mínimo de dos a tres años.</p>
                </div>
              </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default IntercambioCultural;
