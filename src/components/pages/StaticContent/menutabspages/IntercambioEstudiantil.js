/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../../common/typography/Heading';

/**
 * Component
 */
class IntercambioEstudiantil extends React.Component {

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
                    Intercambio Estudiantil
                  </Heading>
              </div>
              <div className="common-tabs-page__block">
                <div className="common-tabs-page__content">
                  <p>En un mundo globalizado, en donde acceder a la información es un requisito insoslayable para el desarrollo del individuo como ser social, la adquisición de una competencia comunicativa e intercultural en una lengua extranjera adquiere hoy más que nunca una real importancia.</p>

                  <p>Si sumado a esto nuestros jóvenes de hoy tienen la posibilidad de conocer  otra cultura realizando para ello un intercambio cultural que les permita por un lado poner en práctica esta herramienta tan importante como  es un idioma extranjero y por el otro ampliar su horizonte cultural en beneficio propio y a la vez para la sociedad en la cual esta inserto desarrollando  la capacidad de crítica constructiva, valorando lo que tenemos y/o aportando  experiencias para mejorar su entorno estaríamos proyectando  un futuro mejor. El acercamiento entre las culturas favorece la paz entre los pueblos.</p>
                </div>
              </div>

              <div className="common-tabs-page__title">
                  <Heading size="large">
                    Requisitos
                  </Heading>
              </div>
              <div className="common-tabs-page__block">
                <div className="common-tabs-page__content">
                  <p>&bull; Ser alumno de nivel secundario.</p>
                  <p>&bull; Tener una edad de entre 15 y 18 años.</p>
                  <p>&bull; Requisito 3</p>
                </div>
              </div>


              <div className="common-tabs-page__title">
                  <Heading size="large">
                    Objetivos del Intercambio Estudiantil
                  </Heading>
              </div>

              <div className="common-tabs-page__block">
                <div className="common-tabs-page__content">
                    <p>&bull; Poner en práctica los conocimientos  lingüísticos de la lengua extranjera ( alemán) que los estudiantes han adquirido en su país de origen.</p>

                    <p>&bull; Utilizar la lengua extranjera para intercambiar ideas, experiencias y sentimientos que favorezcan el conocimiento de ambas culturas.</p>

                    <p>&bull; Desarrollar la capacidad de observación y análisis de los elementos que conforman una cultura diferente.</p>

                    <p>&bull; Descubrir, conocer y valorar  su propio potencial en situaciones diferentes al entorno familiar.</p>

                    <p>&bull; Utilizar las posibilidades de las formas de representación y expresión para resolver situaciones cotidianas y aumentar sus posibilidades comunicativas.</p>

                    <p>&bull; Adecuar su propio comportamiento a las necesidades, demandas y requerimientos de otras comunidades.</p>

                    <p>&bull; Conocer y participar en fiestas, tradiciones y costumbres del país receptor.</p>
                </div>
              </div>

              <div className="common-tabs-page__title">
                  <Heading size="large">
                    Programa de intercambio estudiantil
                  </Heading>
              </div>
              <div className="common-tabs-page__block">
                <div className="common-tabs-page__content">
                  <p>El Programa tiene una duración de tres meses. Período propuesto: de abril a julio</p>
                  <br></br>
                  <p>&bull; Llegada a Frankfurt</p>
                  <p>&bull; Seminario introductorio ( 1 a 3 días) en esa ciudad o ciudades aledañas dictado por el VDA</p>
                  <br></br>
                  <p>Objetivo: orientación para la estadía en Alemania, indicaciones para el desenvolvimiento en   los medios de transporte europeos etc.</p>
                  <br></br>
                  <p>&bull; Viaje individual al hogar que los albergará durante el intercambio.</p>
                  <p>&bull; Estadía de tres meses en casas de familias sustitutas sin costo para el estudiante.</p>
                  <p>&bull; Asistencia regular a clases en la misma Institución a la que asiste su hermano/a sustituto/a.</p>
                  <p>&bull; Realización de viajes cortos (fines de semana) a distintas ciudades alemanas y/o visita a lugares de interés y eventos culturales en general.</p>
                  <p>&bull; Dos semanas (últimas de la estadía) liberadas para la realización de viajes culturales en   pequeños grupos (opcional).</p>
                  <p>&bull; Regreso a la Argentina cumplidos los tres meses de estadía posibles sin Visa.</p>
                </div>
              </div>

              <div className="common-tabs-page__title">
                  <Heading size="large">
                    Primer grupo de Intercambio Estudiantil
                  </Heading>
              </div>
              <div className="common-tabs-page__block">
                <div className="common-tabs-page__content">
                  <p>El Instituto alemán de idioma y cultura de Resistencia y la Asociación para las Relaciones Alemanas con el extranjero en Alemania han iniciado un trabajo en conjunto para posibilitar un intercambio de alumnos secundarios de 15 a 18 años entre Alemania y Resistencia.</p>
                  <br></br>
                  <p>La propuesta es para jóvenes que deseen poner en práctica  sus conocimientos del alemán, vivir con una familia alemana, asistir a una escuela y conocer Alemania por el período de tres meses. Para que estos tres meses sean efectivos en cuanto al manejo del idioma los jóvenes deberán tener conocimientos del idioma alemán de por lo menos 1 o 2 años según las características personales y rapidez del aprendizaje. Los jóvenes reciben una preparación especial en el Instituto en cuanto a las características culturales, costumbres, vida familiar, sistema escolar etc. lo que permitirá una rápida adaptación a la nueva realidad que van a vivir.</p>
                  <br></br>
                  <p>Y a su regreso la idea es que puedan aprovechar la experiencia y los conocimientos del alemán para poder obtener en el menor tiempo posible una certificación oficial del Goethe-Institut. El primer intercambio tendrá lugar en los meses de abril a julio y participarán del mismo: Milagros Giménez, Claudia Ramirez, Sofía Kreibohm y Lucas Kastón, los destinos están ubicados en las cercanías de Berlin, Hamburgo y Mannheim.</p>
                </div>
              </div>

            </div>
        );
    }
}

/**
 * Exports
 */
export default IntercambioEstudiantil;
