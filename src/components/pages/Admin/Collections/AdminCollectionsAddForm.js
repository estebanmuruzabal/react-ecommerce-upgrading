
import React from 'react';

// Required components
import Button from '../../../common/buttons/Button';
import InputField from '../../../common/forms/InputField';
import Select from '../../../common/forms/Select';
import PropTypes from 'prop-types';
// Instantiate debugger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class AdminCollectionsAddForm extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        name: '',
        tags: [],
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminCollectionsAddForm.scss');
    }

    //*** View Controllers ***//

    handleNameChange = (value) => {
        this.setState({name: value});
    };

    handleSubmitClick = () => {

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (['category', 'section', 'collection'].indexOf(this.state.tags) !== -1) {
            fieldErrors.type = 'Este campo es obligatorio';
        }
        if (!this.state.name) {
            fieldErrors.name = 'Este campo es obligatorio';
        }

        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                name: this.state.name,
                tags: this.state.tags
            });
        }
    };

    handleTypeChange = (value) => {
        this.setState({tags: [value]});
    };

    //*** Template ***//

    render() {

        let collectionTypeOptions = [
            {name: 'Categoría', value: 'category'},
            {name: 'Colección', value: 'collection'},
            {name: 'Sección', value: 'section'},
        ];

        let fieldError = (field) => {
            return this.state.fieldErrors[field];
        };

        //
        // Return
        //
        return (
            <div className="admin-collections-add-form">
                <div className="admin-collections-add-form__item">
                    <Select label='Tipo'
                            placeholder
                            options={collectionTypeOptions}
                            onChange={this.handleTypeChange}
                            error={fieldError('type')} />
                </div>
                <div className="admin-collections-add-form__item">
                    <InputField label='Nombre'
                                onChange={this.handleNameChange}
                                error={fieldError('name')} />
                </div>
                <div className="admin-collections-add-form__actions">
                    <div className="admin-collections-add-form__button">
                        <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
                            Cancelar
                        </Button>
                    </div>
                    <div className="admin-collections-add-form__button">
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
AdminCollectionsAddForm.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default AdminCollectionsAddForm;
