/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../../common/typography/Heading';

/**
 * Component
 */
class CursosDeAleman extends React.Component {

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
                      Nuestra oferta de cursos
                    </Heading>
                </div>

                <div className="common-tabs-page__title">
                    <Heading size="small">
                      Ciclo Basico Nivel A1-B1.1
                    </Heading>
                </div>
                <div className="common-tabs-page__block">
                  <div className="common-tabs-page__content">
                      <p>&bull; Intensivo 3 veces por semana 90 min.</p>
                      <p>&bull; Semi-intensivo 2 veces por semana  90 min.</p>
                  </div>
                </div>

                <div className="common-tabs-page__title">
                    <Heading size="small">
                      Ciclo intermedio Nivel B1.2 – C1
                    </Heading>
                </div>
                <div className="common-tabs-page__block">
                  <div className="common-tabs-page__content">
                      <p>&bull; Semi-intensivo 2 veces por semana 90 min.</p>
                      <p>&bull; Cursos preparativos para los exámenes internacionales.</p>
                  </div>
                </div>

                <div className="common-tabs-page__title">
                    <Heading size="small">
                        Ciclo avanzado A1 – C1
                    </Heading>
                </div>
                <div className="common-tabs-page__block">
                  <div className="common-tabs-page__content">
                      <p>&bull; Entre 1 - 6 meses.</p>
                      <p>&bull; Cursos compactos de verano 4 veces por semana 270 a 360 min. por día.</p>
                  </div>
                </div>

                <div className="common-tabs-page__title">
                    <Heading size="small">
                        Ciclo avanzado A1 – C1
                    </Heading>
                </div>
                <div className="common-tabs-page__block">
                  <div className="common-tabs-page__content">
                      <p>&bull; Entre 1 - 6 meses.</p>
                      <p>&bull; Cursos compactos de verano 4 veces por semana 270 a 360 min. por día.</p>
                  </div>
                </div>

                <div className="common-tabs-page__title">
                    <Heading size="medium">
                        Curso intensivo de verano
                    </Heading>
                </div>
                <div className="common-tabs-page__block">
                  <div className="common-tabs-page__content">
                      <p>&bull; Fecha de inicio planificado: 03/02/2018</p>
                      <p>&bull; Duración: 3 semanas.</p>
                      <p>&bull; Horario: planificado de Lunes a Viernes de 18 a 21hs.</p>
                      <p>&bull; El curso de verano equivale a cinco meses de un curso anual de dos veces por semana (Se hace medio nivel del Marco Común de Referencia Europeo para las Lenguas) En marzo se puede continuar en un curso regular, terminando el 1º nivel en julio.</p>
                  </div>
                </div>

                <div className="common-tabs-page__title">
                    <Heading size="medium">
                        Curso de conversación
                    </Heading>
                </div>
                <div className="common-tabs-page__block">
                  <div className="common-tabs-page__content">
                      <p>Usted ya tiene conocimientos de alemán y quiere afianzarlos? Nuestro curso de conversación lo hace posible en una atmósfera amable y distendida, donde Usted puede expresarse libremente en todo momento y disfrutar hablando alemán.</p>
                      <br></br>
                      <p>&bull; Fecha de inicio:</p>
                      <p>&bull; Duración:</p>
                      <p>&bull; Horario:</p>
                      <p>&bull; Requisito:  haber completado el nivel A2.</p>
                  </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default CursosDeAleman;
