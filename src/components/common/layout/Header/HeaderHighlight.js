import React from 'react';
import {Link} from 'react-router';
import Text from '../../typography/Text';
import PropTypes from 'prop-types';
class HeaderHighlight extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    componentDidMount() {
        require('./HeaderHighlight.scss');
    }

    render() {
        return (
            <div className="header-highlight">
              <Link className="" to='homepage'>
                <div className="header-highlight__logo"></div>
              </Link>
            </div>
        );
    }
}

/**
 * Exports
 */
export default HeaderHighlight;
