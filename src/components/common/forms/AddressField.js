import React from 'react';
import Button from '../buttons/Button';
import InlineItems from './InlineItems';
import InputField from './InputField';
import Select from './Select';
import PropTypes from 'prop-types';
class AddressField extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        address: this.props.address || {},
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AddressField.scss');
    }

    //*** View Controllers ***//

    handleSavedAddressChange = (idx) => {
        this.props.onSubmit(this.props.savedAddresses[idx]);
    };

    handleFieldChange = (field, value) => {
        let address = this.state.address;
        address[field] = value;
        this.setState({address: address});
    };

    setCountryAndProvince = () => {
        let address = this.state.address;
        address.state = "Chaco";
        address.country = "Argentina";
        address.postalCode = 3500;
        this.setState({address: address});
    };

    handleSubmitClick = () => {
        let fieldErrors = {};

        if (!this.state.address.name) {
            fieldErrors.name = 'Este campo es obligatorio';
        }
        if (!this.state.address.phone) {
            fieldErrors.phone = 'Este campo es obligatorio';
        }
        if (!this.state.address.dni) {
            fieldErrors.dni = 'Este campo es obligatorio';
        }
        if (!this.state.address.addressLine1) {
            fieldErrors.addressLine1 = 'Este campo es obligatorio';
        }
        if (!this.state.address.city) {
            fieldErrors.city = 'Este campo es obligatorio';
        }

        this.setState({fieldErrors: fieldErrors});

        // Validation passed, trigger request
        if (Object.keys(fieldErrors).length === 0) {
            this.setCountryAndProvince();
            this.props.onSubmit(this.state.address);
        }
    };

    //*** Template ***//

    render() {


        let cityOptions = [
            {name: 'Resistencia', value: 'Resistencia'}
        ];

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
                        <Select label='Guardar dirección'
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
                        <InputField label='Nombre'
                                    labelWeight={this.props.labelWeight}
                                    value={this.state.address.name}
                                    onChange={this.handleFieldChange.bind(null, 'name')}
                                    error={this.state.fieldErrors['name']} />
                        <InputField label='Número de Teléfono'
                                    labelWeight={this.props.labelWeight}
                                    value={this.state.address.phone}
                                    onChange={this.handleFieldChange.bind(null, 'phone')}
                                    error={this.state.fieldErrors['phone']} />
                    </InlineItems>
                </div>
                <div className="address-field__item">
                    <InputField label='Dirección'
                                labelWeight={this.props.labelWeight}
                                value={this.state.address.addressLine1}
                                onChange={this.handleFieldChange.bind(null, 'addressLine1')}
                                error={this.state.fieldErrors['addressLine1']} />
                </div>
                <div className="address-field__address-line2">
                    <InputField label='Comentario para el delivery'
                                labelWeight={this.props.labelWeight}
                                value={this.state.address.addressLine2}
                                onChange={this.handleFieldChange.bind(null, 'addressLine2')}
                                error={this.state.fieldErrors['addressLine2']} />
                </div>
                <div className="address-field__item">
                    <InlineItems>
                        <InputField label='Número de DNI'
                                    labelWeight={this.props.labelWeight}
                                    value={this.state.address.dni}
                                    onChange={this.handleFieldChange.bind(null, 'dni')}
                                    error={this.state.fieldErrors['dni']} />
                       <Select label='Ciudad'
                                    placeholder
                                    options={cityOptions}
                                    labelWeight={this.props.labelWeight}
                                    value={this.state.address.city}
                                    onChange={this.handleFieldChange.bind(null, 'city')}
                                    error={this.state.fieldErrors['city']} />
                    </InlineItems>
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
export default AddressField;
