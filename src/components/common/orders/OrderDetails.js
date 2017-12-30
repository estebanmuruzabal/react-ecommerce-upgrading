/**
 * Imports
 */
import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
import AddressPreview from '../forms/AddressPreview';
import Breakpoint from '../../core/Breakpoint';
import Heading from '../typography/Heading';
import Table from '../tables/Table';
import Text from '../typography/Text';

import OrderStatus from './OrderStatus';

/**
 * Component
 */
class OrderDetails extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./OrderDetails.scss');
    }

    //*** Template ***//

    render() {

        let headings = [
            <span>Nombre</span>,
            <span>ID</span>,
            <span>SKU</span>,
            <span>Cantidad</span>,
            <span>Precio</span>,
            <span>Hoja</span>,
            <span>Cant. de hojas</span>,
            <span>Archivo</span>,
            <span>Anillado</span>
        ];

        let rows = this.props.order.checkout.cart.products.map((product) => {
          if (product.details.copies && product.details.tags.indexOf('fotocopias') !== -1) {
            return {
                data: [
                    <Text size="medium">
                        {product.details.name}
                    </Text>,
                    <span className="order-details__link">
                        <Link to="product" params={objectAssign({productId: product.id})}>
                            <Text size="small">{product.id}</Text>
                        </Link>
                    </span>,
                    <Text size="medium">{product.details.sku}</Text>,
                    <Text size="medium">{product.quantity}</Text>,
                    <FormattedNumber value={product.details.pricing.retail}
                                     style="currency"
                                     currency={this.props.order.checkout.currency} />,
                    <Text size="medium">{product.details.copies.pagetype}</Text>,
                    <Text size="medium">{product.details.copies.pagesnum}</Text>,
                    <Text size="medium">{product.details.copies.files}</Text>,
                    <Text size="medium">{product.details.copies.anillado.toString()}</Text>
                ]
            };
          } else {
            return {
                data: [
                    <Text size="medium">
                        {product.details.name}
                    </Text>,
                    <span className="order-details__link">
                        <Link to="product" params={objectAssign({productId: product.id})}>
                            <Text size="small">{product.id}</Text>
                        </Link>
                    </span>,
                    <Text size="medium">{product.details.sku}</Text>,
                    <Text size="medium">{product.quantity}</Text>,
                    <Text size="medium">ARS {product.details.pricing.retail}</Text>
                ]
            };
          }
        });

        //
        // Return
        //
        return (
            <div className="order-details">
                <div className="order-details__overview">
                    {this.props.customerDetails !== false ?
                        <div className="order-details__overview-item">
                            <div className="order-details__overview-item-label">
                                <Text size="medium" weight="bold">
                                    Cliente:
                                </Text>
                            </div>
                            <div className="order-details__overview-item-value">
                                <Text size="medium">
                                    {this.props.order.customer.name} ({this.props.order.customer.email})
                                    {this.props.order.customer.userId ?
                                        <span className="order-details__user-icon">
                                        <i className="fa fa-user" aria-hidden="true" />
                                    </span>
                                        :
                                        null
                                    }
                                </Text>
                            </div>
                        </div>
                        :
                        null
                    }
                    <div className="order-details__overview-item">
                        <div className="order-details__overview-item-label">
                            <Text size="medium" weight="bold">
                                Creada en:
                            </Text>
                        </div>
                        <div className="order-details__overview-item-value">
                            <Text size="medium">
                                {moment(this.props.order.createdAt).format('YYYY/MM/DD HH:mm:ss')}
                            </Text>
                        </div>
                    </div>
                    <div className="order-details__overview-item">
                        <div className="order-details__overview-item-label">
                            <Text size="medium" weight="bold">
                                ID:
                            </Text>
                        </div>
                        <div className="order-details__overview-item-value">
                            <Text size="small">
                                {this.props.order.id}
                            </Text>
                        </div>
                    </div>
                    <div className="order-details__overview-item">
                        <div className="order-details__overview-item-label">
                            <Text size="medium" weight="bold">
                                Estado:
                            </Text>
                        </div>
                        <div className="order-details__overview-item-value">
                            <OrderStatus status={this.props.order.status} />
                        </div>
                    </div>
                </div>
                <div className="order-details__detail">
                    <Heading size="medium">
                        Datos de facturacción
                    </Heading>
                    <div className="order-details__detail-content">
                        <div>
                            <AddressPreview address={this.props.order.checkout.billingAddress} />
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                Método de Pago:
                            </Text>
                            <br />
                            <Text size="medium">{this.props.order.checkout.paymentMethod}</Text>
                        </div>
                    </div>

                </div>
                <div className="order-details__detail">
                    <Heading size="medium">
                        Datos de Envío
                    </Heading>
                    <div className="order-details__detail-content">
                        <div>
                            <AddressPreview address={this.props.order.checkout.shippingAddress} />
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                Método de envío:
                            </Text>
                            <br />
                            <Text size="medium">{this.props.order.checkout.shippingMethod}</Text>
                            <br />
                            <br />
                            <Text size="medium" weight="bold">
                                Costo de envío:
                            </Text>
                            <br />
                            <Text size="medium">
                                ARS {this.props.order.checkout.shippingCost}
                            </Text>
                            <br />
                            <br />
                            <Text size="medium" weight="bold">
                                Fecha de envío:
                            </Text>
                            <br />
                            <Text size="medium">
                                <Text size="medium">{this.props.order.checkout.shippingDay} </Text>
                                <Text size="medium">{this.props.order.checkout.shippingTime}</Text>
                            </Text>
                        </div>
                    </div>
                </div>
                <div className="order-details__detail">
                    <Heading size="medium">
                        Productos
                    </Heading>
                    <div className="order-details__detail-content">
                        <Breakpoint point="handhelds">
                            {rows.map(function (row, idx) {
                                return (
                                    <div key={idx} className="order-details__product-block">
                                        <div className="order-details__product-name">
                                            {row.data[0]}
                                        </div>
                                        <div className="order-details__product-quantity">
                                            {row.data[3]}&nbsp;x&nbsp;{row.data[4]}
                                        </div>
                                    </div>
                                );
                            })}
                        </Breakpoint>
                        <Breakpoint point="medium-screens">
                            <Table headings={headings} rows={rows} />
                        </Breakpoint>
                        <Breakpoint point="wide-screens">
                            <Table headings={headings} rows={rows} />
                        </Breakpoint>
                    </div>
                    <div className="order-details__detail-content order-details__detail-content--column">
                        <div>
                            <Text size="medium" weight="bold">
                              Subtotal:
                            </Text>
                            <br />
                            <FormattedNumber value={this.props.order.checkout.subTotal}
                                             style="currency"
                                             currency={this.props.order.checkout.currency} />
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                Envío:
                            </Text>
                            <br />
                            <FormattedNumber value={this.props.order.checkout.shippingCost}
                                             style="currency"
                                             currency={this.props.order.checkout.currency} />
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                IVA:
                            </Text>
                            <br />
                              ARS {this.props.order.checkout.vatTotal}
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                Total:
                            </Text>
                            <br />
                            ARS {this.props.order.checkout.total}
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
export default OrderDetails;
