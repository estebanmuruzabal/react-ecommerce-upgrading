/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

// Flux
import CollectionDetailsStore from '../../../../stores/Collections/CollectionDetailsStore';
import CollectionsStore from '../../../../stores/Collections/CollectionsStore';

import fetchCollectionAndCheckIfFound from '../../../../actions/Collections/fetchCollectionAndCheckIfFound';
import updateCollection from '../../../../actions/Admin/updateCollection';

// Delete
import DeleteHandler from '../../../common/deleteHandler/DeleteHandler';
import deleteCollection from '../../../../actions/Admin/deleteCollection';
import Modal from '../../../common/modals/Modal';

// Required components
import Button from '../../../common/buttons/Button';
import Checkbox from '../../../common/forms/Checkbox';
import FormLabel from '../../../common/forms/FormLabel';
import Heading from '../../../common/typography/Heading';
import ImageLibraryManager from '../../../containers/images/ImageLibraryManager';
import InputField from '../../../common/forms/InputField';
import NotFound from '../../NotFound/NotFound';
import Select from '../../../common/forms/Select';
import Textarea from '../../../common/forms/Textarea';
import TreeMenu from '../../../common/navigation/TreeMenu';
import ToggleSwitch from '../../../common/buttons/ToggleSwitch';

// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class AdminCollectionsEdit extends React.Component {

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
        collectionsTree: this.context.getStore(CollectionsStore).getCollectionsTree(),
        fieldErrors: {},
        showDeleteCollectionModal: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminCollectionsEdit.scss');
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            collection: nextProps._collection,
            error: nextProps._error,
            loading: nextProps._loading,
            collectionsTree: nextProps._collectionsTree
        });
    }

    //*** View Controllers ***//

    handleEnabledChange = () => {
        let collection = this.state.collection;
        collection.enabled = !(collection.enabled === true);
        this.setState({collection: collection});
    };

    handleTypeChange = (value) => {
        let collection = this.state.collection;
        if (value === 'category') {
            collection.tags.splice(collection.tags.indexOf('collection'), 1);
            collection.tags.push('category');
        } else if (value === 'collection') {
            collection.tags.splice(collection.tags.indexOf('category'), 1);
            collection.tags.push('collection');
        } else {
            debug(`(ERROR) Invalid collection type: ${value}`);
        }
        this.setState({collection: collection});
    };

    handleSectionChange = (tag) => {
        let collection = this.state.collection;
        if (collection.tags.indexOf(tag) === -1) {
            collection.tags.push(tag);
        } else {
            collection.tags.splice(collection.tags.indexOf(tag), 1);
        }
        this.setState({collection: collection});
    };

    handleNameChange = (value) => {
        let collection = this.state.collection;
        collection.name = value;
        this.setState({collection: value});
    };

    handleFieldChange = (field, value) => {
        let collection = this.state.collection;
        if (!collection[field]) {
            collection[field] = {};
        }
        collection[field] = value;
        this.setState({collection: collection});
    };

    handleImageLibraryChange = (images) => {
        let collection = this.state.collection;
        collection.images = images;
        this.setState({collection: collection});
    };

    handleParentCollectionChange = (collectionId) => {
        let collection = this.state.collection;
        collection.parentId = collectionId;
        this.setState({collection: collection});
    };

    handleSaveClick = () => {
        // Client-side validations
        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.collection.name) {
            fieldErrors.name = 'Este campo es obligatorio';
        }
        this.setState({fieldErrors: fieldErrors});

        // Client-side validation checked, trigger update request
        if (Object.keys(fieldErrors).length === 0) {
            let collection = this.state.collection;
            this.context.executeAction(updateCollection, {
                id: collection.id,
                data: {
                    enabled: collection.enabled,
                    name: collection.name,
                    description: collection.description,
                    tags: collection.tags,
                    images: collection.images,
                    parentId: collection.parentId,
                    metadata: collection.metadata
                }
            });
        }
    };

    // Delete colecction Modal

    handleDeleteCollectionModalClick = () => {
        this.setState({showDeleteCollectionModal: true});
    };

    handleDeleteCancelClick = () => {
        this.setState({showDeleteCollectionModal: false});
    };

    handleDeleteCollectionClick = () => {
        this.context.executeAction(deleteCollection, this.state.collection.id);
        this.setState({showDeleteCollectionModal: false});
    };

    //*** Template ***//

    render() {

        let collectionTypeOptions = [
            {name: 'Categoría', value: 'category'},
            {name: 'Colección', value: 'collection'}
        ];

        let selectedOption;
        // Won't work if we are in "404 Not Found", thus, no collection object
        if (this.state.collection) {
            if (this.state.collection.tags.indexOf('category') != -1) {
                selectedOption = 'category';
            } else if (this.state.collection.tags.indexOf('collection') != -1) {
                selectedOption = 'collection';
            }
        }

        let fieldError = (field) => {
            return this.state.fieldErrors[field];
        };

        /// Delete Modal
        let deleteCollectionModal = () => {
            if (this.state.showDeleteCollectionModal) {
                return (
                    <Modal title='Desea confirmar la eliminacion?'>
                    <DeleteHandler onCancelClick={this.handleDeleteCancelClick}
                                         onSubmitClick={this.handleDeleteCollectionClick} />
                    </Modal>
                );
            }
        };


        //
        // Return
        //
        return (
            <div className="admin-collections-edit">
            {deleteCollectionModal()}
                <div className="admin-collections-edit__header">
                    <div className="admin-collections-edit__title">
                        <Heading size="medium">
                            Editar Colección
                        </Heading>
                    </div>
                    {this.state.collection ?
                        <div className="admin-collections-edit__toolbar">
                            <div className="admin-collections-edit__toolbar-item">
                                <Link to="adm-collections">
                                    <Button type="default" disabled={this.state.loading}>
                                        Volver
                                    </Button>
                                </Link>
                            </div>
                            <div className="admin-collections-edit__toolbar-item">
                                <Button type="primary" onClick={this.handleSaveClick} disabled={this.state.loading}>
                                    Guardar
                                </Button>
                            </div>
                            <div className="admin-collections-edit__toolbar-item">
                              <Button type="primary" onClick={this.handleDeleteCollectionModalClick} disabled={this.state.loading}>
                                  Borrar
                              </Button>
                          </div>
                        </div>
                        :
                        null
                    }
                </div>
                {!this.state.collection ?
                    <NotFound />
                    :
                    <div className="admin-collections-edit__form">
                        <div className="admin-collections-edit__left-column">
                            <div className="admin-collection-edit__form-item">
                                <ToggleSwitch label='Activada'
                                              enabled={this.state.collection.enabled === true}
                                              onChange={this.handleEnabledChange} />
                            </div>
                            <div className="admin-collection-edit__form-item">
                                <Select label='Tipo'
                                        placeholder
                                        options={collectionTypeOptions}
                                        onChange={this.handleTypeChange}
                                        value={selectedOption} />
                            </div>
                            <div className="admin-collection-edit__form-item">
                                <div className="admin-collection-edit__checkbox-inline">
                                    <div className="admin-collection-edit__checkbox-inline-label">
                                        <FormLabel>
                                            Destacados en Secciones
                                        </FormLabel>
                                    </div>
                                    <div className="admin-collection-edit__checkbox-inline-items">
                                        <Checkbox label='Menu Principal'
                                                  onChange={this.handleSectionChange.bind(null, 'mainNavigation')}
                                                  checked={this.state.collection.tags.indexOf('mainNavigation') !== -1} />
                                        <Checkbox label='Página Principal'
                                                  onChange={this.handleSectionChange.bind(null, 'homepage')}
                                                  checked={this.state.collection.tags.indexOf('homepage') !== -1} />
                                    </div>
                                </div>
                            </div>
                            <div className="admin-collection-edit__form-item">
                                <InputField label='Nombre'
                                            onChange={this.handleNameChange}
                                            value={this.state.collection.name}
                                            error={fieldError('name')} />
                            </div>
                            <div className="admin-collection-edit__form-item">
                                    <Textarea label='Descripción'
                                              rows="5"
                                              onChange={this.handleFieldChange.bind(null, 'description')}
                                              value={this.state.collection.description ? this.state.collection.description : null}
                                              error={fieldError('description')} />
                            </div>
                            <div className="admin-collection-edit__form-item">
                                <ImageLibraryManager images={this.state.collection.images}
                                                     onChange={this.handleImageLibraryChange} />
                            </div>
                        </div>
                        <div className="admin-collections-edit__right-column">
                            <TreeMenu items={this.state.collectionsTree}
                                      selected={this.state.collection.parentId}
                                      self={this.state.collection.id}
                                      onClick={this.handleParentCollectionChange}>
                                Colección Padre
                            </TreeMenu>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

/**
 * Flux
 */
AdminCollectionsEdit = connectToStores(AdminCollectionsEdit, [CollectionDetailsStore, CollectionsStore], (context) => {
    return {
        _collection: context.getStore(CollectionDetailsStore).getCollection(),
        _error: context.getStore(CollectionDetailsStore).getError(),
        _loading: context.getStore(CollectionDetailsStore).isLoading(),
        _collectionsTree: context.getStore(CollectionsStore).getCollectionsTree()
    };
});

/**
 * Exports
 */
export default AdminCollectionsEdit;
