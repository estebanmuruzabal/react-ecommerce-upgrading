/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
// Flux
import DrawerStore from '../../../../stores/Application/DrawerStore';
import triggerDrawer from '../../../../actions/Application/triggerDrawer';

// Required components
import Badge from '../../indicators/Badge';
import HeaderHighlight from './HeaderHighlight';

/**
 * Component
 */
class HandheldsHeader extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        openedDrawer: this.context.getStore(DrawerStore).getOpenedDrawer()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./HandheldsHeader.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            openedDrawer: nextProps._openedDrawer
        });
    }

    //*** View Controllers ***//

    handleBtnClick = (drawer) => {
        this.context.executeAction(triggerDrawer, drawer);
    };

    //*** Template ***//

    render() {

        return (
            <div>
              <div className="handhelds-header">
                  <div className="handhelds-header__left-actions">
                    <div className="handhelds-header__logo-link">
                        <Link to='homepage'>
                            <div className="handhelds-header__logo"></div>
                        </Link>
                    </div>
                  </div>
                  <div className="handhelds-header__right-actions">
                      {this.state.openedDrawer !== 'menu' ?
                          <div className="hamburger" onClick={this.handleBtnClick.bind(null, 'menu')}>
                            <span className="line1"></span>
                            <span className="line2"></span>
                            <span className="line3"></span>
                          </div>
                          :
                          <div className="handhelds-header__close-button" onClick={this.handleBtnClick.bind(null, 'menu')}></div>
                      }
                  </div>
              </div>
              <HeaderHighlight />
            </div>
        );
    }
}

/**
 * Flux
 */
HandheldsHeader = connectToStores(HandheldsHeader, [ DrawerStore], (context) => {
    return {
        _openedDrawer: context.getStore(DrawerStore).getOpenedDrawer()
    };
});

/**
 * Exports
 */
export default HandheldsHeader;
