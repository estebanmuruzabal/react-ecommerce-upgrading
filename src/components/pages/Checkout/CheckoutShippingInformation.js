/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';
// Required components
import AddressFieldShipping from '../../common/forms/AddressFieldShipping';
import AddressFieldNoShipping from '../../common/forms/AddressFieldNoShipping';
import AddressPreview from '../../common/forms/AddressPreview';
import RadioSelect from '../../common/forms/RadioSelect';
import Heading from '../../common/typography/Heading';
import Text from '../../common/typography/Text';
import InlineItems from '../../common/forms/InlineItems';
import Select from '../../common/forms/Select';
import Modal from '../../common/modals/Modal';

import CheckoutSection from './CheckoutSection';

// Translation data for this component
import intlData from './CheckoutShippingInformation.intl';

// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class CheckoutShippingInformation extends React.Component {

    state = {
          showModal: false,
          daysOptions: []
     };

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };


    componentDidMount() {
        require('./CheckoutShippingInformation.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          showModal: false,
          daysOptions: []
        });
    }

    handleOpenModalClick = () => {
        this.setState({showModal: true});
    };

    handleCloseModal = () => {
        this.setState({showModal: false});
    };



    //*** Template ***//

    render() {



        let shippingOptions = (this.props.shippingOptions) ? this.props.shippingOptions.map(function (option) {
            let name = (
                <FormattedMessage message={intlStore.getMessage(option.name)}
                                  locales={intlStore.getCurrentLocale()} />
            );
            let price = (
                <FormattedNumber
                    value={option.price}
                    style="currency"
                    currency={option.currency} />
            );
            return {
                value: option.value,
                name: name,
                detail: price
            };
        }) : null;

        let takeOutTimeOptions = [
            {name: 'Entre 17:00 y 20:30', value: '17:00-20:30'}
        ];

        let deliveryTimeOptions = [
            {name: 'Entre 07:00 y 09:00', value: '07:00-09:00'},
            {name: 'Entre 09:00 y 11:00', value: '09:00-11:00'},
            {name: 'Entre 11:00 y 13:00', value: '11:00-13:00'},
            {name: 'Entre 13:00 y 15:00', value: '13:00-15:00'},
            {name: 'Entre 15:00 y 17:00', value: '15:00-17:00'},
            {name: 'Entre 20:00 y 22:00', value: '20:00-22:00'},
        ];

        let showModal = () => {
            if (this.state.showModal === true) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'modalTitle')}
                            onCloseClick={this.handleCloseModal}>
                      <iframe src="https://www.google.com/maps/d/embed?mid=1D5L1sLC-E3JYa5ix8gSt3uPOEUU" width="480" height="480"></iframe>
                    </Modal>
                );
            }
        };

        let showWarningText = () => {
                return (
                  <div>
                    <div className="checkout-summary__warning">
                        <Heading size="small">
                          <FormattedMessage message={intlStore.getMessage(intlData, 'aclarationDefault')}
                                            locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                  </div>
                );
        };

        let dayOptions = [
            {name: 'Martes 14 de Noviembre', value: 'Martes 14 de Noviembre'},
            {name: 'Miércoles 15 de Noviembre', value: 'Miércoles 15 de Noviembre'}
        ];

        return (
            <div className="checkout-shipping-information__select-method">
            {shippingOptions ?
                <div className="checkout-shipping-information__column">
                    <div className="checkout-shipping-information__row">
                      <CheckoutSection number="2.1"
                                     size="small"
                                     title={intlStore.getMessage(intlData, 'shippingMethodLabel')}>
                         <RadioSelect options={shippingOptions}
                                      onChange={this.props.onShippingOptionChange}
                                      value={this.props.shippingMethod} />
                      </CheckoutSection>
                     </div>
                     <div className="checkout-shipping-information__row">
                         <div className="image-zone-image-container" onClick={this.handleOpenModalClick}>
                           <div className="image-shipping-zones"></div>
                         </div>
                     </div>
                </div>
                :
                null
            }
              {showModal()}
                {this.props.shippingMethod === 'free-pickup' ?
                    <div>
                        <CheckoutSection number="2.2"
                                       size="small"
                                       title={intlStore.getMessage(intlData, 'takeoutDateLabel')}>
                        <InlineItems>
                            <Select label={intlStore.getMessage(intlData, 'day')}
                                    placeholder
                                    options={dayOptions}
                                    labelWeight={this.props.labelWeight}
                                    value={this.props.shippingDay}
                                    onChange={this.props.handleShippingDayChange} />
                            <Select label={intlStore.getMessage(intlData, 'time')}
                                    placeholder
                                    options={takeOutTimeOptions}
                                    labelWeight={this.props.labelWeight}
                                    value={this.props.shippingTime}
                                    onChange={this.props.handleShippingTimeChange} />
                            </InlineItems>
                          </CheckoutSection>
                          <CheckoutSection number="2.3"
                                         size="small"
                                         title={intlStore.getMessage(intlData, 'clientInfoLabel')}>
                            {this.props.editingAddress ?
                                <div>
                                    <AddressFieldNoShipping labelWeight="normal"
                                                  checkout={this.props.checkout}
                                                  address={this.props.address}
                                                  savedAddresses={this.props.user && this.props.user.addresses}
                                                  onSubmit={this.props.onAddressSubmit}
                                                  submitLabel={intlStore.getMessage(intlData, 'save')}
                                                  loading={this.props.loading} />
                                </div>
                                :
                                <div>
                                    <div className="checkout-shipping-information__address-preview">
                                        <AddressPreview address={this.props.address}
                                                        onEditClick={this.props.onAddressEditClick} />
                                    </div>
                                </div>
                            }
                            {showWarningText()}
                            </CheckoutSection>
                    </div>
                    :
                    <div>
                        <CheckoutSection number="2.2"
                                       size="small"
                                       title={intlStore.getMessage(intlData, 'shippingDateLabel')} />
                          <InlineItems>
                              <Select label={intlStore.getMessage(intlData, 'day')}
                                      placeholder
                                      options={dayOptions}
                                      labelWeight={this.props.labelWeight}
                                      value={this.props.shippingDay}
                                      onChange={this.props.handleShippingDayChange} />
                              <Select label={intlStore.getMessage(intlData, 'time')}
                                      placeholder
                                      options={deliveryTimeOptions}
                                      labelWeight={this.props.labelWeight}
                                      value={this.props.shippingTime}
                                      onChange={this.props.handleShippingTimeChange} />
                              </InlineItems>
                          <CheckoutSection number="2.3"
                                         size="small"
                                         title={intlStore.getMessage(intlData, 'clientInfoLabel')} />
                          {this.props.editingAddress ?
                              <div>
                                  <AddressFieldShipping labelWeight="normal"
                                                checkout={this.props.checkout}
                                                address={this.props.address}
                                                savedAddresses={this.props.user && this.props.user.addresses}
                                                onSubmit={this.props.onAddressSubmit}
                                                submitLabel={intlStore.getMessage(intlData, 'save')}
                                                loading={this.props.loading} />
                              </div>
                              :
                              <div>
                                  <div className="checkout-shipping-information__address-preview">
                                      <AddressPreview address={this.props.address}
                                                      onEditClick={this.props.onAddressEditClick} />
                                  </div>
                              </div>
                          }
                          {showWarningText()}
                    </div>
                }
            </div>
        );
    }
}

/**
 * Default Props
 */
CheckoutShippingInformation.defaultProps = {
    onAddressSubmit: function (value) { debug(`onAddressSubmit not defined. Value: ${value}`); },
    onAddressEditClick: function () { debug('onAddressEditClick not defined'); },
};

/**
 * Exports
 */
export default CheckoutShippingInformation;
