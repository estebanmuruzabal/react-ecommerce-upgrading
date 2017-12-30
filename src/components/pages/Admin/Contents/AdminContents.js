/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

// Flux
import ContentsAddStore from '../../../../stores/Contents/ContentsAddStore';
import ContentsListStore from '../../../../stores/Contents/ContentsListStore';
import addContent from '../../../../actions/Admin/addContent';
import fetchContents from '../../../../actions/Contents/fetchContents';

// Required components
import Button from '../../../common/buttons/Button';
import Heading from '../../../common/typography/Heading';
import Label from '../../../common/indicators/Label';
import Modal from '../../../common/modals/Modal';
import Spinner from '../../../common/indicators/Spinner';
import StatusIndicator from '../../../common/indicators/StatusIndicator';
import Table from '../../../common/tables/Table';
import Text from '../../../common/typography/Text';

import AdminContentsAddForm from './AdminContentsAddForm';

/**
 * Component
 */
class AdminContents extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired,
        router: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        addContent: this.context.getStore(ContentsAddStore).getState(),
        contents: this.context.getStore(ContentsListStore).getContents(),
        loading: this.context.getStore(ContentsListStore).isLoading(),
        showNewContentModal: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminContents.scss');

        // Request required data
        this.context.executeAction(fetchContents, {});
    }

    componentWillReceiveProps(nextProps) {

        // If new content was being added and was successful, redirect to
        // content edit page
        if (this.state.addContent.loading === true
            && nextProps._addContent.loading === false && !nextProps._addContent.error) {
            let params = {
                contentId: nextProps._addContent.content.id
            };
            this.context.router.transitionTo('adm-content-edit', params);
        }

        // Update state
        this.setState({
            addContent: nextProps._addContent,
            contents: nextProps._contents,
            loading: nextProps._loading
        });
    }

    //*** View Controllers ***//

    handleNewContentClick = () => {
        this.setState({showNewContentModal: true});
    };

    handleNewContentCloseClick = () => {
        this.setState({showNewContentModal: false});
    };

    handleNewContentSubmitClick = (data) => {
        this.context.executeAction(addContent, data);
    };

    //*** Template ***//

    render() {

        let newContentModal = () => {
            if (this.state.showNewContentModal) {
                return (
                    <Modal title='Crear nuevo contenido'
                           onCloseClick={this.handleNewContentCloseClick}>
                        <AdminContentsAddForm
                            loading={this.state.addContent.loading}
                            onCancelClick={this.handleNewContentCloseClick}
                            onSubmitClick={this.handleNewContentSubmitClick} />
                    </Modal>
                );
            }
        };

        let headings = ['Tipo','Nombre','Tags','Activar'];

        let rows = this.state.contents.map(function (content) {
            return {
                data: [
                    <Text size="medium">
                        {content.type ?
                            <Label>
                                {content.type}
                            </Label>
                            :
                            <Label type="error">
                                No definido
                            </Label>
                        }
                    </Text>,
                    <span className="admin-contents__link">
                        <Link to="adm-content-edit" params={objectAssign({contentId: content.id})}>
                            {content.name}
                        </Link>
                    </span>,
                    <div className="admin-contents__labels">
                        {content.tags.map(function (tag, idx) {
                            return (
                                <div key={idx} className="admin-contents__tag">
                                    <Label>
                                        {tag}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>,
                    <StatusIndicator status={(content.enabled === true) ? 'success' : 'default'} />
                ]
            };
        });

        //
        // Return
        //
        return (
            <div className="admin-contents">
                {newContentModal()}

                <div className="admin-contents__header">
                    <div className="admin-contents__title">
                        <Heading size="medium">
                            Contenidos
                        </Heading>
                    </div>
                    <div className="admin-contents__toolbar">
                        <div className="admin-contents__add-button">
                            <Button type="primary" onClick={this.handleNewContentClick}>
                                Nuevo
                            </Button>
                        </div>
                    </div>
                </div>

                {this.state.loading ?
                    <div className="admin-contents__spinner">
                        <Spinner />
                    </div>
                    :
                    <div className="admin-contents__list">
                        <Table headings={headings} rows={rows} />
                    </div>
                }
            </div>
        );
    }
}

/**
 * Flux
 */
AdminContents = connectToStores(AdminContents, [ContentsAddStore, ContentsListStore], (context) => {
    return {
        _addContent: context.getStore(ContentsAddStore).getState(),
        _contents: context.getStore(ContentsListStore).getContents(),
        _loading: context.getStore(ContentsListStore).isLoading()
    };
});

/**
 * Exports
 */
export default AdminContents;
