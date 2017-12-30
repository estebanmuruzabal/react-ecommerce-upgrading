/**
 * Imports
 */
import React from 'react';
import async from 'async';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {slugify} from '../../../utils/strings';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
// Flux
import CartStore from '../../../stores/Cart/CartStore';
import CollectionsStore from '../../../stores/Collections/CollectionsStore';
import ProductContentsStore from '../../../stores/Products/ProductContentsStore';
import ProductDetailsStore from '../../../stores/Products/ProductDetailsStore';
import ProductSuggestionsStore from '../../../stores/Products/ProductSuggestionsStore';
import addToCart from '../../../actions/Cart/addToCart';
import clearSuggestionsList from '../../../actions/Products/clearSuggestionsList';
import fetchProductContent from '../../../actions/Products/fetchProductContent';
import fetchProductSuggestions from '../../../actions/Products/fetchProductSuggestions';
import fetchProductAndCheckIfFound from '../../../actions/Products/fetchProductAndCheckIfFound';
import updateProduct from '../../../actions/Admin/updateProduct';
import triggerDrawer from '../../../actions/Application/triggerDrawer';

// Required components
import ArticleSummary from '../../common/articles/ArticleSummary';
import Breadcrumbs from '../../common/navigation/Breadcrumbs';
import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import ImageGallery from '../../common/images/ImageGallery';
import NotFound from '../../pages/NotFound/NotFound';
import InputField from '../../common/forms/InputField';
import ProductSuggestions from '../../common/products/ProductSuggestions';
import QuantitySelector from '../../common/forms/QuantitySelector';
import ToggleSwitch from '../../common/buttons/ToggleSwitch';
import Select from '../../common/forms/Select';
import Textarea from '../../common/forms/Textarea';
import Text from '../../common/typography/Text';
import RadioSelect from '../../common/forms/RadioSelect';
import FilesLibraryManager from '../../containers/files/FilesLibraryManager';

// Translation data for this component
import intlData from './ProductPage.intl';

/**
 * Component
 */
