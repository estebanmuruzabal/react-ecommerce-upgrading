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
class AdminOrdersSendEmail extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        template: undefined,
        email: undefined,
        subject: undefined,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminOrdersSendEmail.scss');
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

    handleTemplateChange = (value) => {
        this.setState({template: value});
    };

    handlePaymentLinkChange = (value) => {
        this.setState({paymentlink: value});
    };

    handleEmailAddressChange = (value) => {
        this.setState({email: value});
    };

    handleSubjectChange = (value) => {
        this.setState({subject: value});
    };

    handleSubmitClick = () => {


        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.template) {
            fieldErrors.template = 'Este campo es obligatorio';
        }
        if (!this.state.email) {
            fieldErrors.email = 'Este campo es obligatorio';
        }
        if (!this.state.subject) {
            fieldErrors.subject = 'Este campo es obligatorio';
        }
        if (!this.state.paymentlink) {
            fieldErrors.subject = 'Este campo es obligatorio';
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                template: this.state.template,
                email: this.state.email,
                subject: this.state.subject,
                paymentlink: this.state.paymentlink
            });
        }
    };

    //*** Template ***//

    render() {

        // Build list of available email templates for given order
        let emailTemplateOptions = [
            {name: 'orderCreated', value: 'order.created'},
            {name: 'orderPaid', value: 'order.paid'},
            {name: 'orderPendingPayment', value: 'order.pendingPayment'},
            {name: 'orderPendingPaymentPaypal', value: 'order.pendingPaymentPaypal'},
            {name: 'orderPendingPaymentMercadoPago', value: 'order.pendingPaymentMercadoPago'}

        ];
        if (this.props.order.status === 'paid') {
            emailTemplateOptions.push({name: 'orderPaid', value: 'order.paid'});
        }
        if (this.props.order.status === 'pendingPayment') {
            emailTemplateOptions.push(
                                      {name: 'orderPendingPayment', value: 'order.pendingPayment'},
                                      {name: 'orderPendingPaymentPaypal', value: 'order.pendingPaymentPaypal'},
                                      {name: 'orderPendingPaymentMercadoPago', value: 'order.pendingPaymentMercadoPago'}
                                );
        }

        //
        // Return
        //
        return (
            <div className="admin-orders-send-email">
                <div className="admin-orders-send-email__form-item">
                    <Select label='Template'
                            placeholder
                            options={emailTemplateOptions}
                            onChange={this.handleTemplateChange}
                            error={this.state.fieldErrors.template} />
                </div>
                <div className="admin-orders-send-email__form-item">
                    <InputField label='Email'
                                onChange={this.handleEmailAddressChange}
                                error={this.state.fieldErrors.email}/>
                </div>
                <div className="admin-orders-payment-link__form-item">
                    <InputField label='Link de pago'
                                onChange={this.handlePaymentLinkChange}
                                error={this.state.fieldErrors.paymentlink}/>
                </div>
                <div className="admin-orders-send-email__form-item">
                    <InputField label='Subjet'
                                onChange={this.handleSubjectChange}
                                error={this.state.fieldErrors.subject}/>
                </div>
                <div className="admin-orders-send-email__actions">
                    <div className="admin-orders-send-email__button">
                        <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
                          Cancelar
                        </Button>
                    </div>
                    <div className="admin-orders-send-email__button">
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
AdminOrdersSendEmail.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default AdminOrdersSendEmail;
