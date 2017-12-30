/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import moment from 'moment';
import objectAssign from 'object-assign';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import OrdersListStore from '../../../../stores/Orders/OrdersListStore';
import fetchOrders from '../../../../actions/Orders/fetchOrders';

// Required components
import Heading from '../../../common/typography/Heading';
import OrderStatus from '../../../common/orders/OrderStatus';
import Spinner from '../../../common/indicators/Spinner';
import Table from '../../../common/tables/Table';
import Text from '../../../common/typography/Text';
import ToggleSwitch from '../../../common/buttons/ToggleSwitch';

/**
 * Component
 */
class AdminOrders extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        orders: this.context.getStore(OrdersListStore).getOrders(),
        loading: this.context.getStore(OrdersListStore).isLoading(),
        showAllOrders: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminOrders.scss');

        // Load required data
        this.context.executeAction(fetchOrders, {open: true}); // By default, only opened orders
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            orders: nextProps._orders,
            loading: nextProps._loading
        });
    }

    //*** View Controllers ***//

    handleShowAllOrdersChange = () => {
        if (!this.state.loading) {
            let showAllOrders = !this.state.showAllOrders;
            this.context.executeAction(fetchOrders, (showAllOrders) ? {} : {open: true});
            this.setState({showAllOrders: showAllOrders});
        }
    };

    render() {

        // Order list table headings
        let headings = ['Fecha','ID','Cliente','Estado'];

        // Order list table rows
        let rows = this.state.orders.map(function (order) {
          console.log("orderr:",order);
            return {
                data: [
                    <Text size="medium">{moment(order.createdAt).format('YYYY/MM/DD HH:mm:ss')}</Text>,
                    <span className="admin-orders__link">
                        <Link to="adm-order-edit" params={objectAssign({orderId: order.id}, routeParams)}>
                            <Text size="small">{order.id}</Text>
                        </Link>
                    </span>,
                    <Text size="medium">
                        {order.customer.name}
                        {order.customer.userId ?
                            <span className="adm-orders__user-icon">
                                <i className="fa fa-user" aria-hidden="true" />
                            </span>
                            :
                            null
                        }
                    </Text>,
                    <OrderStatus status={order.status} />
                ]
            };
        });

        return (
            <div className="admin-orders">
                <div className="admin-orders__header">
                    <div className="admin-orders__title">
                        <Heading size="medium">
                            Pedidos
                        </Heading>
                    </div>
                    <div className="admin-orders__toolbar">
                        <div className="admin-orders__toolbar-item">
                            <ToggleSwitch label='Mostrar todo'
                                          inline
                                          enabled={this.state.showAllOrders}
                                          onChange={this.handleShowAllOrdersChange} />
                        </div>
                    </div>
                </div>
                {this.state.loading ?
                    <div className="admin-orders__spinner">
                        <Spinner />
                    </div>
                    :
                    null
                }
                {!this.state.loading && this.state.orders.length > 0 ?
                    <div className="admin-orders__list">
                        <Table headings={headings} rows={rows} />
                    </div>
                    :
                    null
                }
                {!this.state.loading && this.state.orders.length === 0 ?
                    <div className="admin-orders__no-results">
                        <Text size="small">
                          No existen Ordenes momentaneamente
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
AdminOrders = connectToStores(AdminOrders, [OrdersListStore], (context) => {
    return {
        _orders: context.getStore(OrdersListStore).getOrders(),
        _loading: context.getStore(OrdersListStore).isLoading()
    };
});

/**
 * Exports
 */
export default AdminOrders;
