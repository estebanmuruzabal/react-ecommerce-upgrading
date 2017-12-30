/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../common/typography/Heading';

/**
 * Component
 */
class InfoPage extends React.Component {

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'Instituto Aleman de Idioma y Cultura'
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./InfoPage.scss');
    }

    //*** Template ***//

    render() {
        return (
            <div className="info-page">
                <div className="info-page__title">
                    <Heading size="large">
                        Información para el alumno
                    </Heading>
                </div>
                <div className="info-page__content">
                    <div className="info-page__block">
                        <Heading size="medium">
                            Asistencia al alumno
                        </Heading>
                        <div className="info-page__support">
                            <p>
                                Para cualquier problema relacionado con el Instituto, póngase en contacto a través de <a href="mailto:instituto@gmail.com"> instituto@gmail.com </a> <br />
                                Gracias
                            </p>
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
export default InfoPage;
