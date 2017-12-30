import React from 'react';
import Select from '../forms/Select';
import Text from '../typography/Text';
import PropTypes from 'prop-types';
let debug = require('debug')('tienda765');

/**
 * Component
 */
class ProductsSortingSelect extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductsSortingSelect.scss');
    }

    //*** Template ***//

    render() {



        // Sorting Options
        var sortOptions = [
            /*{
             name: <FormattedMessage
             message={intlStore.getMessage(intlData, 'sortFeatured')}
             locales={intlStore.getCurrentLocale()} />,
             value: 'featured'
             },
             {
             name: <FormattedMessage
             message={intlStore.getMessage(intlData, 'sortBestSelling')}
             locales={intlStore.getCurrentLocale()} />,
             value: 'best-selling'
             },*/
            {
                name: 'Alfabeticamente: A-Z',
                value: 'alphabetically'
            },
            {
                name: 'Alfabeticamente: Z-A',
                value: '-alphabetically'
            },
            {
                name: 'Más baratos',
                value: 'price'
            },
            {
                name: 'Más caros',
                value: '-price'
            },
            {
                name: 'Más recientes',
                value: '-date'
            },
            {
                name: 'Más antigos',
                value: 'date'
            }
        ];

        return (
            <div className="products-sorting-select">
                <div className="products-sorting-select__label">
                    <Text size="small" weight="bold">
                        Ordenar por
                    </Text>
                </div>
                <div className="products-sorting-select__options">
                    <Select size="small"
                            options={sortOptions}
                            placeholder
                            onChange={this.props.onChange} />
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
Select.defaultProps = {
    onChange: function (value) { debug(`onChange not defined. Value: ${value}`); }
};

/**
 * Exports
 */
export default ProductsSortingSelect;
