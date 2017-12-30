/**
 * Imports
 */
import React from 'react';

import Button from '../../../common/buttons/Button';
import InputField from '../../../common/forms/InputField';
import Select from '../../../common/forms/Select';
import PropTypes from 'prop-types';
// Instantiate debugger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class AdminContentsAddForm extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        name: '',
        type: undefined,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminContentsAddForm.scss');
    }

    //*** View Controllers ***//

    handleNameChange = (value) => {
        let name = this.state.name;
        name = value;
        this.setState({name: name});
    };

  handleSubmitClick = () => {

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.type) {
            fieldErrors.type = 'Este campo es obligatorio';
        }
        if (!this.state.name) {
            fieldErrors['name'] = 'Este campo es obligatorio';
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                type: this.state.type,
                name: this.state.name
            });
        }
    };

    handleTypeChange = (value) => {
        this.setState({type: value});
    };

    //*** Template ***//

    render() {

        let contentTypeOptions = [
            {name: 'Artículo', value: 'article'},
            {name: 'Banner', value: 'banner'}
        ];

        let fieldError = (field) => {
            return this.state.fieldErrors[field];
        };

        return (
            <div className="admin-contents-add-form">
                <div className="admin-contents-add-form__item">
                    <Select label='Tipo'
                            placeholder
                            options={contentTypeOptions}
                            onChange={this.handleTypeChange}
                            error={fieldError('type')} />
                </div>
                <div className="admin-contents-add-form__item">
                    <InputField label='Nombre'
                                onChange={this.handleNameChange}
                                error={fieldError('name')} />
                </div>
                <div className="admin-contents-add-form__actions">
                    <div className="admin-contents-add-form__button">
                        <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
                          Cancelar
                        </Button>
                    </div>
                    <div className="admin-contents-add-form__button">
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
AdminContentsAddForm.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug('onSubmitClick not defined', data); }
};

/**
 * Exports
 */
export default AdminContentsAddForm;
