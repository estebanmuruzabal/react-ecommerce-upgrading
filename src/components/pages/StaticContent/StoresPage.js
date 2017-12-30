/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../common/typography/Heading';

/**
 * Component
 */
class StoresPage extends React.Component {

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'Instituto Aleman de Idioma y Cultura'
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./StoresPage.scss');
    }

    //*** Template ***//

    render() {
        return (
          <div className="stores-page__content">
            <p className="stores-page__address">
                <strong>Dirección:</strong><br />
                Carlos Dodero Nº 860. <a href="https://goo.gl/maps/NqkTmzxwkRQ2" target="_blank">Ver en Google Maps</a><br />
                CP 3500 - Resistencia Chaco<br />
            </p>
            <p className="stores-page__schedule">
                <strong>Horarios:</strong><br />
                Lunes a Viernes: de 09 a 12:30 y 17 a 20:30<br />
                Sábados: de 09 a 12:30<br />
            </p>
          </div>
        );
    }
}

/**
 * Exports
 */
export default StoresPage;
