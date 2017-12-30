/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../../common/typography/Heading';

/**
 * Component
 */
class Instalaciones extends React.Component {

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
                    Title
                  </Heading>
              </div>
              <div className="common-tabs-page__block">
                <div className="common-tabs-page__content">
                    <p>
                      write some content here please!!
                    </p>
                </div>
              </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default Instalaciones;
