/**
 * Imports
 */
import React from 'react';

// Required components
import Button from '../../../common/buttons/Button';
import Select from '../../../common/forms/Select';
import Text from '../../../common/typography/Text';
import PropTypes from 'prop-types';
// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class AdminProductsUpload extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        content: undefined,
        file: undefined,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminProductsUpload.scss');
    }

    //*** View Controllers ***//

    handleTypeChange = (value) => {
        this.setState({type: value});
    };

    handleFileChange = (evt) => {
        this.setState({file: evt.target.files[0]});
    };

    handleSubmitClick = () => {


        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.type) {
            fieldErrors.type = 'Este campo es obligatorio';
        }
        if (!this.state.file) {
            fieldErrors.file = 'Este campo es obligatorio';
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                resource: this.state.type,
                file: this.state.file
            });
        }
    };

    //*** Template ***//

    render() {

        let uploadTypeOptions = [
            {name: 'Catálogo', value: 'catalog'},
            {name: 'Imágenes', value: 'images'}
        ];

        return (
            <div className="admin-products-upload">
                <div className="admin-products-upload__form-item">
                    <Select label='Tipo'
                            placeholder
                            options={uploadTypeOptions}
                            onChange={this.handleTypeChange}
                            error={this.state.fieldErrors.type} />
                </div>
                <div className="admin-products-upload__form-item">
                    <input ref="input" type="file" className="admin-products-upload__input" onChange={this.handleFileChange} />
                    {this.state.fieldErrors.file ?
                        <div className="admin-products-upload__error">
                            <Text size="small">{this.state.fieldErrors.file}</Text>
                        </div>
                        :
                        null
                    }
                </div>
                <div className="admin-products-upload__actions">
                    <div className="admin-products-upload__button">
                        <Button type="default" onClick={this.props.onCancelClick} disabled={this.props.loading}>
                          Cancelar
                        </Button>
                    </div>
                    <div className="admin-products-upload__button">
                        <Button type="primary" onClick={this.handleSubmitClick} disabled={this.props.loading}>
                            Subir
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
AdminProductsUpload.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default AdminProductsUpload;
