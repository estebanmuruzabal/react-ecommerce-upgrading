/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import fetchContents from '../../../../actions/Contents/fetchContents';

// Required Components
import Heading from '../../../common/typography/Heading';
import PropTypes from 'prop-types';
import AdminHomepageSettings from './AdminHomepageSettings';
import AdminMainNavigation from './AdminMainNavigation';

class AdminDashboard extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Required Data ***//

    static fetchData = function (context, params, query, done) {
        context.executeAction(fetchContents, {type: 'banner', tags: 'homepage'}, done);
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminDashboard.scss');
    }

    //*** Template ***//

    render() {

        return (
            <div className="admin-dashboard">
                <div className="admin-dashboard__header">
                    <div className="admin-dashboard__title">
                        <Heading size="medium">
                            Dashboard
                        </Heading>
                    </div>
                    <div className="admin-dashboard__toolbar"></div>
                </div>

                <div className="admin-dashboard__settings-block">
                    <div className="admin-dashboard__settings-title">
                        <Heading size="medium">
                            Orden de Menu Principal
                        </Heading>
                    </div>
                    <AdminMainNavigation />
                </div>

                <div className="admin-dashboard__settings-block">
                    <div className="admin-dashboard__settings-title">
                        <Heading size="medium">
                            Configuraciones de Página Principal
                        </Heading>
                    </div>
                    <AdminHomepageSettings />
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default AdminDashboard;
