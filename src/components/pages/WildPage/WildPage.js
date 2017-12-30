/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

// Flux
import CollectionDetailsStore from '../../../stores/Collections/CollectionDetailsStore';
import CollectionsStore from '../../../stores/Collections/CollectionsStore';

import fetchCollectionAndCheckIfFound from '../../../actions/Collections/fetchCollectionAndCheckIfFound';
import updateCollection from '../../../actions/Admin/updateCollection';

// Delete
import DeleteHandler from '../../common/deleteHandler/DeleteHandler';
import deleteCollection from '../../../actions/Admin/deleteCollection';
import Modal from '../../common/modals/Modal';

// Required components
import Button from '../../common/buttons/Button';
import Checkbox from '../../common/forms/Checkbox';
import FormLabel from '../../common/forms/FormLabel';
import Heading from '../../common/typography/Heading';
import ImageLibraryManager from '../../containers/images/ImageLibraryManager';
import InputField from '../../common/forms/InputField';
import NotFound from '../NotFound/NotFound';
import Select from '../../common/forms/Select';
import Textarea from '../../common/forms/Textarea';
import TreeMenu from '../../common/navigation/TreeMenu';
import ToggleSwitch from '../../common/buttons/ToggleSwitch';

// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class WildPage extends React.Component {

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'Instituto Aleman de Idioma y Cultura'
        }
    };

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired
    };

    //*** Required Data ***//

    static fetchData = function (context, params, query, done) {
        context.executeAction(fetchCollectionAndCheckIfFound, params.collectionId, done);
    };

    //*** Initial State ***//

    state = {
        collection: this.context.getStore(CollectionDetailsStore).getCollection(),
        error: this.context.getStore(CollectionDetailsStore).getError(),
        loading: this.context.getStore(CollectionDetailsStore).isLoading(),
        fieldErrors: {},
        showDeleteCollectionModal: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {
        require('./WildPage.scss');
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            collection: nextProps._collection,
            error: nextProps._error,
            loading: nextProps._loading
        });
    }


    render() {
        return (
            <div>
                {!this.state.collection ?
                    <NotFound />
                    :
                    <div className="common-tabs-page">
                      { this.state.collection.content.title1 ?
                        <div>
                          <div className="common-tabs-page__title">
                              <Heading size="medium">
                                {this.state.collection.content.title1}
                              </Heading>
                          </div>
                          <div className="common-tabs-page__block">
                            <div className="common-tabs-page__content">
                                {this.state.collection.content.textarea1}
                            </div>
                          </div>
                        </div>
                        :
                        null
                      }
                      { this.state.collection.content.title2 ?
                        <div>
                          <div className="common-tabs-page__title">
                              <Heading size="medium">
                                {this.state.collection.content.title2}
                              </Heading>
                          </div>
                          <div className="common-tabs-page__block">
                            <div className="common-tabs-page__content">
                                {this.state.collection.content.textarea2}
                            </div>
                          </div>
                        </div>
                        :
                        null
                      }
                    </div>
                }
            </div>
        );
    }
}

/**
 * Flux
 */
WildPage = connectToStores(WildPage, [CollectionDetailsStore, CollectionsStore], (context) => {
    return {
        _collection: context.getStore(CollectionDetailsStore).getCollection(),
        _error: context.getStore(CollectionDetailsStore).getError(),
        _loading: context.getStore(CollectionDetailsStore).isLoading()
    };
});

/**
 * Exports
 */
export default WildPage;
