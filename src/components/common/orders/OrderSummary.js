import React from 'react';
import Breakpoint from '../../core/Breakpoint';
import Text from '../../common/typography/Text';
import PropTypes from 'prop-types';
class OrderSummary extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./OrderSummary.scss');
    }

    //*** Template ***//

    render() {

        let subTotal = {value: 0, currency: undefined};
        let total = {value: 0, currency: undefined};
        let anilladoProduct = false;
        if (this.props.checkout.cart && this.props.checkout.cart.products.length > 0) {
            this.props.checkout.cart.products.forEach(function (product) {
                if (!subTotal.currency) {
                    subTotal.currency = product.details.pricing.currency;
                }

                if (product.details.copies && product.details.tags.indexOf('fotocopias') !== -1) {
                  if (product.details.copies.anillado) {
                    subTotal.value += product.details.copies.price * product.quantity;
                    subTotal.value += 35;
                    anilladoProduct = true;
                  } else if (product.details.copies) {
                    subTotal.value += product.details.copies.price * product.quantity;
                  }
                } else {
                  subTotal.value += product.details.pricing.retail * product.quantity;
                }
            });
        }

        let anilladoDiv = () => {
            if (anilladoProduct) {
                return (
                  <div key={5} className="order-summary__row order-summary__item">
                       <div className="order-summary__list-name">
                           <Breakpoint point="handhelds">
                               <Text size="small">
                                 Anillado
                               </Text>
                           </Breakpoint>
                           <Breakpoint point="medium-screens">
                               <Text>
                                  Anillado
                               </Text>
                           </Breakpoint>
                           <Breakpoint point="wide-screens">
                               <Text>
                                  Anillado
                               </Text>
                           </Breakpoint>
                       </div>
                       <div className="order-summary__list-quantity-price">
                           <Text>{1}</Text>
                           &nbsp;x&nbsp;
                           <Text>
                               ARS 35
                           </Text>
                       </div>
                       <div className="order-summary__list-total">
                           <Text>
                               ARS 35
                           </Text>
                       </div>
                  </div>
                );
            }
        };

        return (
            <div className="order-summary">
                <div className="order-summary__list">
                    <div className="order-summary__row order-summary__item-labels">
                        <div className="order-summary__list-name">
                            <Text size="small">
                                Producto
                            </Text>
                        </div>
                        <div className="order-summary__list-quantity-price">
                            <Text size="small">
                                Cantidad / Precio
                            </Text>
                        </div>
                        <div className="order-summary__list-total">
                            <Text size="small">
                                Total
                            </Text>
                        </div>
                    </div>
                    {this.props.checkout.cart.products.map(function (product, idx) {
                        return (
                              <div>
                              { product.details.copies.price ?
                                  <div>
                                       <div key={idx} className="order-summary__row order-summary__item">
                                            <div className="order-summary__list-name">
                                                <Breakpoint point="handhelds">
                                                    <Text size="small">
                                                        {product.details.name}
                                                    </Text>
                                                </Breakpoint>
                                                <Breakpoint point="medium-screens">
                                                    <Text>
                                                        {product.details.name}
                                                    </Text>
                                                </Breakpoint>
                                                <Breakpoint point="wide-screens">
                                                    <Text>
                                                        {product.details.name}
                                                    </Text>
                                                </Breakpoint>
                                            </div>
                                            <div className="order-summary__list-quantity-price">
                                                <Text>
                                                    {product.quantity}
                                                </Text>
                                                &nbsp;x&nbsp;
                                                <Text>
                                                  ARS {product.details.copies.price}
                                                </Text>
                                            </div>
                                            <div className="order-summary__list-total">
                                                <Text>
                                                  ARS {product.quantity * product.details.copies.price}
                                                </Text>
                                            </div>
                                        </div>
                                        {anilladoDiv()}
                                    </div>
                                    :
                                    <div>
                                      <div key={idx} className="order-summary__row order-summary__item">
                                        <div className="order-summary__list-name">
                                            <Breakpoint point="handhelds">
                                                <Text size="small">
                                                    {product.details.name}
                                                </Text>
                                            </Breakpoint>
                                            <Breakpoint point="medium-screens">
                                                <Text>
                                                    {product.details.name}
                                                </Text>
                                            </Breakpoint>
                                            <Breakpoint point="wide-screens">
                                                <Text>
                                                    {product.details.name}
                                                </Text>
                                            </Breakpoint>
                                        </div>
                                        <div className="order-summary__list-quantity-price">
                                            <Text>
                                                {product.quantity}
                                            </Text>
                                            &nbsp;x&nbsp;
                                            <Text>
                                                ARS {product.details.pricing.retail}
                                            </Text>
                                        </div>
                                        <div className="order-summary__list-total">
                                            <Text>
                                                ARS {product.quantity * product.details.pricing.retail}
                                            </Text>
                                        </div>
                                      </div>
                                    </div>
                                }
                            </div>
                        );
                    })}
                </div>

                <div className="order-summary__totals">
                    <div className="order-summary__row">
                        <div className="order-summary__totals-label">
                            <Text>
                                Subtotal
                            </Text>
                        </div>
                        <div className="order-summary__totals-value">
                            <Text>
                              ARS {subTotal.value}
                            </Text>
                        </div>
                    </div>
                    <div className="order-summary__row">
                        <div className="order-summary__totals-label">
                            <Text>
                                Costo de envío
                            </Text>
                        </div>
                        <div className="order-summary__totals-value">
                            {this.props.checkout.hasOwnProperty('shippingCost') ?
                                <Text>
                                  ARS {this.props.checkout.shippingCost}
                                </Text>
                                :
                                <Text>-</Text>
                            }
                        </div>
                    </div>
                    <div className="order-summary__row">
                        <div className="order-summary__totals-label">
                            <Text weight="bold">
                              Total
                            </Text>
                        </div>
                        <div className="order-summary__totals-value">
                            {this.props.checkout.hasOwnProperty('shippingCost') ?
                            <Text weight="bold">
                                {subTotal.value + this.props.checkout.shippingCost}
                            </Text>
                                :
                                <Text weight="bold">
                                    {subTotal.value}
                                </Text>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default OrderSummary;
