import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {Link} from 'react-router';
import AccountStore from '../../../stores/Account/AccountStore';
import triggerDrawer from '../../../actions/Application/triggerDrawer';
import Text from '../typography/Text';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
class SideMenu extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        user: this.context.getStore(AccountStore).getAccountDetails()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./SideMenu.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({user: nextProps._user});
    }

    //*** View Controllers ***//

    handleItemClick = () => {
        this.context.executeAction(triggerDrawer, null); // Close drawer
    };

    //*** Template ***//

    render() {

        return (
            <div className="side-menu">
                <nav>
                    <ul className="side-menu__collections">
                        {this.props.collections && this.props.collections.map((obj, idx) => {
                            return (
                                <li key={idx} className="side-menu__item side-menu__collection-item" onClick={this.handleItemClick}>
                                    <Link to={obj.to} params={objectAssign(obj.params || {})}>
                                        <Text size="medium">{obj.name}</Text>
                                    </Link>
                                </li>
                            );
                        })}
                        {this.props.tabs && this.props.tabs.map((obj, idx) => {
                            return (
                                 <li key={idx} className="side-menu__item side-menu__collection-item" onClick={this.handleItemClick}>
                                     <Link to={obj.to} params={objectAssign(obj.params || {})}>
                                         <Text size="medium">{obj.name}</Text>
                                     </Link>
                                 </li>
                             );
                         })}
                    </ul>
                </nav>
            </div>
        );
    }
}

/**
 * Flux
 */
SideMenu = connectToStores(SideMenu, [AccountStore], (context) => {
    return {
        _user: context.getStore(AccountStore).getAccountDetails()
    };
});

/**
 * Exports
 */
export default SideMenu;
