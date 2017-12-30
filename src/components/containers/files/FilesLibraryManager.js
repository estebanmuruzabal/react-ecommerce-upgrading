/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import PropTypes from 'prop-types';
// Flux
import FileUploadStore from '../../../stores/Files/FileUploadStore';
import uploadFile from '../../../actions/Admin/uploadFile';

// Required components
import FormLabel from '../../common/forms/FormLabel';
import FileUpload from '../../common/files/FileUpload';
import FileLibrary from '../../common/files/FileLibrary';
import Text from '../../common/typography/Text';

// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class FilesLibraryManager extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        fileUpload: this.context.getStore(FileUploadStore).getState(),
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        require('./FilesLibraryManager.scss');
    }

    componentWillReceiveProps(nextProps) {

        let fieldErrors = {};
        if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
            nextProps._error.validation.keys.forEach(function (field) {
                fieldErrors[field] = nextProps._error.validation.details[field];
            });
        }

        // Check if a file was uploaded
        if (this.state.fileUpload.loading && !nextProps._fileUpload.loading && !nextProps._fileUpload.error) {
            let files = this.props.files;
            files.push(nextProps._fileUpload.file);
            this.props.onChange(files);
        }

        this.setState({
            fileUpload: nextProps._fileUpload,
            fieldErrors: fieldErrors
        });
    }

    //*** View Controllers ***//

    handleFileSubmit = (files) => {
        this.context.executeAction(uploadFile, {
            resource: 'copies',
            file: files
        });
    };

    //*** Template ***//

    render() {

        let inputClass = 'input-field__input';

        if (this.props.error) {
            inputClass += ' input-field__input--error';
        }

        return (
            <div className="file-library-manager">
                <div className="file-library-manager__gallery">
                    <div className="file-library-manager__upload">
                        <FileUpload onSubmit={this.handleFileSubmit}
                                     disabled={this.state.fileUpload.loading} />
                    </div>
                    <div className="file-library-manager__images">
                        <FileLibrary files={this.props.files}
                                      onChange={this.props.onChange} />
                    </div>
                </div>
                {this.props.error ?
                    <div className="input-field__error">
                        <Text size="small">{this.props.error}</Text>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}


/**
 * Flux
 */
FilesLibraryManager = connectToStores(FilesLibraryManager, [FileUploadStore], (context) => {
    return {
        _fileUpload: context.getStore(FileUploadStore).getState()
    };
});

/**
 * Exports
 */
export default FilesLibraryManager;
