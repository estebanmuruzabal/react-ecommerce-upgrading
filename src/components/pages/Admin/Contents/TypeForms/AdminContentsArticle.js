/**
 * Imports
 */
import React from 'react';

// Required components
import FormLabel from '../../../../common/forms/FormLabel';
import InputField from '../../../../common/forms/InputField';
import MarkdownHTML from '../../../../common/typography/MarkdownHTML';
import MarkdownEditor from '../../../../common/forms/MarkdownEditor';
import PropTypes from 'prop-types';
/**
 * Component
 */
class AdminContentsArticle extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminContentsArticle.scss');
    }

    //*** View Controllers ***//

    handleSummaryField = (value) => {
        let body = this.props.body;
        body.summary = value;
        this.props.onChange(body);
    };

    handleMarkdownField = (value) => {
        let body = this.props.body;
        body.markdown = value;
        this.props.onChange(body);
    };

    //*** Template ***//

    render() {
        return (
            <div className="admin-contents-article">
                <div className="admin-contents-article__summary">
                    <div className="admin-contents-article__form-item">
                        <InputField label={
                                        <div>
                                            Resumen
                                        </div>
                                    }
                                    onChange={this.handleSummaryField}
                                    value={this.props.body.summary}
                                    error={this.state.fieldErrors['summary']} />
                    </div>
                </div>
                <div className="admin-contents-article__content">
                    <div className="admin-contents-article__markdown">
                        <MarkdownEditor
                                        label={
                                            <div>
                                                Editar
                                            </div>
                                        }
                                        value={this.props.body.markdown}
                                        onChange={this.handleMarkdownField} />
                    </div>
                    <div className="admin-contents-article__preview">
                        <div className="admin-contents-article__label">
                            <FormLabel>
                                Vista preliminar
                            </FormLabel>
                        </div>
                        <div className="admin-contents-article__markdown-preview">
                            <MarkdownHTML>
                                {this.props.body.markdown}
                            </MarkdownHTML>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default AdminContentsArticle;
