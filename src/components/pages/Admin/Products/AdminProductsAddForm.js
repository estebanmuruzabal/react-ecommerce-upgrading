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
class AdminProductsAddForm extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        name: '',
        sku: undefined,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminProductsAddForm.scss');
    }

    //*** View Controllers ***//

    handleSKUChange = (value) => {
        this.setState({sku: value});
    };

    handleNameChange = (value) => {
        let name = this.state.name;
        name[locale] = value;
        this.setState({name: name});
    };

    handleSubmitClick = () => {


        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.sku) {
            fieldErrors.sku = 'Este campo es obligatorio';
        }
        if (!this.state.name) {
            fieldErrors.name = 'Este campo es obligatorio';
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                sku: this.state.sku,
                name: this.state.name
            });
        }
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //



        let fieldError = (field) => {
            return this.props.error ? this.props.error[field] : this.state.fieldErrors[field];
        };

        //
        // Return
        //
        return (
            <div className="admin-products-add-form">
                <div className="admin-products-add-form__item">
                    <InputField label='SKU'
                                onChange={this.handleSKUChange}
                                error={fieldError('sku')} />
                </div>
                <div className="admin-products-add-form__item">
                    <InputField label='Nombre'
                                onChange={this.handleNameChange}
                                error={fieldError('name')} />
                </div>
                <div className="admin-products-add-form__actions">
                    <div className="admin-products-add-form__button">
                        <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
                            Cancelar
                        </Button>
                    </div>
                    <div className="admin-products-add-form__button">
                        <Button type="primary" onClick={this.handleSubmitClick} disabled={this.props.loading}>
                            Agregar
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
AdminProductsAddForm.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default AdminProductsAddForm;