class ProductPage extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired
    };

    //*** Required Data ***//

    static fetchData = function (context, params, query, done) {
        async.parallel([
            function (callback) {
                context.executeAction(fetchProductAndCheckIfFound, params.productId, callback);
            },
            function (callback) {
                context.executeAction(fetchProductContent, null, callback);
            }
        ], done);

    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context) {
        let product = context.getStore(ProductDetailsStore).getProduct();
        if (product) {
            return {
                title: context.getStore(IntlStore).getMessage(product.name)
            }
        } else {
            return {
                title: 'Product Not Found'
            }
        }
    };

    //*** Helper Methods ***//

    getQuantityInCart = () => {
        let quantity = 0;
        if (this.props._product) {
            this.props._cartProducts.filter((product) => {
                return product.id === this.props._product.id;
            }).forEach(function (product) {
                quantity += product.quantity;
            });
        }
        return quantity;
    };

    //*** Initial State ***//

    state = {
        cartLoading: this.context.getStore(CartStore).isLoading(),
        cartProducts: this.context.getStore(CartStore).getProducts(),
        product: this.context.getStore(ProductDetailsStore).getProduct(),
        contents: this.context.getStore(ProductContentsStore).getContents(),
        addingToCart: false,
        suggestions: this.context.getStore(ProductSuggestionsStore).getProducts(),
        suggestionsLoading: this.context.getStore(ProductSuggestionsStore).isLoading(),
        placeholderImage: undefined,
        quantity: 1,
        fieldErrors: {},
        isFotocopia: false,
        pagetype: undefined,
        pagesnum: undefined,
        files: [],
        anillado: false,
        doblefaz: true
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductPage.scss');

        // Load static files
        this.setState({
            placeholderImage: require('../../common/images/image_placeholder.png')
        });

        // If product has main collection, trigger fetching of cross-sell products
        if (this.state.product && this.state.product.metadata && this.state.product.metadata.mainCollection) {
            this.context.executeAction(fetchProductSuggestions, this.state.product);
        } else {
            this.context.executeAction(clearSuggestionsList);
        }

        if (this.state.product && this.state.product.tags.indexOf('fotocopias') !== -1) {
          this.setState({isFotocopia: true});
        }
    }

    componentWillReceiveProps(nextProps) {

        // --------------------- THIS IS VERY USEFUL TO READ! ---------------------
        // If product changed (because component is being "re-used") act accordingly
        // ------------------------------------------------------------------------
        if (this.state.product && nextProps._product && this.state.product.id !== nextProps._product.id) {

            // Reset quantity
            this.setState({quantity: 1});

            // If product has main collection, trigger fetching of cross-sell products
            if (nextProps._product && nextProps._product.metadata && nextProps._product.metadata.mainCollection) {
                this.context.executeAction(fetchProductSuggestions, nextProps._product);
            } else {
                this.context.executeAction(clearSuggestionsList);
            }
        }

        // Check for cart changes when we flagged that we were adding to cart
        if (this.state.addingToCart && this.state.cartLoading && !nextProps._cartLoading) {
            this.setState({
                addingToCart: false,
                quantity: 1
            });
            this.context.executeAction(triggerDrawer, 'cart');
        }

        let fieldErrors = {};
        if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
            nextProps._error.validation.keys.forEach(function (field) {
                if (field === 'comments') {
                    fieldErrors['comments'] = nextProps._error.validation.details[field];
                } else {
                    fieldErrors[field] = nextProps._error.validation.details[field];
                }
            });
        }


        this.setState({
            cartLoading: nextProps._cartLoading,
            cartProducts: nextProps._cartProducts,
            product: nextProps._product,
            contents: nextProps._contents,
            suggestions: nextProps._suggestions,
            suggestionsLoading: nextProps._suggestionsLoading,
            fieldErrors: fieldErrors
        });
    }

    //*** View Controllers ***//

    handleAddToCartClick = () => {
      if (this.state.isFotocopia) {
        //*** First update the  ***//


        // Client-side validations
        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.pagesnum) {
            fieldErrors.pagesnum = 'Este campo es obligatorio';
        }
        if (!this.state.pagetype) {
            fieldErrors.pagetype = 'Este campo es obligatorio';
        }

        if (!this.state.files[0]) {
            fieldErrors.files = 'Este campo es obligatorio';
        }

        this.setState({fieldErrors: fieldErrors});
        // Client-side validation checked, trigger update request
        if (Object.keys(fieldErrors).length === 0) {
            let product = this.state.product;
            let copyPriceTotal = 0;
            copyPriceTotal = product.pricing.retail * product.copies.pagesnum;

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
                    copies: {
                        pagetype: this.state.pagetype,
                        pagesnum: parseFloat(this.state.pagesnum),
                        files: this.state.files,
                        comments: product.copies.comments,
                        price: copyPriceTotal,
                        anillado: this.state.anillado,
                        doblefaz: this.state.doblefaz
                    },
                    metadata: product.metadata
                }
            });

            let payload = objectAssign({details: this.state.product}, {
                id: this.state.product.id,
                quantity: this.getQuantityInCart() + this.state.quantity
            });
            this.setState({addingToCart: true});
            this.context.executeAction(addToCart, payload);
          }
      } else {
        let payload = objectAssign({details: this.state.product}, {
            id: this.state.product.id,
            quantity: this.getQuantityInCart() + this.state.quantity
        });
        this.setState({addingToCart: true});
        this.context.executeAction(addToCart, payload);
      }

    };

    handleQuantityChange = (value) => {
        this.setState({quantity: value});
    };

    handleCopiesChange = (param, value) => {
        let product = this.state.product;
        product.copies[param] = value;
        this.state[param] = value;
        this.setState({product: product});
    };

    handleAnilladoChange = () => {
        let product = this.state.product;
        let anillado = this.state.anillado;
        product.copies.anillado = !(product.copies.anillado === true);
        anillado = !(product.copies.anillado === true);
        this.setState({product: product, anillado});
    };

    handleDobleFazChange = () => {
        let product = this.state.product;
        let doblefaz = this.state.doblefaz;
        product.copies.doblefaz = !(product.copies.doblefaz === true);
        doblefaz = !(product.copies.doblefaz === true);
        this.setState({product: product, doblefaz});
    };
    //*** Template ***//

    render() {


        let routeParams = {locale: intlStore.getCurrentLocale()}; // Base route params

        // Breadcrumbs
        let breadcrumbs = [
            {
                name: <FormattedMessage
                          message={intlStore.getMessage(intlData, 'homepage')}
                          locales={intlStore.getCurrentLocale()} />,
                to: 'homepage',
                params: routeParams
            },
            {
                name: <FormattedMessage
                    message={intlStore.getMessage(intlData, 'productsList')}
                    locales={intlStore.getCurrentLocale()} />,
                to: 'products',
                params: routeParams
            }
        ];

        let addCollectionToBreadcrumbs = (collectionId) => {
            let collection = this.context.getStore(CollectionsStore).getCollection(collectionId);
            if (collection) {
                breadcrumbs.push({
                    name: <FormattedMessage
                              message={intlStore.getMessage(collection.name)}
                              locales={intlStore.getCurrentLocale()} />,
                    to: 'collection-slug',
                    params: objectAssign({
                        collectionId: collection.id,
                        collectionSlug: slugify(intlStore.getMessage(collection.name))
                    }, routeParams)
                });
            }
        };

        // Stuff that only makes sense (and will crash otherwise) if product exists
        if (this.state.product) {

            // Look for Main Category
            if (this.state.product.metadata && this.state.product.metadata.mainCategory) {
                addCollectionToBreadcrumbs(this.state.product.metadata.mainCategory);
            }

            // Look for Main Collection
            if (this.state.product.metadata && this.state.product.metadata.mainCollection) {
                addCollectionToBreadcrumbs(this.state.product.metadata.mainCollection);
            }
        }

        let pageTypeOptions = [
            {name: intlStore.getMessage(intlData, 'oficio'), value: 'oficio'},
            {name: intlStore.getMessage(intlData, 'a4'), value: 'a4'}
        ];

        let fieldError = (field) => {
            return this.state.fieldErrors[field];
        };

        return (
            <div className="product-page">
                {!this.state.product ?
                    <NotFound />
                    :
                    <div>
                        <div className="product-page__header">
                            <Breadcrumbs links={breadcrumbs} weight="bold">
                                <FormattedMessage
                                    message={intlStore.getMessage(this.state.product.name)}
                                    locales={intlStore.getCurrentLocale()} />
                            </Breadcrumbs>
                        </div>

                        <div className="product-page__product" itemScope itemType="http://schema.org/Product">
                            <div className="product-page__gallery-container">
                                {this.state.product.images && this.state.product.images.length > 0 ?
                                    <div className="product-page__gallery">
                                        <span style={{display: 'none'}} itemProp="image">
                                            {`//${this.state.product.images[0].url}`}
                                        </span>
                                        <ImageGallery key={this.state.product.id} images={this.state.product.images} />
                                    </div>
                                    :
                                    <div className="product-page__gallery">
                                        <img src={this.state.placeholderImage} />
                                    </div>
                                }
                            </div>
                            <div className="product-page__details">
                                <div className="product-page__name" itemProp="name">
                                    <Heading size="large">
                                        <FormattedMessage
                                            message={intlStore.getMessage(this.state.product.name)}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Heading>
                                </div>
                                <div className="product-page__description">
                                    <div className="product-page__description-label">
                                        <Heading size="medium">
                                            <FormattedMessage
                                                message={intlStore.getMessage(intlData, 'descriptionLabel')}
                                                locales={intlStore.getCurrentLocale()} />
                                        </Heading>
                                    </div>
                                    {this.state.product.tags.includes('cajon') ?
                                    <div className="product-page__description-content" itemProp="description">
                                        {productDescription()}
                                    </div>
                                    :
                                    <div className="product-page__description-content" itemProp="description">
                                        <Text size="small">
                                            <FormattedMessage
                                                message={intlStore.getMessage(this.state.product.description)}
                                                locales={intlStore.getCurrentLocale()} />
                                        </Text>
                                    </div>
                                    }
                                </div>
                                {this.state.product.pricing ?
                                    <div className="product-page__price" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                                        <div style={{display: 'none'}} itemProp="price">
                                            {this.state.product.pricing.retail}
                                        </div>
                                        <div style={{display: 'none'}} itemProp="priceCurrency">
                                            {this.state.product.pricing.currency}
                                        </div>
                                        <div>
                                            <Text size="medium" weight="bold">
                                                Precio: <FormattedNumber
                                                    value={this.state.product.pricing.retail}
                                                    style="currency"
                                                    currency={this.state.product.pricing.currency} />
                                            </Text>
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                                <div className="product-page__sku">
                                    <Text size="small">
                                        Ref: <span itemProp="sku">{this.state.product.sku}</span>
                                    </Text>
                                </div>

                                { this.state.isFotocopia ?
                                    <div className="fotocopias-page__copies-form">
                                        <div className="product-page__quantity">
                                            <Text size="medium" weight="bold">
                                               <FormattedMessage message={intlStore.getMessage(intlData, 'quantityFotocopias')}
                                                              locales={intlStore.getCurrentLocale()} />
                                            </Text>
                                            <QuantitySelector value={this.state.quantity}
                                                              onChange={this.handleQuantityChange} />
                                        </div>
                                       <div className="fotocopias-page__form-item">
                                         <InputField label={intlStore.getMessage(intlData, 'pagesnum')}
                                                     value={this.state.pagesnum}
                                                     onChange={this.handleCopiesChange.bind(null, 'pagesnum')}
                                                     error={fieldError('pagesnum')} />
                                       </div>
                                       <div className="fotocopias-page__form-item-row">
                                          <div className="fotocopias-page__form-item-one">
                                               <Text size="medium" weight="bold">
                                                  <FormattedMessage message={intlStore.getMessage(intlData, 'pagetype')}
                                                                 locales={intlStore.getCurrentLocale()} />
                                               </Text>
                                               <RadioSelect options={pageTypeOptions}
                                                            onChange={this.handleCopiesChange.bind(null, 'pagetype')}
                                                            value={this.state.pagetype}
                                                            error={fieldError('pagetype')} />
                                           </div>
                                           <div className="fotocopias-page__form-item-one">
                                                <ToggleSwitch label={intlStore.getMessage(intlData, 'anillado')}
                                                          enabled={this.state.anillado === true}
                                                          onChange={this.handleAnilladoChange} />
                                            </div>
                                            <div className="fotocopias-page__form-item-one">
                                                <ToggleSwitch label={intlStore.getMessage(intlData, 'doblefaz')}
                                                        enabled={this.state.doblefaz === true}
                                                        onChange={this.handleDobleFazChange} />
                                            </div>
                                       </div>
                                       <div className="fotocopias-page__form-item">
                                           <Textarea label={intlStore.getMessage(intlData, 'comments')}
                                                     rows="5"
                                                     onChange={this.handleCopiesChange.bind(null, 'comments')}
                                                     error={fieldError('comments')} />
                                       </div>
                                       <div className="fotocopias-page__form-item">
                                         <Text size="medium" weight="bold">
                                            <FormattedMessage message={intlStore.getMessage(intlData, 'filestitle')}
                                                           locales={intlStore.getCurrentLocale()} />
                                         </Text>
                                          <FilesLibraryManager files={this.state.files}
                                                                onChange={this.handleCopiesChange.bind(null, 'files')}
                                                                error={fieldError('files')} />
                                        </div>
                                    </div>
                                    :
                                    <div className="product-page__quantity">
                                        <Text size="medium" weight="bold">
                                           <FormattedMessage message={intlStore.getMessage(intlData, 'quantity')}
                                                          locales={intlStore.getCurrentLocale()} />
                                        </Text>
                                        <QuantitySelector value={this.state.quantity}
                                                          onChange={this.handleQuantityChange} />
                                    </div>
                                }
                                <div className="product-page__add">

                                    <div className="product-page__add-buttons">
                                        {this.state.product.stock > 0 ?
                                            <Button type="primary"
                                                    onClick={this.handleAddToCartClick}
                                                    disabled={this.state.quantity <= 0 || this.state.cartLoading}>
                                                <FormattedMessage
                                                    message={intlStore.getMessage(intlData, 'addToCart')}
                                                    locales={intlStore.getCurrentLocale()} />
                                            </Button>
                                            :
                                            <Button type="primary" disabled={true}>
                                                <FormattedMessage
                                                    message={intlStore.getMessage(intlData, 'outOfStock')}
                                                    locales={intlStore.getCurrentLocale()} />
                                            </Button>
                                        }
                                    </div>
                                </div>

                                {this.state.contents.map(function (content) {
                                    return (
                                        <div className="product-page__content">
                                            <ArticleSummary content={content} />
                                        </div>
                                    );
                                })}
                              </div>
                            {!this.state.suggestionsLoading && this.state.suggestions.length === 0 ?
                                <div className="product-page__suggestions product-page__suggestions--no-border"></div>
                                :
                                <div className="product-page__suggestions">
                                    <ProductSuggestions products={this.state.suggestions} loading={this.state.suggestionsLoading}>
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'crossSell')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </ProductSuggestions>
                                </div>
                            }
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
ProductPage = connectToStores(ProductPage, [CartStore, ProductContentsStore, ProductDetailsStore, ProductSuggestionsStore], (context) => {
    return {
        _cartLoading: context.getStore(CartStore).isLoading(),
        _cartProducts: context.getStore(CartStore).getProducts(),
        _product: context.getStore(ProductDetailsStore).getProduct(),
        _contents: context.getStore(ProductContentsStore).getContents(),
        _suggestions: context.getStore(ProductSuggestionsStore).getProducts(),
        _suggestionsLoading: context.getStore(ProductSuggestionsStore).isLoading()
    };
});

/**
 * Exports
 */
export default ProductPage;
