/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {move as arrayMove} from '../../../../utils/arrays';

// Flux
import CollectionsStore from '../../../../stores/Collections/CollectionsStore';
import PropTypes from 'prop-types';
import bulkCollectionsUpdate from '../../../../actions/Admin/bulkCollectionsUpdate';

// Required Components
import Button from '../../../common/buttons/Button';
import DirectionButton from '../../../common/buttons/DirectionButton';

class AdminMainNavigation extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        loading: this.context.getStore(CollectionsStore).isLoading(),
        navCollections: this.context.getStore(CollectionsStore).getMainNavigationCollections()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminMainNavigation.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loading: nextProps._loading,
            navCollections: nextProps._navCollections
        });
    }

    //*** Helper Methods ***//

    updateNavCollections = (fromIdx, toIdx) => {
        let navCollections = this.state.navCollections;
        arrayMove(navCollections, fromIdx, toIdx);
        navCollections.forEach(function (collection, idx) {
            collection.metadata.mainNavigationOrder = idx;
        });
        this.setState({navCollections: navCollections});
    };

    //*** View Controllers ***//

    handleMoveLeftClick = (idx) => {
        if (idx > 0) {
            this.updateNavCollections(idx, idx-1);
        }
    };

    handleMoveRightClick = (idx) => {
        if (idx < this.state.navCollections.length-1) {
            this.updateNavCollections(idx, idx+1);
        }
    };

    handleUpdateClick = () => {
        this.context.executeAction(bulkCollectionsUpdate, this.state.navCollections);
    };

    //*** Template ***//

    render() {

        return (
            <div className="admin-main-navigation">
                <div className="admin-main-navigation__collections">
                    {this.state.navCollections.map((collection, idx) => {
                        return (
                            <DirectionButton key={idx}
                                             item={collection}
                                             handleMoveLeftClick={this.handleMoveLeftClick.bind(null, idx)}
                                             handleMoveRightClick={this.handleMoveRightClick.bind(null, idx)}
                                             itemsNum={this.state.navCollections.length} />
                        );
                    })}
                </div>
                <div className="admin-main-navigation__actions">
                    <Button className="admin-main-navigation__update-button" type="primary"
                            onClick={this.handleUpdateClick}
                            loading={this.state.loading}>
                        Actualizar
                    </Button>
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
AdminMainNavigation = connectToStores(AdminMainNavigation, [CollectionsStore], (context) => {
    return {
        _loading: context.getStore(CollectionsStore).isLoading(),
        _navCollections: context.getStore(CollectionsStore).getMainNavigationCollections()
    };
});

/**
 * Exports
 */
export default AdminMainNavigation;
