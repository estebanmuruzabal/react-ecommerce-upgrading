/**
 * Imports.
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import PropTypes from 'prop-types';
// Flux
import ResetStore from '../../../stores/Account/ResetStore';
import resetRequest from '../../../actions/Account/resetRequest';

// Required components
import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import InputField from '../../common/forms/InputField';
import Modal from '../../common/modals/Modal';
import Text from '../../common/typography/Text';

class Reset extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired,
        router: PropTypes.func.isRequired
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context) {
        return {
            title: 'Recuperar Constraseña'
        }
    };

    state = {
        loading: this.context.getStore(ResetStore).isLoading(),
        error: this.context.getStore(ResetStore).getError(),
        email: undefined,
        fieldErrors: {},
        errorMessage: undefined,
        showSuccessModal: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Reset.scss');
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (this.state.loading && !nextProps._loading && nextProps._error) {
            if (nextProps._error.validation && nextProps._error.validation.keys) {
                nextProps._error.validation.keys.forEach(function (field) {
                    fieldErrors[field] = nextProps._error.validation.details[field];
                });
            } else if (nextProps._error.hasOwnProperty('message')) {
                this.setState({errorMessage: nextProps._error.message});
            } else {
                this.setState({
                    errorMessage: 'Error. Por favor contacte al servicio de soporte'
                });
            }
        }

        // Check for a successful reset request
        if (this.state.loading && !nextProps._loading && !nextProps._error) {
            this.setState({showSuccessModal: true});
        }

        // Update state
        this.setState({
            loading: nextProps._loading,
            error: nextProps._error,
            fieldErrors: fieldErrors
        })
    }

    //*** View Controllers ***//

    handleFieldChange = (param, value) => {
        this.setState({[param]: value});
    };

    handleSubmitClick = () => {

        this.setState({errorMessage: null});
        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.email) {
            fieldErrors.email = 'Este campo es obligatorio';
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.context.executeAction(resetRequest, {email: this.state.email});
        }
    };

    handleModalContinueClick = () => {
        this.context.router.transitionTo('homepage');
    };

    //*** Template ***//

    render() {

        let successModal = () => {
            if (this.state.showSuccessModal) {
                return (
                    <Modal title='Pedido enviado'>
                        <div className="reset__modal-body">
                            <Text size="medium">
                                Usted recibirá un email en breve con las instrucciones para recuperar su contraseña.
                            </Text>
                        </div>
                        <div className="reset__modal-footer">
                            <Button type="primary" onClick={this.handleModalContinueClick}>
                                OK
                            </Button>
                        </div>
                    </Modal>
                );
            }
        };

        //
        // Return
        //
        return (
            <div className="reset">
                {successModal()}
                <div className="reset__container">
                    <div className="reset__header">
                        <Heading>
                            Recuperar Constraseña
                        </Heading>
                    </div>
                    {this.state.errorMessage ?
                        <div className="reset__error-message">
                            <Text size="small">{this.state.errorMessage}</Text>
                        </div>
                        :
                        null
                    }
                    <div className="reset__form">
                        <div className="reset__form-item">
                            <InputField label='Email'
                                        onChange={this.handleFieldChange.bind(null, 'email')}
                                        onEnterPress={this.handleSubmitClick}
                                        error={this.state.fieldErrors['email']}
                                        value={this.state.email} />
                        </div>
                        <div className="reset__form-actions">
                            <Button type="primary" onClick={this.handleSubmitClick} disabled={this.state.loading}>
                                Enviar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
Reset = connectToStores(Reset, [ResetStore], (context) => {
    return {
        _error: context.getStore(ResetStore).getError(),
        _loading: context.getStore(ResetStore).isLoading()
    };
});

/**
 * Export
 */
export default Reset;
