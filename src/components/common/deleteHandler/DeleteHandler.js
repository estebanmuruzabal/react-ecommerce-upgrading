import React from 'react';
import { Link } from 'react-router';
import Button from '../buttons/Button';
import Select from '../forms/Select';
import Text from '../typography/Text';
import deleteProduct from '../../../actions/Admin/deleteProduct';
import PropTypes from 'prop-types';
// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class DeleteHandler extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };


    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./DeleteHandler.scss');
    }

    //*** Template ***//

    render() {

        return (
            <div className="admin-products-upload">
                <div className="admin-products-upload__actions">
                    <div className="admin-products-upload__button">
                        <Button type="default" onClick={this.props.onCancelClick}>
                            Cancelar
                        </Button>
                    </div>
                    <div className="admin-products-upload__button">
                      <Link to="admin-panel">
                        <Button type="primary" onClick={this.props.onSubmitClick}>
                            Eliminar
                        </Button>
                      </Link>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
DeleteHandler.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); }
};
/**
 * Exports
 */
export default DeleteHandler;
