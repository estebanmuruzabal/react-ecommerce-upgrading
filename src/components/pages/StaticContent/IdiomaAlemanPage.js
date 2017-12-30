/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../common/typography/Heading';

/**
 * Component
 */
class IdiomaAlemanPage extends React.Component {

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'Instituto Aleman de Idioma y Cultura'
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./IdiomaAlemanPage.scss');
    }

    //*** Template ***//

    render() {
        return (
            <div className="idioma-aleman-page">
              <div className="idioma-aleman-page__title">
                  <Heading size="large">
                    Title
                  </Heading>
              </div>
              <div className="idioma-aleman-page__block">
                <div className="idioma-aleman-page__content">
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
export default IdiomaAlemanPage;
