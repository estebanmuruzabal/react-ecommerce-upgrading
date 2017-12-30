/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {Link} from 'react-router';

// Flux
import AccountStore from '../../../../stores/Account/AccountStore';
import DrawerStore from '../../../../stores/Application/DrawerStore';
import triggerDrawer from '../../../../actions/Application/triggerDrawer';
import PropTypes from 'prop-types';
// Required components
import Badge from '../../indicators/Badge';
import CollectionTreeMenu from '../../navigation/CollectionTreeMenu';
import MainNavigation from '../../navigation/MainNavigation';
import Text from '../../typography/Text';
import HeaderHighlight from './HeaderHighlight';

/**
 * Component
 */
class DesktopHeader extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired,
        router: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        user: this.context.getStore(AccountStore).getAccountDetails(),
        openedDrawer: this.context.getStore(DrawerStore).getOpenedDrawer(),
        collectionsTreeMenuEnabled: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./DesktopHeader.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps._user,
            openedDrawer: nextProps._openedDrawer
        });
    }

    //*** View Controllers ***//

    handleBtnClick = (drawer) => {
        this.context.executeAction(triggerDrawer, drawer);
    };

    //*** Template ***//

    render() {
        let isAdmin = this.context.getStore(AccountStore).isAuthorized(['admin']);

        return (
            <div>
              <HeaderHighlight />
              <div className="desktop-header">
                  <div className="desktop-header__container">
                      <div className="desktop-header__row">
                          <div className="desktop-header__container-left-column">
                              <div className="desktop-header__navigation">
                                <MainNavigation collections={this.props.collections} tabs={this.props.tabs} />
                              </div>
                          </div>

                              {this.state.user ?
                                <div className="desktop-header__container-right-column">
                                  <div className="desktop-header__account">
                                      { isAdmin ?
                                          <div className="desktop-header__admin-button">
                                              <Link to='admin-panel'>
                                                  <Text size="small" weight="bold" color="black">
                                                      Panel Admin
                                                  </Text>
                                              </Link>
                                          </div>
                                          :
                                          null
                                      }
                                      <div className="desktop-header__logout-button">
                                          <Link to='logout'>
                                              <Text size="small" weight="bold" color="black">
                                                  Logout
                                              </Text>
                                          </Link>
                                      </div>
                                      <div className="desktop-header__account-button">
                                          <Link to='account'>
                                              <div>
                                                  <Text size="small" weight="bold" color="black">
                                                      Hola , {this.state.user.name.split(' ')[0]}
                                                  </Text>
                                              </div>
                                              <div>
                                                  <Text size="small" weight="bold" color="black">
                                                      Mi cuenta
                                                  </Text>
                                              </div>
                                          </Link>
                                      </div>
                                  </div>
                                  </div>
                                  :
                                  null
                              }
                      </div>
                  </div>
              </div>
            </div>
        );
    }
}

/**
 * Flux
 */
DesktopHeader = connectToStores(DesktopHeader, [AccountStore, DrawerStore], (context) => {
    return {
        _user: context.getStore(AccountStore).getAccountDetails(),
        _openedDrawer: context.getStore(DrawerStore).getOpenedDrawer()
    };
});

/**
 * Exports
 */
export default DesktopHeader;
