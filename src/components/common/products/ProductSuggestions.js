/**
 * Imports
 */
import React from 'react';
import {Link} from 'react-router';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
import {slugify} from '../../../utils/strings';

// Required components
import Heading from '../typography/Heading';
import Spinner from '../indicators/Spinner';
import Text from '../typography/Text';

/**
 * Component
 */
class ProductSuggestions extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        placeholderImage: undefined
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductSuggestions.scss');

        // Load static files
        this.setState({
            placeholderImage: require('../images/image_placeholder.png')
        });
    }

    //*** Template ***//

    render() {

        return (
            <div className="product-suggestions">
                {this.props.children ?
                    <Heading size="small" align="center">{this.props.children}</Heading>
                    :
                    null
                }
                {this.props.loading ?
                    <div className="product-suggestions__loading">
                        <Spinner />
                    </div>
                    :
                    <div className="product-suggestions__list">
                        {this.props.products.map((product, idx) => {
                            let params = objectAssign({
                                productId: product.id,
                                productSlug: slugify(product.name)
                            });
                            let image = (product.images && product.images.length > 0) ? `//${product.images[0].url}` : this.state.placeholderImage;
                            return (
                                <div key={idx} className="product-suggestions__item">
                                    <Link to="product-slug" params={params}>
                                        <div className="product-suggestions__item-image">
                                            <img src={image} />
                                        </div>
                                        <div className="product-suggestions__item-name">
                                            <Text size="small">
                                                {product.name}
                                            </Text>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
        );
    }
}

/**
 * Exports
 */
export default ProductSuggestions;
