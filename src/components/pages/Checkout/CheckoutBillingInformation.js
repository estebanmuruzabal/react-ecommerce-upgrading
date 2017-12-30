/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';
// Required components
import AddressField from '../../common/forms/AddressField';
import AddressPreview from '../../common/forms/AddressPreview';
import Checkbox from '../../common/forms/Checkbox';
import InputField from '../../common/forms/InputField';
import RadioSelect from '../../common/forms/RadioSelect';
import Heading from '../../common/typography/Heading';

import CheckoutSection from './CheckoutSection';

// Translation data for this component
import intlData from './CheckoutBillingInformation.intl';

// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class CheckoutBillingInformation extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        fieldErrors: {},
        paymentInstrument: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CheckoutBillingInformation.scss');
    }

    //*** View Controllers ***//

    handlePaymentOptionsChange = (value) => {
        if (value === this.props.paymentMethod) {
            return;
        }
        this.setState({fieldErrors: {}});
        this.props.onPaymentMethodChange(value);
        this.props.onPaymentInstrumentChange({
            provider: this.props.paymentOptions.filter(opt => opt.id === value)[0].provider,
            ready: value !== 'mbway'
        });
    };

    handleInstrumentParamChange = (param, value) => {

        // Update instrument data
        let instrument = this.state.paymentInstrument;
        instrument[param] = value;
        this.setState({paymentInstrument: instrument});

        // Validate parameters
        let fieldErrors = this.state.fieldErrors;
        if (param === 'phone' && (value === '' || !(!isNaN(value) && value.length === 9))) {
            let fieldErrors = this.state.fieldErrors;
            fieldErrors.phone = (
                <FormattedMessage message={this.context.getStore(IntlStore).getMessage(intlData, 'validNumber')}
                                  locales={this.context.getStore(IntlStore).getCurrentLocale()} />
            );
            this.setState({fieldErrors: fieldErrors});
        } else if (param === 'phone') {
            delete fieldErrors.phone;
            this.setState({fieldErrors: fieldErrors});
        }

        // Notify of instrument readyness status
        this.props.onPaymentInstrumentChange({
            provider: this.props.paymentOptions.filter(opt => opt.id === this.props.paymentMethod)[0].provider,
            ready: Object.keys(fieldErrors).length === 0,
            params: instrument
        });
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //



        let paymentOptions = (this.props.paymentOptions) ? this.props.paymentOptions.map((paymentMethod) => {
            let name = (
                <FormattedMessage message={intlStore.getMessage(paymentMethod.label)}
                                  locales={intlStore.getCurrentLocale()} />
            );
            let option = {value: paymentMethod.id, name: name};
            if (paymentMethod.id === 'mbway') {
                option.children = (
                    <div>
                        <InputField placeholder='Número de Teléfono'
                                    onChange={this.handleInstrumentParamChange.bind(null, 'phone')}
                                    error={this.state.fieldErrors.phone} />
                    </div>
                );
            }
            return option;
        }) : null;

        //
        // Return
        //
        return (
            <div className="checkout-billing-information">
                {this.props.editingAddress && !this.props.useShippingAddress ?
                    <div className="checkout-billing-information__content">
                        <AddressField labelWeight="normal"
                                      address={this.props.address}
                                      savedAddresses={this.props.user && this.props.user.addresses}
                                      onSubmit={this.props.onAddressSubmit}
                                      submitLabel={intlStore.getMessage(intlData, 'save')} />
                    </div>
                    :
                    <div className="checkout-billing-information__content">
                        {!this.props.useShippingAddress ?
                            <AddressPreview address={this.props.address}
                                            onEditClick={this.props.onAddressEditClick} />
                            :
                            null
                        }
                        {paymentOptions ?
                           <div>
                              <div className="checkout-billing-information__select-payment-method">
                                <RadioSelect options={paymentOptions}
                                             onChange={this.handlePaymentOptionsChange}
                                             value={this.props.paymentMethod} />
                                 <div className="checkout-summary__warning">
                                     <Heading size="small">
                                       <FormattedMessage message={intlStore.getMessage(intlData, 'creditCardAclaration')}
                                                         locales={intlStore.getCurrentLocale()} />
                                     </Heading>
                                 </div>
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
 * Default Props
 */
CheckoutBillingInformation.defaultProps = {
    onAddressSubmit: function (value) { debug(`onAddressSubmit not defined. Value: ${value}`); },
    onAddressEditClick: function () { debug('onAddressEditClick not defined'); },
    onPaymentMethodChange: function (value) { debug(`onPaymentMethodChange not defined. Value: ${value}`); },
    onPaymentInstrumentChange: function (isReady) { debug(`onPaymentMethodChange not defined. Ready: ${isReady}`); },
    onUseShippingAddressChange: function () { debug('onUseShippingAddressChange not defined'); }
};

/**
 * Exports
 */
export default CheckoutBillingInformation;
