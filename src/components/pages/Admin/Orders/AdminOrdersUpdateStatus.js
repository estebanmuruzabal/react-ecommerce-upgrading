/**
 * Imports
 */
import React from 'react';

// Required components
import Button from '../../../common/buttons/Button';
import InputField from '../../../common/forms/InputField';
import Select from '../../../common/forms/Select';
import PropTypes from 'prop-types';
// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class AdminOrdersUpdateStatus extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        status: undefined,
        description: undefined,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminOrdersUpdateStatus.scss');
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (nextProps.error && nextProps.error.validation && nextProps.error.validation.keys) {
            nextProps.error.validation.keys.forEach(function (field) {
                fieldErrors[field] = nextProps.error.validation.details[field];
            });
        }

        this.setState({fieldErrors: fieldErrors});
    }

    //*** View Controllers ***//

    handleStatusChange = (value) => {
        this.setState({status: value});
    };

    handleDescriptionChange = (value) => {
        this.setState({description: value});
    };

    handleSubmitClick = () => {


        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.status) {
            fieldErrors.status = 'Este campo es obligatorio';
        }
        if (!this.state.description) {
            fieldErrors.description = 'Este campo es obligatorio';
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                status: this.state.status,
                description: this.state.description
            });
        }
    };

    //*** Template ***//

    render() {

        let statusOptions = [];
        if (['created', 'pendingPayment', 'paymentError', 'paid', 'processing', 'ready'].indexOf(this.props.order.status) !== -1) {
            statusOptions.push({name: 'cancelOrder', value: 'canceled'});
            statusOptions.push({name: 'processing', value: 'processing'});
            statusOptions.push({name: 'ready', value: 'ready'});
            statusOptions.push({name: 'shipped', value: 'shipped'});
        }
        if (this.props.order.status === 'paid') {
            statusOptions.push({name: 'processing', value: 'processing'});
        }
        if (this.props.order.status === 'processing') {
            statusOptions.push({name: 'ready', value: 'ready'});
        }
        if (this.props.order.status === 'ready') {
            statusOptions.push({name: 'shipped', value: 'shipped'});
        }

        //
        // Return
        //
        return (
            <div className="admin-orders-update-status">
                <div className="admin-orders-update-status__form-item">
                    <Select label='Estado'
                            placeholder
                            options={statusOptions}
                            onChange={this.handleStatusChange}
                            error={this.state.fieldErrors.status} />
                </div>
                <div className="admin-orders-update-status__form-item">
                    <InputField label='Description'
                                onChange={this.handleDescriptionChange}
                                error={this.state.fieldErrors.description}/>
                </div>
                <div className="admin-orders-update-status__actions">
                    <div className="admin-orders-update-status__button">
                        <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
                          Cancelar
                        </Button>
                    </div>
                    <div className="admin-orders-update-status__button">
                        <Button type="primary" onClick={this.handleSubmitClick} disabled={this.props.loading}>
                            Enviar
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
AdminOrdersUpdateStatus.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default AdminOrdersUpdateStatus;
