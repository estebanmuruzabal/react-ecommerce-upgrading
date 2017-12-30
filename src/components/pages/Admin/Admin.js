/**
 * Imports
 */
import React from 'react';
import {RouteHandler} from 'react-router';
import config from '../../../config';
import PropTypes from 'prop-types';
// Flux
import fetchAllCollections from '../../../actions/Collections/fetchAllCollections';

// Required components
import AuthenticatedComponent from '../../core/AuthenticatedComponent';
import Heading from '../../common/typography/Heading';
import MainNavigation from '../../common/navigation/MainNavigation';

class Admin extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context) {
        return {
            title: `[ADMIN] ${config.app.title}`
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Load styles
        require('./Admin.scss');

        // Request Collections refresh because, if we're here, then we want
        // to see all the collections in Product page (for example) and not only
        // the ones enabled which are the ones with which the app is loaded on the
        // server-side
        this.context.executeAction(fetchAllCollections);
    }

    //*** Template ***//

    render() {

        const links = [
            {name: 'Dashboard', to: 'adm-dashboard'},
            {name: 'Orders', to: 'adm-orders'},
            {name: 'Customers', to: 'adm-customers'},
            {name: 'Collections', to: 'adm-collections'},
            {name: 'Products', to: 'adm-products'},
            {name: 'Contents', to: 'adm-contents'}
        ];

        // Return
        return (
            <div className="admin">
                <div className="admin-header">
                    <div className="admin-title">
                        <Heading size="large">Admin</Heading>
                    </div>
                    <div className="admin-nav">
                        <MainNavigation collections={links} />
                    </div>
                </div>
                <div className="admin-container">
                    <RouteHandler />
                </div>
            </div>
        );
    }
}

/**
 * This component requires Authentication
 */
const AdminWrapper = AuthenticatedComponent(Admin, ['admin']);

/**
 * Exports
 */
export default AdminWrapper;
