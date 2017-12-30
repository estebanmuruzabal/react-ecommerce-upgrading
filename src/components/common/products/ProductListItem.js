/**
 * Imports
 */
import React from 'react';
import {Link} from 'react-router';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {slugify} from '../../../utils/strings';
import objectAssign from 'object-assign';
// Flux
import CartStore from '../../../stores/Cart/CartStore';
import addToCart from '../../../actions/Cart/addToCart';
import PropTypes from 'prop-types';
import triggerDrawer from '../../../actions/Application/triggerDrawer';

// Required components
import Text from '../typography/Text';
import QuantitySelector from '../../common/forms/QuantitySelector';
import Button from '../../common/buttons/Button';

/**
 * Component
 */
class ProductListItem extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired,
        executeAction: PropTypes.func.isRequired,
    };

    //*** Initial State ***//

    state = {
        productPlaceholderImage: undefined,
        quantity:1,
        cartLoading: this.context.getStore(CartStore).isLoading(),
        cartProducts: this.context.getStore(CartStore).getProducts(),
        addingToCart: false,
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductListItem.scss');

        // Load static files
        this.setState({
            productPlaceholderImage: require('../images/image_placeholder.png')
        });
    }

    componentWillReceiveProps(nextProps) {
        // Check for cart changes when we flagged that we were adding to cart
        if (this.state.addingToCart && this.state.cartLoading && !nextProps._cartLoading) {
            this.setState({
                addingToCart: false,
                quantity: 1
            });
            this.context.executeAction(triggerDrawer, 'cart');
        }

        this.setState({
            cartLoading: nextProps._cartLoading,
            cartProducts: nextProps._cartProducts
        });
    }

    getQuantityInCart = () => {
        let quantity = 0;
        if (this.props._product) {
            this.state._cartProducts.filter((product) => {
                return product.id === this.props._product.id;
            }).forEach(function (product) {
                quantity += product.quantity;
            });
        }
        return quantity;
    };

    handleAddToCartClick = () => {
        let payload = objectAssign({details: this.props.product}, {
            id: this.props.product.id,
            quantity: this.getQuantityInCart() + this.state.quantity
        });
        this.setState({addingToCart: true});
        this.context.executeAction(addToCart, payload);
      }

    handleQuantityChange = (value) => {
        this.setState({quantity: value});
    };

    render() {



        return (
            <div className="product-list-item" itemScope itemType="http://schema.org/Product">
                <div className="product-list-item__name" itemProp="name">
                    <Text size="medium" weight="bold">
                      {this.props.product.name}
                    </Text>
                    <span style={{display: 'none'}} itemProp="sku">{this.props.product.sku}</span>
                </div>
                <div>
                    {this.props.product.images && this.props.product.images.length > 0 ?
                        <span className="product-list-item__image" itemProp="image">
                            {`//${this.props.product.images[0].url}`}
                        </span>
                        :
                        null
                    }
                    {this.props.product.images && this.props.product.images.length > 0 ?
                        <img className="product-list-item__image-2" src={`//${this.props.product.images[0].url}`} />
                        :
                        <img className="product-list-item__image-2" src={this.state.productPlaceholderImage} />
                    }
                </div>
                {this.props.product.pricing ?
                    <div className="product-list-item__price" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                        <div style={{display: 'none'}} itemProp="price">
                            {this.props.product.pricing.retail}
                        </div>
                        <div style={{display: 'none'}} itemProp="priceCurrency">
                            {this.props.product.pricing.currency}
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                $ <FormattedNumber value={this.props.product.pricing.retail} />
                            </Text>
                        </div>
                    </div>
                    :
                    null
                }
                <div className="product-page__quantity">
                    <Text size="medium" weight="bold">
                      Cantidad
                    </Text>
                    <QuantitySelector value={this.state.quantity}
                                      onChange={this.handleQuantityChange} />
                </div>
                <div className="product-page__add">
                    <div className="product-page__add-buttons">
                        {this.props.product.stock > 0 ?
                            <Button type="primary"
                                    onClick={this.handleAddToCartClick}
                                    disabled={this.props.quantity <= 0 || this.state.cartLoading}>
                                Comprar
                            </Button>
                            :
                            <Button type="primary" disabled={true}>
                                Sin stock
                            </Button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

ProductListItem = connectToStores(ProductListItem, [CartStore], (context) => {
    return {
        _cartLoading: context.getStore(CartStore).isLoading(),
        _cartProducts: context.getStore(CartStore).getProducts()
    };
});

export default ProductListItem;
