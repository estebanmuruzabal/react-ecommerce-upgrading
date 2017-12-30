/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../../common/typography/Heading';

/**
 * Component
 */
class ExamenesDeAleman extends React.Component {

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
                  <Heading size="medium">
                    Nuestros exámenes
                  </Heading>
              </div>
              <div className="common-tabs-page__block">
                <div className="common-tabs-page__content">
                    <p>Se rinden por año 2 exámenes internos.</p>
                    <br></br>
                    <p>&bull; El Primero: Nivelación ( luego de medio año de cursado )</p>
                    <p>&bull; El Segundo: Certificación de aprobado el año ( Cumplido el año de cursado )</p>
                </div>
              </div>

              <div className="common-tabs-page__title">
                  <Heading size="medium">
                    Exámenes oficiales del Goethe-Institut
                  </Heading>
              </div>
              <div className="common-tabs-page__block">
                <div className="common-tabs-page__content">
                    <p>En la región de Sudamérica se ofrece una variedad de exámenes para todos los estudiantes de alemán, tanto en el ámbito escolar y académico como en la enseñanza de adultos. Los exámenes oficiales del Goethe-Institut y los de los colegios de enseñanza del alemán son reconocidos en Alemania y en muchos países del mundo, abriendo así las puertas para fines personales, profesionales y académicos.</p>
                    <p>Los diferentes exámenes de alemán que ofrece el Goethe-Institut han sido establecidos conforme con los niveles del Marco Común de Referencia del Consejo Europeo para las lenguas.</p>
                    <p>El Instituto Alemán de Resistencia es un centro autorizado para tomar los exámenes oficiales de los Niveles A, B y C1 (Ciclo básico e intermedio).</p>
                    <br></br>
                    <Heading size="small">
                      Fechas de exámenes 2018:
                    </Heading>
                    <br></br>
                    <p>&bull; Sábado 12 de agosto</p>
                    <p>&bull; Sábado 9 de diciembre</p>
                    <br></br>
                    <p>Más información sobre los exámenes internacionales en la página del Goethe-Institut de Buenos Aires: <a href="https://www.goethe.de/ins/ar/es/sta/bue.html">www.goethe.de</a></p>
                </div>
                <div className="b1-exam-image"></div>
              </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default ExamenesDeAleman;
