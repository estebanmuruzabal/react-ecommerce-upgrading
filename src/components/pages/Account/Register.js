/**
 * Imports.
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

// Flux
import AccountStore from '../../../stores/Account/AccountStore';
import RegisterStore from '../../../stores/Account/RegisterStore';
import registerAccount from '../../../actions/Account/registerAccount';

// Required components
import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import InputField from '../../common/forms/InputField';
import Modal from '../../common/modals/Modal';
import Text from '../../common/typography/Text';

class Register extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired,
        router: PropTypes.func.isRequired
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context) {
        return {
            title: 'Crear cuenta'
        }
    };

    //*** Initial State ***//

    state = {
        name: undefined,
        email: undefined,
        password: undefined,
        passwordConfirm: undefined,
        loading: this.context.getStore(RegisterStore).isLoading(),
        error: this.context.getStore(RegisterStore).getError(),
        fieldErrors: {},
        showSuccessModal: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Register.scss');
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
            nextProps._error.validation.keys.forEach(function (field) {
                fieldErrors[field] = nextProps._error.validation.details[field];
            });
        }

        // Check for a successful register
        if (this.state.loading && !nextProps._loading && !nextProps._error) {
            this.setState({showSuccessModal: true});
        }

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

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.name) {
            fieldErrors.name = 'Este campo es obligatorio';
        }
        if (!this.state.email) {
            fieldErrors.email = 'Este campo es obligatorio';
        }
        if (!this.state.password) {
            fieldErrors.password = 'Este campo es obligatorio';
        }
        if (!this.state.passwordConfirm) {
            fieldErrors.passwordConfirm = 'Este campo es obligatorio';
        }

        if (this.state.password && this.state.passwordConfirm && this.state.password != this.state.passwordConfirm) {
            fieldErrors.passwordConfirm = 'Contraseñas no coinciden';
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.context.executeAction(registerAccount, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            });
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
                    <Modal title='Cuenta creada'>
                        <div className="register__modal-body">
                            <Text size="medium">
                                Para activar su cuenta, siga las instrucciones que serán enviadas a su email (Recuerde revisar su correo no deseado)
                            </Text>
                        </div>
                        <div className="register__modal-footer">
                            <Button type="primary" onClick={this.handleModalContinueClick}>
                                OK
                            </Button>
                        </div>
                    </Modal>
                );
            }
        };

        return (
            <div className="register">
                {successModal()}

                <div className="register__container">
                    <div className="register__header">
                        <Heading>
                            Crear cuenta
                        </Heading>
                    </div>
                    <div className="register__form">
                        <div className="register__form-item">
                            <InputField label='Nombre'
                                        onChange={this.handleFieldChange.bind(null, 'name')}
                                        onEnterPress={this.handleSubmitClick}
                                        error={this.state.fieldErrors['name']} />
                        </div>
                        <div className="register__form-item">
                            <InputField label='Email'
                                        onChange={this.handleFieldChange.bind(null, 'email')}
                                        onEnterPress={this.handleSubmitClick}
                                        error={this.state.fieldErrors['email']} />
                        </div>
                        <div className="register__form-item">
                            <InputField type="password"
                                        label='Contraseña'
                                        onChange={this.handleFieldChange.bind(null, 'password')}
                                        onEnterPress={this.handleSubmitClick}
                                        error={this.state.fieldErrors['password']} />
                        </div>
                        <div className="register__form-item">
                            <InputField type="password"
                                        label='Confirmar contraseña'
                                        onChange={this.handleFieldChange.bind(null, 'passwordConfirm')}
                                        onEnterPress={this.handleSubmitClick}
                                        error={this.state.fieldErrors['passwordConfirm']} />
                        </div>
                        <div className="register__form-actions">
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
Register = connectToStores(Register, [RegisterStore], (context) => {
    return {
        _error: context.getStore(RegisterStore).getError(),
        _loading: context.getStore(RegisterStore).isLoading()
    };
});

/**
 * Export
 */
export default Register;
