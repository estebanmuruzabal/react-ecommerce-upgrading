import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {Link} from 'react-router';
import CartStore from '../../../stores/Cart/CartStore';
import addToCart from '../../../actions/Cart/addToCart';
import triggerDrawer from '../../../actions/Application/triggerDrawer';
import Button from '../buttons/Button';
import CartItem from './CartItem';
import Heading from '../typography/Heading';
import Text from '../typography/Text';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
/**
 * Component
 */
class SideCart extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        cart: this.context.getStore(CartStore).getCart(),
        cartLoading: this.context.getStore(CartStore).isLoading()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./SideCart.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cart: nextProps._cart,
            cartLoading: nextProps._cartLoading
        });
    }

    //*** View Controllers ***//

    handleContinueShoppingClick = () => {
        this.context.executeAction(triggerDrawer, null);
    };

    handleQuantityChange = (product, value) => {
        let payload = objectAssign({details: product.details}, {
            id: product.id,
            quantity: value
        });
        this.context.executeAction(addToCart, payload);
    };

    handleCheckoutClick = () => {
        this.context.executeAction(triggerDrawer, null);
    };

    //*** Template ***//

    render() {

        // Process Subtotal
        let subTotal = {value: 0, currency: undefined};
        if (this.state.cart && this.state.cart.products.length > 0) {
            this.state.cart.products.forEach(function (product) {
                if (!subTotal.currency) {
                    subTotal.currency = product.details.pricing.currency;
                }

                if (product.details.copies && product.details.tags.indexOf('fotocopias') !== -1) {
                    if (product.details.copies.anillado) {
                    subTotal.value += product.details.copies.price * product.quantity;
                    subTotal.value += 35;
                    } else if (product.details.copies) {
                    subTotal.value += product.details.copies.price * product.quantity;
                   }
                } else {
                 subTotal.value += product.details.pricing.retail * product.quantity;
               }
            });
        }

        return (
            <div className="side-cart">
                {this.state.cart && this.state.cart.products.length > 0 ?
                    <div>
                        <div className="side-cart__header">
                            <Heading size="small">
                                Su carrito de compras
                            </Heading>
                        </div>
                        <div className="side-cart__products">
                            {this.state.cart.products.map((product, idx) => {
                                return (
                                    <div key={idx} className="side-cart__item">
                                        <CartItem product={product}
                                                  onQuantityChange={this.handleQuantityChange.bind(null, product)} />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="side-cart__subtotal">
                            <div className="side-cart__subtotal-label">
                                <Text size="medium" transform="uppercase" weight="bold">
                                  Subtotal
                                </Text>
                            </div>
                            <div className="side-cart__subtotal-value">
                                <Text size="medium">
                                  ARS {subTotal.value}
                                </Text>
                            </div>
                        </div>
                        <div className="side-cart__actions">
                            <div className="side-cart__btn">
                                {!this.state.cartLoading ?
                                    <Link to="checkout" params={routeParams}>
                                        <Button type="primary" onClick={this.handleCheckoutClick} disabled={this.state.cartLoading}>
                                            Finalizar
                                        </Button>
                                    </Link>
                                    :
                                    <Button type="primary" disabled={true}>
                                        Finalizar
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className="side-cart__empty">
                        <div className="side-cart__empty-action" onClick={this.handleContinueShoppingClick}>
                            <Text size="small">
                                Continuar comprando
                            </Text>
                        </div>
                        <div className="side-cart__empty-message">
                            <Text size="medium" transform="uppercase">
                                Su carrito esta vacío
                            </Text>
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
SideCart = connectToStores(SideCart, [CartStore], (context) => {
    return {
        _cart: context.getStore(CartStore).getCart(),
        _cartLoading: context.getStore(CartStore).isLoading()
    };
});

/**
 * Exports
 */
export default SideCart;
