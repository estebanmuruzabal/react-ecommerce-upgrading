/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../common/typography/Heading';

/**
 * Component
 */
class IntercambiosPage extends React.Component {

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'Instituto Aleman de Idioma y Cultura'
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./IntercambiosPage.scss');
    }

    //*** Template ***//

    render() {
        return (
          <div className="intercambios-page">
              <div className="intercambios-page__title">
                  <Heading size="large">
                    Intercambio Cultural
                  </Heading>
              </div>
              <div className="intercambios-page__main-content">
                  <div className="intercambios-page__block">
                      <div className="intercambios-page__content">
                          <p>Organiza el Instituto Alemán de Idioma y Cultura de Resistencia con la Universidad de Nürnberg, Facultad de ciencias de la educación.</p>

                          <p>La idea se basa en que, alumnos de Instituto de hasta 35 años de edad, participan en un intercambio con estudiantes Alemanes de la Universidad de Nürnberg durante 3 semanas.</p>

                          <p>Los alumnos/estudiantes intercambian alojamiento en sus casas/departamentos de aquí y de Alemania, para poder vivir una experiencia real y cotidiana de los participantes.</p>

                          <p>Nuestros alumnos recibirán un curso intensivo de idioma alemán durante 2 semanas en la Universidad de Nürnberg. Los Estudiantes de Nürnberg recibirán también un curso intensivo de idioma español en el instituto Alemán de Resistencia.</p>

                          <p>Además, en ambos sitios, se desarrollará un programa cultural, con excursiones. En ambas partes se entregarán, a la finalización del intercambio, un certificado de participación. Destinatarios: Alumnos del Instituto Nivel de idioma: un mínimo de dos a tres años.</p>
                      </div>
                  </div>

                  <div className="intercambios-page__block">
                      <Heading size="medium">
                        Intercambio Estudiantil
                      </Heading>
                      <div className="intercambios-page__content">
                          <p>En un mundo globalizado, en donde acceder a la información es un requisito insoslayable para el desarrollo del individuo como ser social, la adquisición de una competencia comunicativa e intercultural en una lengua extranjera adquiere hoy más que nunca una real importancia.</p>

                          <p>Si sumado a esto nuestros jóvenes de hoy tienen la posibilidad de conocer  otra cultura realizando para ello un intercambio cultural que les permita por un lado poner en práctica esta herramienta tan importante como  es un idioma extranjero y por el otro ampliar su horizonte cultural en beneficio propio y a la vez para la sociedad en la cual esta inserto desarrollando  la capacidad de crítica constructiva, valorando lo que tenemos y/o aportando  experiencias para mejorar su entorno estaríamos proyectando  un futuro mejor. El acercamiento entre las culturas favorece la paz entre los pueblos.</p>
                      </div>
                  </div>

              </div>
          </div>
        );
    }
}

/**
 * Exports
 */
export default IntercambiosPage;
