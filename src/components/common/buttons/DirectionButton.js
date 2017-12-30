import React from 'react';
let debug = require('debug')('tienda765');
import PropTypes from 'prop-types';
class DirectionButton extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    componentDidMount() {
        require('./DirectionButton.scss');
    }

    render() {
        return (
            <div className="direction-button">
                { this.props.itemsNum > 1  ?
                    <div>
                      <span className="direction-button__move-button" onClick={this.props.handleMoveLeftClick}>
                          &#10094;
                      </span>
                      <span>{this.props.item.name}</span>
                      <span className="direction-button__move-button" onClick={this.props.handleMoveRightClick}>
                          &#10095;
                      </span>
                    </div>
                    :
                    <div>
                      <span>{this.props.item.name}</span>
                    </div>
                }
            </div>
        );
    }
}

/**
 * Default Props
 */
DirectionButton.defaultProps = {
    handleMoveLeftClick: function () { debug('handleMoveLeftClick not defined'); },
    handleMoveRightClick: function () { debug('handleMoveRightClick not defined'); }
};

/**
 * Exports
 */
export default DirectionButton;
