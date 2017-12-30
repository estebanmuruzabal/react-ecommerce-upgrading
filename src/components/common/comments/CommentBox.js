import React from 'react';
import {Link} from 'react-router';
import Button from '../buttons/Button';
import Heading from '../typography/Heading';
import Text from '../typography/Text';
import Textarea from '../forms/Textarea';
import UserComment from './UserComment';
import PropTypes from 'prop-types';
let debug = require('debug')('tienda765');

/**
 * Component
 */
class CommentBox extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        message: undefined,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CommentBox.scss');
    }

    //*** View Controllers ***//

    handleTextareaChange = (value) => {
        this.setState({message: value});
    };

    handleButtonClick = () => {
        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.message) {
            fieldErrors.message = 'Este campo es obligatorio';
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick(this.state.message);
        }
    };

    render() {
        // Return the list UI block, according to whether there are comments or not
        let comments = () => {
            if (this.props.comments && this.props.comments.length > 0) {
                return (
                    <div className="comment-box__list">
                        {this.props.comments.map(function (comment) {
                            return (
                                <div className="comment-box__comment-item">
                                    <UserComment author={comment.user.name} date={comment.createdAt}>
                                        {comment.message}
                                    </UserComment>
                                </div>
                            );
                        })}
                    </div>
                );
            } else {
                return (
                    <div className="comment-box__no-comments">
                        <Text>
                            Sea el primero en comentar
                        </Text>
                    </div>
                );
            }
        };

        let loginTranslation = (
            <Link className="comment-box__link" to="login">
                <Text>
                    Ingresar
                </Text>
            </Link>
        );

        let registerTranslation = (
            <Link className="comment-box__link" to="register">
                <Text>
                    Crear cuenta
                </Text>
            </Link>
        );

        //
        // Return
        //
        return (
            <div className="comment-box">
                <div className="comment-box__comments" itemScope itemType="http://schema.org/UserComments">
                    {comments()}
                </div>
                {this.props.user ?
                    <div className="comment-box__submit">
                    <Textarea label='Deje su comentario'
                              onChange={this.handleTextareaChange}
                              error={this.state.fieldErrors.message}
                              disabled={this.props.disabled || this.props.loading} />
                        <div className="comment-box__submit-actions">
                            <div className="comment-box__button">
                                <Button type="primary" onClick={this.handleButtonClick}
                                        disabled={this.props.disabled} loading={this.props.loading}>
                                    <i className="fa fa-comment-o" aria-hidden="true" />
                                    &nbsp;
                                    Ingresar
                                </Button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="comment-box__no-user">
                        <Text>
                            Para ingresar un comentario, primeiro debe estar registrado.
                        </Text>
                    </div>
                }
            </div>
        );
    }
}

/**
 * Default Props
 */
CommentBox.defaultProps = {
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default CommentBox;
