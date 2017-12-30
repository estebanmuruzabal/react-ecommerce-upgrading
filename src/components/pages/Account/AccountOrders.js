/**
 * Imports
 */
import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
// Required components
import Breakpoint from '../../core/Breakpoint';
import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import OrderSummary from '../../common/orders/OrderSummary';
import OrderStatus from '../../common/orders/OrderStatus';
import Spinner from '../../common/indicators/Spinner';
import Table from '../../common/tables/Table';
import Text from '../../common/typography/Text';

/**
 * Component
 */
class AccountOrders extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AccountOrders.scss');
    }

    //*** Template ***//

    render() {

        // Order list table headings
        let headings = ['Fecha','Estado',];

        // Order list table rows
        let historyOrders = (this.props.lastOrder && this.props.orders) ? this.props.orders.filter(o => o.id !== this.props.lastOrder.id) : [];
        let rows = historyOrders.map(function (order) {
            return {
                data: [
                    <Text size="small">{moment(order.createdAt).format('YYYY/MM/DD HH:mm:ss')}</Text>,
                    <OrderStatus status={order.status} />,
                    <span className="account-orders__link">
                        <Link to="account-order-details" params={objectAssign({orderId: order.id})}>
                            <Text size="small">Ver Detalles</Text>
                        </Link>
                    </span>
                ]
            };
        });

        //
        // Return
        //
        return (
            <div className="account-orders">
                <div className="account-orders__title">
                    <Heading size="medium">
                        Pedidos de mi cuenta
                    </Heading>
                </div>
                {this.props.loading ?
                    <div className="account-orders__loading">
                        <Spinner />
                    </div>
                    :
                    <div className="account-orders__content">
                        {!this.props.lastOrder ?
                            <div className="account-orders__no-order">
                                <Text size="small">
                                  Por elmomento no hay pedidos
                                </Text>
                            </div>
                            :
                            <div className="account-orders__last-order">
                                <div className="account-orders__last-order-details">
                                    <div className="account-orders__last-order-date">
                                        <Text size="small">
                                            {moment(this.props.lastOrder.createdAt).format('YYYY/MM/DD HH:mm:ss')}
                                        </Text>
                                    </div>
                                    <div className="account-orders__last-order-status">
                                        <OrderStatus status={this.props.lastOrder.status} />
                                    </div>
                                </div>
                                <OrderSummary checkout={this.props.lastOrder.checkout} />
                                <div className="account-orders__last-order-actions">
                                    <div className="account-orders__last-order-action-button">
                                        <Link to="account-order-details" params={objectAssign({orderId: this.props.lastOrder.id})}>
                                            <Button type="default" fontSize="small">
                                                Ver detalles
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        }
                        {rows.length > 0 ?
                            <div className="account-orders__list">
                                <div className="account-orders__list-title">
                                    <Heading size="small">
                                        Historial
                                    </Heading>
                                </div>
                                <div className="account-orders__list-content">
                                    <Breakpoint point="handhelds">
                                        {rows.map(function (row) {
                                            return (
                                                <div className="account-orders__list-item">
                                                    <div className="account-orders__item-data">
                                                        {row.data[0]}
                                                    </div>
                                                    <div className="account-orders__item-status">
                                                        {row.data[1]}
                                                    </div>
                                                    <div className="account-orders__item-link">
                                                        {row.data[2]}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </Breakpoint>
                                    <Breakpoint point="medium-screens">
                                        <Table headings={headings} headingsSize="small" rows={rows} />
                                    </Breakpoint>
                                    <Breakpoint point="wide-screens">
                                        <Table headings={headings} headingsSize="small" rows={rows} />
                                    </Breakpoint>
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
 * Exports
 */
export default AccountOrders;
