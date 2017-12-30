import React from 'react';
import Button from '../buttons/Button';
import PropTypes from 'prop-types';
let debug = require('debug')('tienda765');

class FileUpload extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired
    };

    state = {
      files: undefined,
      image: undefined,
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        require('./FileUpload.scss');

        this.setState({
            image: require('./file_placeholder.png')
        });
    }

    //*** View Controllers ***//

    handlePlaceholderClick = () => {
        this.refs.input.getDOMNode().click();
    };

    handleSubmitClick = () => {
          this.props.onSubmit(this.state.files);
    };

    handleFileChange = (evt) => {
      let files = evt.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(files);
      this.setState({files: files});

    };

    render() {

        return (
            <div className="file-upload">
                <input ref="input" type="file" className="file-upload__input" onChange={this.handleFileChange} />

                <div className="file-upload__actions">
                    <Button type="primary" disabled={this.props.disabled === true || !this.state.files} onClick={this.handleSubmitClick}>
                      Subir archivo
                    </Button>
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
FileUpload.defaultProps = {
    onSubmit: function (files) { debug('onSubmit not defined.', files); }
};

/**
 * Exports
 */
export default FileUpload;
