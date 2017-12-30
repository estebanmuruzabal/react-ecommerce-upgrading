/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../../common/typography/Heading';

/**
 * Component
 */
class PorQueAprenderAleman extends React.Component {

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
                    10 MOTIVOS PARA APRENDER ALEMÁN
                  </Heading>
              </div>
              <div className="common-tabs-page__block">
                <div className="common-tabs-page__content">
                    <p>Sin importar qué planes tenga usted para el futuro, tener conocimientos de alemán le abrirá infinitas posibilidades. Estudiar alemán significa adquirir habilidades que pueden mejorar su vida tanto laboral como privada:</p>
                    <br></br>
                    <p>&bull; En la vida comercial: si se comunica en alemán con sus socios comerciales germanoparlantes, las relaciones de negocios mejorarán y habrá más posibilidades de un entendimiento efectivo y exitoso.</p>
                    <br></br>
                    <p>&bull; Una carrera global: los conocimientos de alemán aumentan sus posibilidades de ingresar a una empresa alemana en su país o en el extranjero. Un buen nivel del idioma lo convertirá en un colaborador efectivo para cualquier empleador con relaciones comerciales internacionales.</p>
                    <br></br>
                    <p>&bull; Turismo y hotelería: los turistas de países de habla alemana viajan mucho y por todo el mundo. Por lo general, gastan más dinero que los turistas de otros países y les gusta ser atendidos por guías y empleados que hablen alemán.</p>
                    <br></br>
                    <p>&bull; Ciencia e investigación: El alemán es la segunda lengua más importante en el campo de la ciencia. Con sus aportes a la investigación y al desarrollo, Alemania está en el tercer lugar en el mundo y otorga becas de investigación a científicos extranjeros.</p>
                    <br></br>
                    <p>&bull; Comunicación: Los avance en el campo de los medios y las tecnologías de la información y comunicación tornan necesaria la comunicación plurilingüe. Muchas páginas web importantes están en alemán. Alemania es el sexto entre 87 países –después de la India, Reino Unido, Estados Unidos, China y Rusia– en la producción de libros. Por lo tanto, el conocimiento del alemán le posibilita un mayor acceso a información.</p>
                    <br></br>
                    <p>&bull; Entendimiento cultural: aprender alemán significa poder observar la vida, los deseos y sueños de los habitantes de los países de habla alemana, que hoy en día son sociedades multiculturales.</p>
                    <br></br>
                    <p>&bull; Viajes: Sabiendo alemán usted puede profundizar sus vivencias de viajes, no sólo en los países de habla alemana, sino también en otros países de Europa, sobre todo en Europa del Este.</p>
                    <br></br>
                    <p>&bull; Disfrute de la literatura, la música, el arte y la filosofía: el alemán es la lengua de Goethe, Kafka, Mozart, Bach y Beethoven. Aumente el placer leyendo y/o escuchando sus obras en su lengua original.</p>
                    <br></br>
                    <p>&bull; Oportunidades de estudio y trabajo en Alemania: Alemania otorga una gran cantidad de becas de estudios. Para extranjeros jóvenes hay visas especiales de trabajo durante las vacaciones. Además, en el caso de algunas profesiones hay condiciones particulares que permiten obtener un permiso de trabajo.</p>
                    <br></br>
                    <p>&bull; Programas de intercambio: Alemania tiene acuerdos con muchos países para realizar intercambios escolares y universitarios.</p>
                    <br></br>
                    <p>&bull; En la vida comercial: si se comunica en alemán con sus socios comerciales germanoparlantes, las relaciones de negocios mejorarán y habrá más posibilidades de un entendimiento efectivo y exitoso.</p>
                </div>
              </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default PorQueAprenderAleman;
