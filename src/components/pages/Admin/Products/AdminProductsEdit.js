/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

// Flux
import CollectionsStore from '../../../../stores/Collections/CollectionsStore';
import ProductDetailsStore from '../../../../stores/Products/ProductDetailsStore';

import fetchProductAndCheckIfFound from '../../../../actions/Products/fetchProductAndCheckIfFound';
import updateProduct from '../../../../actions/Admin/updateProduct';

// Delete
import DeleteHandler from '../../../common/deleteHandler/DeleteHandler';
import deleteProduct from '../../../../actions/Admin/deleteProduct';
import Modal from '../../../common/modals/Modal';

// Required components
import Button from '../../../common/buttons/Button';
import Checkbox from '../../../common/forms/Checkbox';
import CollectionPicker from '../../../common/collections/CollectionPicker';
import Heading from '../../../common/typography/Heading';
import ImageLibraryManager from '../../../containers/images/ImageLibraryManager';
import InlineItems from '../../../common/forms/InlineItems';
import InputField from '../../../common/forms/InputField';
import NotFound from '../../NotFound/NotFound';
import Select from '../../../common/forms/Select';
import Spinner from '../../../common/indicators/Spinner';
import Textarea from '../../../common/forms/Textarea';
import ToggleSwitch from '../../../common/buttons/ToggleSwitch';

/**
 * Component
 */
