import React from 'react';
import Button from '../buttons/Button';
import InlineItems from './InlineItems';
import InputField from './InputField';
import Select from './Select';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PropTypes from 'prop-types';
/**
 * Component
 */
class AddressFieldShipping extends React.Component {
    constructor(props) {
      super(props)
      this.state = { address: this.props.address || {}, fieldErrors: {}, locationAddress: '',addressErrorMessage: '',checkout: {} }
      this.onChange = (locationAddress) => this.setState({ locationAddress })
    }

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    componentDidMount() {
        require('./AddressFieldShipping.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            checkout: nextProps._checkout
        });
    }

    //*** View Controllers ***//

    handleAddressShippingCheck = (event) => {
      event.preventDefault()

      if (!this.state.locationAddress) {
        this.setState({showAddressError: true});
        return null;
      }
      geocodeByAddress(this.state.locationAddress)
       .then(results => getLatLng(results[0]))
       .then(latLng => {
         console.log('Success', latLng);
         let checkPoint = new google.maps.LatLng(latLng.lat, latLng.lng);

         const zona2= [
           {lat: -27.45504 , lng: -59.01082},
           {lat: -27.42251 , lng: -58.97632},
           {lat: -27.44285 , lng: -58.94894},
           {lat: -27.47697 , lng: -58.98679}
         ];

         const zona1= [
           {lat: -27.45367 , lng: -58.99804},
           {lat: -27.43166 , lng: -58.97418},
           {lat: -27.4408 , lng: -58.9607},
           {lat: -27.4638 , lng: -58.98688}
         ];

         let poly1 = new google.maps.Polygon({path: zona1});
         let poly2 = new google.maps.Polygon({path: zona2});

         if ( google.maps.geometry.poly.containsLocation(checkPoint, poly1)) {
           let address = this.state.address;
           address.addressLine1 = this.state.locationAddress;
           this.setState({address: address, addressErrorMessage: 'zona1'});
         } else if (google.maps.geometry.poly.containsLocation(checkPoint, poly2)) {
           let address = this.state.address;
           address.addressLine1 = this.state.locationAddress;
           this.setState({address: address, addressErrorMessage: 'zona2'});
         } else {
           let address = this.state.address;
           address.addressLine1 = {};
           this.setState({address: address, addressErrorMessage: 'outside'});
         }
       })
       .catch(error => console.error('Error', error))
     }

    handleSavedAddressChange = (idx) => {
        this.props.onSubmit(this.props.savedAddresses[idx]);
    };

    handleFieldChange = (field, value) => {
        let address = this.state.address;
        address[field] = value;
        this.setState({address: address});
    };

    setCountryAndProvinceAndName = () => {
        let address = this.state.address;
        address.state = "Chaco";
        address.country = "Argentina";
        address.city = "Resistencia";
        address.dni = "000000000";
        address.postalCode = 3500;
        console.log("checkout",this.props.checkout);
        if (this.props.checkout.customer) {
            address.name = this.props.checkout.customer.name;
            console.log("checkout",this.props.checkout);
        }
        this.setState({address: address});
    };

    handleSubmitClick = () => {



        // Client-side validations
        let fieldErrors = {};

        if (!this.state.address.phone) {
            fieldErrors.phone = 'Este campo es obligatorio';
        }
        if (this.state.addressErrorMessage !== 'zona1' && this.state.addressErrorMessage !== 'zona2') {
            this.setState({addressErrorMessage: 'showWarning'});
            fieldErrors.address = 'Este campo es obligatorio';
        }
        console.log("checkout",this.props.checkout);
        this.setState({fieldErrors: fieldErrors});

        // Validation passed, trigger request
        if (Object.keys(fieldErrors).length === 0) {
            this.setCountryAndProvinceAndName();
            this.props.onSubmit(this.state.address);
        }
    };

    //*** Template ***//

    render() {

        let inputProps = {
             value: this.state.locationAddress,
             onChange: this.onChange,
        }

        let addressErrorMessage = () => {
            if (this.state.addressErrorMessage == 'zona1') {
                return (
                  <div className="address-field__error">
                      Delivery gratis
                  </div>
                );
            } else if (this.state.addressErrorMessage == 'zona2') {
              return (
                <div className="address-field__error">
                    $10 de delivery
                </div>
              );
            } else if (this.state.addressErrorMessage == 'outside') {
              return (
                <div className="address-field__error">
                    Estas afuera de nuestra zona de delivery
                </div>
              );
            } else {
              return (
                  null
              );
            }
        };


        let addressOptions;
        if (this.props.savedAddresses && this.props.savedAddresses.length > 0) {
            addressOptions = this.props.savedAddresses.map(function (address, idx) {
                return {
                    value: idx,
                    name: `${address.name}, ${address.addressLine1} ${address.addressLine2}, ${address.postalCode} ${address.city}`
                };
            });
        }

        return (
            <div className="address-field">
                {addressOptions ?
                    <div className="address-field__item address-field__saved-addresses">
                        <Select label='Elija una de sus direcciones guardadas'
                                labelWeight="normal"
                                labelSize="small"
                                placeholder
                                options={addressOptions}
                                onChange={this.handleSavedAddressChange} />
                    </div>
                    :
                    null
                }
                <div className="address-field__item">
                    <InlineItems>
                        <InputField label='Número de Teléfono'
                                    labelWeight={this.props.labelWeight}
                                    value={this.state.address.phone}
                                    onChange={this.handleFieldChange.bind(null, 'phone')}
                                    error={this.state.fieldErrors['phone']} />
                        <InputField label='Comentario para el delivery'
                                    labelWeight={this.props.labelWeight}
                                    value={this.state.address.addressLine2}
                                    onChange={this.handleFieldChange.bind(null, 'addressLine2')}
                                    error={this.state.fieldErrors['addressLine2']} />
                    </InlineItems>
                </div>
                <div className="address-field__item">
                  Dirección
                  <form onSubmit={this.handleAddressShippingCheck.bind()}>
                     <PlacesAutocomplete inputProps={inputProps} />
                     <div className="row">
                     <button className="button-shipping button-shipping-primary button-shipping-font-small" type="submit">Checkear mi dirección</button>
                     {addressErrorMessage()}
                     {this.state.addressErrorMessage == 'showWarning' ?
                       <div className="address-field__error">
                           Necesitas checkear una dirección valida
                       </div>
                         :
                         null
                     }
                     </div>
                   </form>
                </div>
                {this.props.onCancel || this.props.onSubmit ?
                    <div className="address-field__item">
                        <InlineItems>
                            <div>
                                {this.props.onCancel ?
                                    <Button type="default"
                                            onClick={this.props.onCancel}
                                            disabled={this.props.disabled}
                                            loading={this.props.loading}>
                                        {this.props.cancelLabel || 'Cancelar'}
                                    </Button>
                                    :
                                    null
                                }
                            </div>
                            <div>
                                {this.props.onSubmit ?
                                    <Button type="primary"
                                            onClick={this.handleSubmitClick}
                                            disabled={this.props.disabled}
                                            loading={this.props.loading}>
                                        {this.props.submitLabel || 'Enviar'}
                                    </Button>
                                    :
                                    null
                                }
                            </div>
                        </InlineItems>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

/**
 * Exports
 */
export default AddressFieldShipping;
