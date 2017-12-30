/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import objectAssign from 'object-assign';
import {Link} from 'react-router';

// Flux
import ProductsAddStore from '../../../../stores/Products/ProductsAddStore';
import ProductsListStore from '../../../../stores/Products/ProductsListStore';
import PropTypes from 'prop-types';
import addProduct from '../../../../actions/Admin/addProduct';
import fetchProducts from '../../../../actions/Products/fetchProducts';
import productsUpload from '../../../../actions/Admin/productsUpload';

// Required components
import Button from '../../../common/buttons/Button';
import Heading from '../../../common/typography/Heading';
import Label from '../../../common/indicators/Label';
import Modal from '../../../common/modals/Modal';
import Spinner from '../../../common/indicators/Spinner';
import StatusIndicator from '../../../common/indicators/StatusIndicator';
import Table from '../../../common/tables/Table';
import Text from '../../../common/typography/Text';

import AdminProductsAddForm from './AdminProductsAddForm';
import AdminProductsUpload from './AdminProductsUpload';

/**
 * Component
 */
class AdminProducts extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired,
        router: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        addProduct: this.context.getStore(ProductsAddStore).getState(),
        products: this.context.getStore(ProductsListStore).getProducts(),
        loading: true,
        showUploadModal: false,
        showNewProductModal: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminProducts.scss');

        // Load required data
        this.context.executeAction(fetchProducts, {perPage: 200, sort: 'sku'});
    }

    componentWillReceiveProps(nextProps) {

        // If new product was being added and was successful, redirect to
        // product edit page
        if (this.state.addProduct.loading === true
            && nextProps._addProduct.loading === false && !nextProps._addProduct.error) {
            let params = {
                productId: nextProps._addProduct.product.id
            };
            this.context.router.transitionTo('adm-product-edit', params);
        }

        this.setState({
            addProduct: nextProps._addProduct,
            products: nextProps._products,
            loading: nextProps._loading
        });
    }

    //*** View Controllers ***//

    // Upload Modal

    handleUploadClick = () => {
        this.setState({showUploadModal: true});
    };

    handleUploadCloseClick = () => {
        this.setState({showUploadModal: false});
    };

    handleUploadSubmitClick = (data) => {
        this.context.executeAction(productsUpload, data);
    };

    // New Product Modal

    handleNewProductClick = () => {
        this.setState({showNewProductModal: true});
    };

    handleNewProductCloseClick = () => {
        this.setState({showNewProductModal: false});
    };

    handleNewProductSubmitClick = (data) => {
        this.context.executeAction(addProduct, data);
    };

    //*** Template ***//

    render() {
        let uploadModal = () => {
            if (this.state.showUploadModal) {
                return (
                    <Modal title='Subir producto nuevo'
                           onCloseClick={this.handleUploadCloseClick}>
                        <AdminProductsUpload onCancelClick={this.handleUploadCloseClick}
                                             onSubmitClick={this.handleUploadSubmitClick} />
                    </Modal>
                );
            }
        };

        let newProductModal = () => {
            if (this.state.showNewProductModal) {
                return (
                    <Modal title='Producto nuevo'
                           onCloseClick={this.handleNewProductCloseClick}>
                       <AdminProductsAddForm
                           loading={this.state.addProduct.loading}
                           error={(this.state.addProduct.error && this.state.addProduct.error.validation) ? this.state.addProduct.error.validation.details : null}
                           onCancelClick={this.handleNewProductCloseClick}
                           onSubmitClick={this.handleNewProductSubmitClick} />
                    </Modal>
                );
            }
        };

        let getProductSections = function (product) {
            return (
                <div className="admin-products__labels">
                    {product.tags && product.tags.map(function (section, idx) {
                        return (
                            <div key={idx} className="admin-products__label">
                                <Label>
                                    {section}
                                </Label>
                            </div>
                        );
                    })}
                </div>
            );
        };

        let headings = [
            'SKU',
            'Producto',
            'Stock',
            'Imagen',
            'Secciones',
            'Activo'
        ];

        let rows = this.state.products.map(function (product) {
            return {
                highlight: (product.enabled === true && product.images.length == 0) ? 'warning' : null,
                data: [
                    <Text size="medium">{product.sku}</Text>,
                    <span className="admin-products__link">
                        <Link to="adm-product-edit" params={objectAssign({productId: product.id}, routeParams)}>
                          {product.name}
                        </Link>
                    </span>,
                    <StatusIndicator status={(product.stock > 5) ? 'success' : 'error'} />,
                    <StatusIndicator status={(product.images.length > 0) ? 'success' : 'default'} />,
                    <Text size="medium">{getProductSections(product)}</Text>,
                    <StatusIndicator status={(product.enabled === true) ? 'success' : 'default'} />
                ]
            };
        });

        //
        // Return
        //
        return (
            <div className="admin-products">
                {uploadModal()}
                {newProductModal()}

                <div className="admin-products__header">
                    <div className="admin-products__title">
                        <Heading size="medium">
                            Productos
                        </Heading>
                    </div>
                    <div className="admin-products__toolbar">
                        <div className="admin-products__toolbar-button">
                            <Button type="default" onClick={this.handleUploadClick}>
                                Subir
                            </Button>
                        </div>
                        <div className="admin-products__toolbar-button">
                            <Button type="primary" onClick={this.handleNewProductClick}>
                                Nuevo
                            </Button>
                        </div>
                    </div>
                </div>

                {this.state.loading ?
                    <div className="admin-products__spinner">
                        <Spinner />
                    </div>
                    :
                    null
                }
                {!this.state.loading && this.state.products.length > 0 ?
                    <div className="admin-products__list">
                        <Table headings={headings} rows={rows} />
                    </div>
                    :
                    null
                }
                {!this.state.loading && this.state.products.length === 0 ?
                    <div className="admin-products__no-results">
                        <Text size="small">
                            No hay resultados
                        </Text>
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
AdminProducts = connectToStores(AdminProducts, [ProductsAddStore, ProductsListStore], (context) => {
    return {
        _addProduct: context.getStore(ProductsAddStore).getState(),
        _products: context.getStore(ProductsListStore).getProducts(),
        _loading: context.getStore(ProductsListStore).isLoading()
    };
});

/**
 * Exports
 */
export default AdminProducts;
