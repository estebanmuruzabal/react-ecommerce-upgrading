/**
 * Imports
 */
import React from 'react';
import {slugify} from '../../../utils/strings';
import Heading from '../typography/Heading';
import Pagination from '../navigation/Pagination';
import ProductListItem from './ProductListItem';
import Text from '../typography/Text';
import TreeMenu from '../navigation/TreeMenu';
import { Link} from 'react-router';
import PropTypes from 'prop-types';
class ProductList extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductList.scss');
    }

    //*** Template ***//

    render() {


        let hasDescription = () => {
            return this.props.collection && this.props.collection.description;
        };

        return (
            <div className="product-list">
                {this.props.filters ?
                    <div className="product-list__sidebar">
                        {this.props.filters.map((item, idx) => {
                            let links = item.collections.map((col) => {
                                return {
                                    name: col.name,
                                    to: 'collection-slug',
                                    params: {
                                        collectionId: col.id,
                                        collectionSlug: slugify(col.name)
                                    },
                                    selected: this.props.collection ? col.id === this.props.collection.id : false
                                };
                            });
                            if (links.length > 0) {
                                return (
                                    <div key={idx} className="product-list__filter">
                                        <TreeMenu links={links}>
                                              {item.name}
                                        </TreeMenu>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    :
                    null
                }
                <div className="product-list__container">

                    <div className="verduras-banner-container"></div>

                    {hasDescription() ?
                        <div className="product-list__collection-description">
                            <Text size="small">
                                {this.props.collection.description}
                            </Text>
                        </div>
                        :
                        null
                    }
                    {this.props.children ?
                        <div className="product-list__content">
                            {this.props.children}
                        </div>
                        :
                        null
                    }
                    <div className="product-list__items">
                        {this.props.products.length > 0 ?
                            this.props.products.map(function (item, idx) {
                              return (
                                  <div key={idx} className="product-list__product-item">
                                      <ProductListItem product={item} />
                                  </div>
                              );
                            })
                            :
                            <div className="product-list__no-results">
                                <Text size="medium">
                                    Su busqueda no encontró productos asociados
                                </Text>
                            </div>
                        }
                    </div>
                    {this.props.totalPages && this.props.currentPage && this.props.routeParams && this.props.totalPages > 1 ?
                        <div className="product-list__pagination">
                            <Pagination to={this.props.paginateTo || 'collection'}
                                        params={this.props.routeParams}
                                        totalPages={this.props.totalPages}
                                        currentPage={this.props.currentPage} />
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default ProductList;
