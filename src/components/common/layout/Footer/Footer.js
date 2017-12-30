/**
 * Imports
 */
import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
// Required Components
import Heading from '../../typography/Heading';
import NewsletterSubscription from '../../forms/NewsletterSubscription';
import Text from '../../typography/Text';
import StoresPage from '../../../pages/StaticContent/StoresPage.js';

/**
 * Component
 */
class Footer extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Footer.scss');
    }

    //*** Template ***//

    render() {
        // Info links
        let infoLinks = [
            {name: 'Soporte al alumno', link: {to: 'info'}},
            {name: 'Información de eventos', link: {to: 'info'}}
        ];

        // Return a content block's items
        let blockItems = (items) => {
            return items.map(function (item, idx) {
                return (
                    <li key={idx} className="footer__list-item">
                        <Link className="footer__link" to={item.link.to}>
                            {item.name}
                        </Link>
                    </li>
                );
            });
        };

        return (
            <div className="footer">
                <div className="footer__container">
                    <div className="footer__content">

                        <div className="footer__block">
                            <div className="footer__block-title">
                                <Heading color="black" size="small">
                                    <Text weight="bold">Nuestro Instituto</Text>
                                </Heading>
                            </div>
                            <div className="footer__block-content">

                              <StoresPage />

                            </div>
                        </div>

                        <div className="footer__block">
                            <div className="footer__block-title">
                                <Heading color="black" size="small">
                                  <Text weight="bold">Información</Text>
                                </Heading>
                            </div>
                            <div className="footer__block-content">
                                <ul>
                                    {blockItems(infoLinks)}
                                </ul>
                            </div>
                        </div>

                        <div className="footer__block">
                            <div className="footer__block-title">
                                <Heading color="black" size="small">
                                    <Text weight="bold">Social</Text>
                                </Heading>
                            </div>
                            <div className="footer__block-content">
                                <ul>
                                    <li className="footer__social-item">
                                        <div className="footer__social-icon footer__facebook-icon"></div>
                                        <div>
                                            <a className="footer__link footer__social-link" href="https://www.facebook.com/InstitutoAlemanDeIdiomaYCultura/" target="_blank">
                                              Facebook
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="footer__block">
                            <div className="footer__block-title">
                                <Heading color="black" size="small">
                                    <Text weight="bold">Contactanos</Text>
                                </Heading>
                            </div>
                            <div className="footer__block-content">
                              <p className="footer__contactanos">
                                  <strong>Teléfono:</strong><br />
                                  +549-362-4450678
                                  <br /><br />
                                  <strong>Dirección de corréo:</strong><br />
                                  infocursos@instituto-aleman.com
                              </p>
                            </div>
                        </div>

                    </div>
                    <div className="footer__copyright">
                        <Text color="black" size="small">© {new Date().getFullYear()} Instituto Alemán de Idioma y Cultura</Text>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default Footer;
