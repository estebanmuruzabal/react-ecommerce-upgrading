/**
 * Imports
 */
import React from 'react';
import async from 'async';
import connectToStores from 'fluxible-addons-react/connectToStores';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import objectAssign from 'object-assign';
import config from '../../../config';
import {slugify} from '../../../utils/strings';

// Flux
import CollectionsStore from '../../../stores/Collections/CollectionsStore';
import ContentsListStore from '../../../stores/Contents/ContentsListStore';

import ProductSuggestionsStore from '../../../stores/Products/ProductSuggestionsStore';

import fetchContents from '../../../actions/Contents/fetchContents';
import fetchProductSuggestions from '../../../actions/Products/fetchProductSuggestions';

// Required components
import ArticleSummary from '../../common/articles/ArticleSummary';
import Heading from '../../common/typography/Heading';
import ProductSuggestions from '../../common/products/ProductSuggestions';
import NewsletterSubscription from '../../common/forms/NewsletterSubscription';
import Text from '../../common/typography/Text';
import TreeMenu from '../../common/navigation/TreeMenu';

/**
 * Component
 */
class ArticlesListingPage extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired
    };

    //*** Required Data ***//

    static fetchData = function (context, params, query, done) {
        async.parallel([
            function (callback) {
                context.executeAction(fetchContents, {type: 'article', collections: query.collections}, callback);
            },
            function (callback) {
                let collections;
                if (context.getStore(CollectionsStore).getCollections() > 0) {
                    collections = context.getStore(CollectionsStore).getCollections().join(',');
                }
                context.executeAction(fetchProductSuggestions, {metadata: {mainCollection: collections}}, callback);
            }
        ], done);
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'Articulos'
        }
    };

    //*** Initial State ***//

    state = {
        contents: this.context.getStore(ContentsListStore).getContents(),
        loading: this.context.getStore(ContentsListStore).isLoading(),
        error: this.context.getStore(ContentsListStore).getError(),
        categories: this.context.getStore(CollectionsStore).getCollections(['category']),
        collections: this.context.getStore(CollectionsStore).getCollections(['collection']),
        productSuggestions: this.context.getStore(ProductSuggestionsStore).getProducts(),
        productSuggestionsLoading: this.context.getStore(ProductSuggestionsStore).isLoading()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ArticlesListingPage.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            contents: nextProps._contents,
            loading: nextProps._loading,
            error: nextProps._error,
            categories: nextProps._categories,
            collections: nextProps._collections,
            productSuggestions: nextProps._productSuggestions,
            productSuggestionsLoading: nextProps._productSuggestionsLoading
        });
    }

    //*** Template ***//

    render() {

        var filters = [
            {
                name: 'Categorias',
                collections: this.state.categories
            },
            {
                name: 'Colleciones',
                collections: this.state.collections
            }
        ];

        //
        // Return
        //
        return (
            <div className="articles-listing-page">
                <div className="article-listing-page__header">
                    <div className="article-listing-page__title">
                        <Heading size="large">
                            <i className="fa fa-file-text-o" aria-hidden="true" />
                            &nbsp;
                            Seccion de Artículos
                        </Heading>
                    </div>
                    <div className="article-listing-page__headline">
                        <Text>
                            Headline
                        </Text>
                    </div>
                </div>
                <div className="article-listing-page__body">
                    <div className="article-listing-page__left-column">
                        {this.props.query.collections ?
                            <div className="article-listing-page__view-all">
                                <Link to="articles">
                                    <Text>
                                        <i className="fa fa-chevron-left" aria-hidden="true" />
                                        &nbsp;
                                        Ver todos los articulos
                                    </Text>
                                </Link>
                            </div>
                            :
                            null
                        }
                        {filters.map((item, idx) => {
                            let links = item.collections.map((col) => {
                                return {
                                    name: col.name,
                                    to: 'articles',
                                    params: {

                                    },
                                    query: {
                                        collections: col.id
                                    },
                                    selected: this.props.query.collections ? this.props.query.collections.split(',').indexOf(col.id) !== -1 : false
                                };
                            });
                            if (links.length > 0) {
                                return (
                                    <div key={idx} className="article-listing-page__filter">
                                        <TreeMenu links={links}>
                                            {item.name}
                                        </TreeMenu>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div className="article-listing-page__center-column">
                        {this.state.contents.length > 0 ?
                            <div className="article-listing-page__list">
                                {this.state.contents.filter(c => c.type === 'article').map((content, idx) => {
                                    let articleRouteParams = objectAssign({
                                        contentId: content.id,
                                        contentSlug: slugify(content.name)
                                    }, routeParams);
                                    return (
                                        <div className="article-listing-page__item">
                                            <Link className="article-listing-page__item-link" to="article-slug"
                                                  params={articleRouteParams}>
                                                <ArticleSummary key={idx} content={content} hideLink={true} />
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                            :
                            <div className="article-listing-page__list article-listing-page__noResults">
                                <Text>
                                    No hay resultados
                                </Text>
                            </div>
                        }
                    </div>
                    <div className="article-listing-page__right-column">
                        <div className="article-listing-page__newsletter">
                            <div className="article-listing-page__newsletter-cta">
                                <Heading size="small">
                                    Desea recibir los artículos en su email?
                                </Heading>
                            </div>
                            <NewsletterSubscription />
                        </div>
                        {this.state.productSuggestions && this.state.productSuggestions.length > 0 ?
                            <div className="article-listing-page__product-suggestions">
                                <ProductSuggestions products={this.state.productSuggestions} loading={this.state.productSuggestionsLoading}>
                                    Productos sugeridos
                                </ProductSuggestions>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
ArticlesListingPage = connectToStores(ArticlesListingPage, [CollectionsStore, ContentsListStore, ProductSuggestionsStore], (context) => {
    return {
        _contents: context.getStore(ContentsListStore).getContents(),
        _loading: context.getStore(ContentsListStore).isLoading(),
        _error: context.getStore(ContentsListStore).getError(),
        _categories: context.getStore(CollectionsStore).getCollections(['category']),
        _collections: context.getStore(CollectionsStore).getCollections(['collection']),
        _productSuggestions: context.getStore(ProductSuggestionsStore).getProducts(),
        _productSuggestionsLoading: context.getStore(ProductSuggestionsStore).isLoading()
    };
});

/**
 * Exports
 */
export default ArticlesListingPage;
