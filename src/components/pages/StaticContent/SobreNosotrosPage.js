/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../common/typography/Heading';

/**
 * Component
 */
class SobreNosotrosPage extends React.Component {

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'Instituto Aleman de Idioma y Cultura'
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./SobreNosotrosPage.scss');
    }

    //*** Template ***//

    render() {
        return (
            <div className="sobre-nosotros-page">
                <div className="sobre-nosotros-page__block">
                    <div className="sobre-nosotros-page__content">
                        <Heading size="large">
                            Sobre nosotros
                        </Heading>
                        <br></br>
                        <p>El Instituto Alemán de Idioma y Cultura de Resistencia trabaja en cooperación con el Goethe-Institut de Buenos Aires, el Goethe-Institut es el instituto estatal de Alemania con más de 140 institutos en el mundo que representan el idioma y la cultura de Alemania. El Instituto Alemán de Resistencia es también el único centro autorizado para exámenes internacionales en la región.</p>
                        <br></br>
                        <Heading size="large">
                            Logros
                        </Heading>
                        <br></br>
                        <b>Hasta la fecha, 8 becas premium a Alemania para los mejores alumnos del Instituto entregados por el Goethe-Institut Buenos Aires. Cosiste en Vuelo, curso intensivo 4 semanas, alojamiento, comidas, excurciones y programa cultural.</b>
                        <br></br>
                        <br></br>
                        <Heading size="large">
                            Que ofrecemos
                        </Heading>
                        <br></br>
                        <p>&bull; Enseñanza Idioma y Cultura Alemana.</p>
                        <p>&bull; Exposiciones internacionales.</p>
                        <p>&bull; Ciclos de cine Alemán.</p>
                        <p>&bull; Día puertas abiertas Alemania.</p>
                        <p>&bull; Intercambio Cultural con la Universidad de Nürnberg, Alemania.</p>
                        <p>&bull; Encuentros con ex becados de la UTN y del DAAD.</p>
                        <p>&bull; Eventos en común con el Club Alemán Austriaco.</p>
                        <br></br>
                        <Heading size="large">
                            Donde estamos
                        </Heading>
                        <br></br>

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.0624295340053!2d-58.992032385082744!3d-27.4673157231773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450cc143bbbbe7%3A0xce74dc2b6ee18d08!2sInstituto+Alem%C3%A1n!5e0!3m2!1ses!2sar!4v1511993759750" className="google-maps-iframe"></iframe>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default SobreNosotrosPage;
