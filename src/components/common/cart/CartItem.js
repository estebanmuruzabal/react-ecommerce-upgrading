import React from 'react';
import {Link} from 'react-router';
import triggerDrawer from '../../../actions/Application/triggerDrawer';
import QuantitySelector from '../forms/QuantitySelector';
import Text from '../typography/Text';
import PropTypes from 'prop-types';
let debug = require('debug')('tienda765');

class CartItem extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        placeholderImage: undefined
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CartItem.scss');

        // Load static files
        this.setState({placeholderImage: require('../images/image_placeholder.png')});
    }

    //*** View Controllers ***//

    handleLinkClick = () => {
        this.context.executeAction(triggerDrawer, null);
    };

    //*** Template ***//

    render() {

        let product = this.props.product.details;
        let linkParams = {
            productId: product.id
        };

        return (
            <div className="cart-item">
                <div className="cart-item__frame">
                    <Link className="cart-item__link"
                          to="product" params={linkParams}
                          onClick={this.handleLinkClick}>
                        <img className="cart-item__image" src={product.images && product.images.length > 0 ? `//${product.images[0].url}` : this.state.placeholderImage} />
                    </Link>
                </div>
                <div className="cart-item__details">
                    { product.copies.price ?
                        <div>
                          <div className="name">
                              <Text size="small">
                                  <Link className="cart-item__link"
                                        to="product" params={linkParams}
                                        onClick={this.handleLinkClick}>
                                        {product.name}
                                  </Link>
                              </Text>
                          </div>
                          <div className="cart-item__price">
                              <Text size="small" weight="bold">
                                  ARS {product.copies.price}
                              </Text>
                          </div>
                        </div>
                        :
                        <div>
                          <div className="name">
                              <Text size="small">
                                  <Link className="cart-item__link" to="product" params={linkParams} onClick={this.handleLinkClick}>
                                      {product.name}
                                  </Link>
                              </Text>
                          </div>
                          <div className="cart-item__price">
                              <Text size="small" weight="bold">
                                ARS {product.pricing.retail}
                              </Text>
                          </div>
                        </div>
                     }
                    <div className="cart-item__quantity">
                        <QuantitySelector value={this.props.product.quantity}
                                          onChange={this.props.onQuantityChange} />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
CartItem.defaultProps = {
    onQuantityChange: function (value) { debug(`onQuantityChange not defined. Value: ${value}`); }
};

/**
 * Exports
 */
export default CartItem;