class AdminProductsEdit extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        product: this.context.getStore(ProductDetailsStore).getProduct(),
        error: this.context.getStore(ProductDetailsStore).getError(),
        loading: this.context.getStore(ProductDetailsStore).isLoading(),
        categories: this.context.getStore(CollectionsStore).getCollections(['category']),
        collections: this.context.getStore(CollectionsStore).getCollections(['collection']),
        fieldErrors: {},
        showDeleteProductModal: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminProductsEdit.scss');

        // Load required data
        this.context.executeAction(fetchProductAndCheckIfFound, this.props.params.productId);
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
            nextProps._error.validation.keys.forEach(function (field) {
                if (field === 'description') {
                    fieldErrors['description'] = nextProps._error.validation.details[field];
                } else {
                    fieldErrors[field] = nextProps._error.validation.details[field];
                }
            });
        }

        this.setState({
            product: nextProps._product,
            error: nextProps._error,
            loading: nextProps._loading,
            categories: nextProps._categories,
            collections: nextProps._collections,
            fieldErrors: fieldErrors
        });
    }

    //*** View Controllers ***//

    handleEnabledChange = () => {
        let product = this.state.product;
        product.enabled = !(product.enabled === true);
        this.setState({product: product});
    };

    handleFieldChange = (field, value) => {
        let product = this.state.product;
        product[field] = value;
        this.setState({product: product});
    };

    handleIntlFieldChange = (field, value) => {
        let product = this.state.product;
        if (!product[field]) {
            product[field] = {};
        }
        product[field] = value;
        this.setState({product: product});
    };

    handleSectionChange = (tag) => {
        let product = this.state.product;
        if (!product.tags) {
            product.tags = [tag];
        } else if (product.tags.indexOf(tag) === -1) {
            product.tags.push(tag);
        } else {
            product.tags.splice(product.tags.indexOf(tag), 1);
        }
        this.setState({product: product});
    };

    handleCollectionPickerChange = (collections) => {
        let product = this.state.product;
        product.collections = collections;
        this.setState({product: product});
    };

    handleMainCategoryChange = (collectionId) => {
        let product = this.state.product;
        product.metadata.mainCategory = collectionId;
        this.setState({product: product});
    };

    handleMainCollectionChange = (collectionId) => {
        let product = this.state.product;
        product.metadata.mainCollection = collectionId;
        this.setState({product: product});
    };

    handleNameChange = (locale, value) => {
        let product = this.state.product;
        product.name[locale] = value;
        this.setState({product: product});
    };

    handlePricingChange = (param, value) => {
        let product = this.state.product;
        product.pricing[param] = value;
        this.setState({product: product});
    };

    handleImageLibraryChange = (images) => {
        let product = this.state.product;
        product.images = images;
        this.setState({product: product});
    };

    // Delete Product Modal

    handleDeleteProductModalClick = () => {
        this.setState({showDeleteProductModal: true});
    };

    handleDeleteCancelClick = () => {
        this.setState({showDeleteProductModal: false});
    };

    handleDeleteProductClick = () => {
        let product = this.state.product;
        this.context.executeAction(deleteProduct, product.id);
        this.setState({showDeleteProductModal: false});
    };

    handleSaveClick = () => {



        // Client-side validations
        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.product.name) {
            fieldErrors.name = 'Este campo es obligatorio';
        }
        this.setState({fieldErrors: fieldErrors});

        // Client-side validation checked, trigger update request
        if (Object.keys(fieldErrors).length === 0) {
            let product = this.state.product;
            this.context.executeAction(updateProduct, {
                id: product.id,
                data: {
                    enabled: product.enabled,
                    sku: product.sku,
                    name: product.name,
                    description: product.description,
                    images: product.images,
                    pricing: {
                        currency: product.pricing.currency,
                        list: parseFloat(product.pricing.list),
                        retail: parseFloat(product.pricing.retail),
                        vat: parseInt(product.pricing.vat)
                    },
                    stock: parseInt(product.stock),
                    tags: product.tags,
                    collections: product.collections,
                    metadata: product.metadata
                }
            });
        }
    };

    //*** Template ***//

    render() {

        let getCollectionType = (collectionId) => {
            let collection = this.context.getStore(CollectionsStore).getCollection(collectionId);
            if (collection && collection.tags.indexOf('category') !== -1 && collection.tags.indexOf('collection') === -1) {
                return 'category';
            } else if (collection && collection.tags.indexOf('collection') !== -1 && collection.tags.indexOf('category') === -1) {
                return 'collection';
            } else {
                return null;
            }
        };

        /// Delete Modal
        let deleteProductModal = () => {
            if (this.state.showDeleteProductModal) {
                return (
                    <Modal title='Confirma la eliminacion?'>
                    <DeleteHandler onCancelClick={this.handleDeleteCancelClick}
                                         onSubmitClick={this.handleDeleteProductClick} />
                    </Modal>
                );
            }
        };

        // Stuff that won't work if we are in "404 Not Found", thus, no product object
        let productCategories;
        let productCollections;
        if (this.state.product) {
            productCategories = this.state.product.collections.filter((collectionId) => {
                return getCollectionType(collectionId) === 'category';
            }).map((collectionId) => {
                let category = this.context.getStore(CollectionsStore).getCollection(collectionId);
                return {
                    value: category.id,
                    name: category.name
                }
            });

            productCollections = this.state.product.collections.filter((collectionId) => {
                return getCollectionType(collectionId) === 'collection';
            }).map((collectionId) => {
                let collection = this.context.getStore(CollectionsStore).getCollection(collectionId);
                return {
                    value: collection.id,
                    name: collection.name
                }
            });
        }

        let fieldError = (field) => {
            return this.state.fieldErrors[field];
        };

        //
        // Return
        //
        return (
            <div className="admin-products-edit">
            {deleteProductModal()}
                <div className="admin-products-edit__header">
                    <div className="admin-products-edit__title">
                        <Heading size="medium">
                            Editar Producto
                        </Heading>
                    </div>
                    {this.state.product ?
                        <div className="admin-products-edit__toolbar">
                            <div className="admin-products-edit__toolbar-item">
                                <Link to="adm-products">
                                    <Button type="default" disabled={this.state.loading}>
                                      Volver
                                    </Button>
                                </Link>
                            </div>
                            <div className="admin-products-edit__toolbar-item">
                                <Button type="primary" onClick={this.handleSaveClick} disabled={this.state.loading}>
                                  Guardar
                                </Button>
                            </div>
                            <div className="admin-products-edit__toolbar-item">
                              <Button type="primary" onClick={this.handleDeleteProductModalClick} disabled={this.state.loading}>
                                  Borrar
                              </Button>
                          </div>
                        </div>
                        :
                        null
                    }
                </div>

                {this.state.loading ?
                    <div className="admin-products-edit__spinner">
                        <Spinner />
                    </div>
                    :
                    null
                }
                {!this.state.loading && !this.state.product  ?
                    <NotFound />
                    :
                    null
                }
                {!this.state.loading && this.state.product ?
                    <div className="admin-products-edit__form">
                        <div className="admin-products-edit__left-column">
                            <div className="admin-products-edit__form-item">
                                <ToggleSwitch label='Activo'
                                              enabled={this.state.product.enabled === true}
                                              onChange={this.handleEnabledChange} />
                            </div>
                            <div className="admin-products-edit__form-item">
                                <InlineItems>
                                    <InputField label='SKU'
                                                onChange={this.handleFieldChange.bind(null, 'sku')}
                                                value={this.state.product.sku}
                                                error={fieldError('sku')} />
                                    <InputField label='Stock'
                                                onChange={this.handleFieldChange.bind(null, 'stock')}
                                                value={this.state.product.stock}
                                                error={fieldError('stock')} />
                                    <Select label='Categoría principal'
                                            placeholder
                                            options={productCategories}
                                            value={this.state.product.metadata.mainCategory}
                                            error={fieldError('mainCategory')}
                                            onChange={this.handleMainCategoryChange} />
                                    <Select label='Colección principal'
                                            placeholder
                                            options={productCollections}
                                            value={this.state.product.metadata.mainCollection}
                                            error={fieldError('mainCategory')}
                                            onChange={this.handleMainCollectionChange} />
                                </InlineItems>
                            </div>
                            <div className="admin-products-edit__form-item">
                                <InputField label='Nombre del producto'
                                            onChange={this.handleNameChange}
                                            value={this.state.product.name}
                                            error={fieldError('name')} />
                            </div>
                            <div className="admin-products-edit__form-item">
                                <Textarea label='Descripción'
                                          rows="5"
                                          onChange={this.handleIntlFieldChange.bind(null, 'description',)}
                                          value={this.state.product.description ? this.state.product.description : null}
                                          error={fieldError('description')} />
                            </div>
                            <div className="admin-products-edit__form-item">
                                <InlineItems label='Precio'>
                                    <InputField label='Currency'
                                                labelSize="small" labelWeight="normal"
                                                value={this.state.product.pricing.currency}
                                                onChange={this.handlePricingChange.bind(null, 'currency')}
                                                error={fieldError('pricing.currency')} />
                                    <InputField label='Precio de lista'
                                                labelSize="small" labelWeight="normal"
                                                value={this.state.product.pricing.list}
                                                onChange={this.handlePricingChange.bind(null, 'list')}
                                                error={fieldError('pricing.list')} />
                                    <InputField label='Precio de proveedor'
                                                labelSize="small" labelWeight="normal"
                                                value={this.state.product.pricing.retail}
                                                onChange={this.handlePricingChange.bind(null, 'retail')}
                                                error={fieldError('pricing.retail')} />
                                    <InputField label='IVA'
                                                labelSize="small" labelWeight="normal"
                                                value={this.state.product.pricing.vat}
                                                onChange={this.handlePricingChange.bind(null, 'vat')}
                                                error={fieldError('pricing.vat')} />
                                </InlineItems>
                            </div>
                            <div className="admin-products-edit__form-item">
                                <ImageLibraryManager images={this.state.product.images}
                                                     onChange={this.handleImageLibraryChange} />
                            </div>
                        </div>
                        <div className="admin-products-edit__right-column">
                            <div className="admin-products-edit__form-item">
                                <CollectionPicker collections={this.state.categories}
                                                  checked={this.state.product.collections}
                                                  onChange={this.handleCollectionPickerChange}>
                                    Categorias
                                </CollectionPicker>
                            </div>
                            <div className="admin-products-edit__form-item">
                                <CollectionPicker collections={this.state.collections}
                                                  checked={this.state.product.collections}
                                                  onChange={this.handleCollectionPickerChange}>
                                    Colecciones
                                </CollectionPicker>
                            </div>
                            <div className="admin-products-edit__form-item">
                                <InlineItems label='Secciones'>
                                    <Checkbox label='Homepage'
                                              onChange={this.handleSectionChange.bind(null, 'homepage')}
                                              checked={this.state.product.tags && this.state.product.tags.indexOf('homepage') !== -1} />
                                </InlineItems>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

/**
 * Flux
 */
AdminProductsEdit = connectToStores(AdminProductsEdit, [CollectionsStore, ProductDetailsStore], (context) => {
    return {
        _product: context.getStore(ProductDetailsStore).getProduct(),
        _error: context.getStore(ProductDetailsStore).getError(),
        _loading: context.getStore(ProductDetailsStore).isLoading(),
        _categories: context.getStore(CollectionsStore).getCollections(['category']),
        _collections: context.getStore(CollectionsStore).getCollections(['collection'])
    };
});

/**
 * Exports
 */
export default AdminProductsEdit;
