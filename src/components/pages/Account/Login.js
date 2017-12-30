/**
 * Imports.
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

// Flux
import AccountStore from '../../../stores/Account/AccountStore';
import LoginStore from '../../../stores/Account/LoginStore';
import login from '../../../actions/Account/login';

// Required components
import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import InputField from '../../common/forms/InputField';
import Modal from '../../common/modals/Modal';
import Text from '../../common/typography/Text';

/**
 * Component.
 */
class Login extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired,
        router: PropTypes.func.isRequired
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context) {
        return {
            title: 'Login'
        }
    };

    //*** Initial State ***//

    state = {
        loading: this.context.getStore(LoginStore).isLoading(),
        loadingAccountDetails: this.context.getStore(AccountStore).isLoading(),
        error: this.context.getStore(LoginStore).getError(),
        email: undefined,
        password: undefined,
        fieldErrors: {},
        errorMessage: undefined,
        loggingIn: false
    };

    //*** Helper Methods ***//

    isLoading = () => {
        return this.state.loading || this.state.loadingAccountDetails ;
    };

    next = () => {
        if (this.props.query.next) {
            this.context.router.transitionTo(this.props.query.next);
        } else {
            this.context.router.transitionTo('homepage');
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Login.scss');

        // If user is authenticated, redirect to homepage
        if (this.context.getStore(AccountStore).getAccountDetails()) {
            this.context.router.transitionTo('homepage');
        }
    }

    componentWillReceiveProps(nextProps) {

        // Find field error descriptions in request response
        let fieldErrors = {};
        if (this.state.loading && !nextProps._loading && nextProps._error) {
            if (nextProps._error.validation && nextProps._error.validation.keys) {
                nextProps._error.validation.keys.forEach(function (field) {
                    fieldErrors[field] = nextProps._error.validation.details[field];
                });
            } else if (!nextProps._error.hasOwnProperty('status')) {
                fieldErrors.email = 'Datos inválidos';
                fieldErrors.password = 'Datos inválidos';
            } else if (['pendingConfirmation', 'disabled'].indexOf(nextProps._error.status) !== -1) {
                this.setState({
                    errorMessage: 'Su cuenta esta pendiente de confirmación de email'
                });
            } else if (['disabled'].indexOf(nextProps._error.status) !== -1) {
                this.setState({
                    errorMessage: 'Su cuenta está desactivada'
                });
            } else {
                this.setState({
                    errorMessage: 'Error. Por favor contacte al servicio de soporte'
                });
            }
        }

        // Check for:
        // - Account Details (i.e. we are successfully logged in)
        // - Successful cart claim
        // Now we need to process the cart state
        if (this.state.loggingIn && this.context.getStore(AccountStore).getAccountDetails()) {

            this.setState({loggingIn: false});
            this.next();
        }

        this.setState({
            loading: nextProps._loading,
            loadingAccountDetails: nextProps._loadingAccountDetails,
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
        if (!this.state.password) {
            fieldErrors.password = 'Este campo es obligatorio';
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.setState({loggingIn: true});
            this.context.executeAction(login, {
                email: this.state.email,
                password: this.state.password
            });
        }
    };

    render() {

        return (
            <div className="login">
                <div className="login__container">
                    <div className="login__header">
                        <Heading>
                            Login
                        </Heading>
                    </div>
                    {this.state.errorMessage ?
                        <div className="login__error-message">
                            <Text size="small">{this.state.errorMessage}</Text>
                        </div>
                        :
                        null
                    }
                    <div className="login__form">
                        <div className="login__form-item">
                            <InputField label='Dirección de email'
                                        onChange={this.handleFieldChange.bind(null, 'email')}
                                        onEnterPress={this.handleSubmitClick}
                                        error={this.state.fieldErrors['email']}
                                        value={this.state.email} />
                        </div>
                        <div className="login__form-item">
                            <InputField type="password"
                                        label='Contraseña'
                                        onChange={this.handleFieldChange.bind(null, 'password')}
                                        onEnterPress={this.handleSubmitClick}
                                        error={this.state.fieldErrors['password']}
                                        value={this.state.password} />
                        </div>
                        <div className="login__form-actions">
                            <Button type="primary" onClick={this.handleSubmitClick} disabled={this.isLoading()}>
                                Ingresar
                            </Button>
                        </div>
                        <div className="login__form-reset">
                            <Link className="login__link" to="reset">
                              Se olvidó la contraseña?
                            </Link>
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
Login = connectToStores(Login, [AccountStore, LoginStore], (context) => {
    return {
        _error: context.getStore(LoginStore).getError(),
        _loading: context.getStore(LoginStore).isLoading(),
        _loadingAccountDetails: context.getStore(AccountStore).isLoading()
    };
});

/**
 * Export
 */
export default Login;
