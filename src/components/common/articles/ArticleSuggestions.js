import React from 'react';
import {Link} from 'react-router';
import {slugify} from '../../../utils/strings';
import Heading from '../typography/Heading';
import Text from '../typography/Text';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
class ArticleSuggestions extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    componentDidMount() {
        require('./ArticleSuggestions.scss');
    }

    render() {

        return (
            <div className="article-suggestions">
                {this.props.children ?
                    <Heading size="small" align="center">{this.props.children}</Heading>
                    :
                    null
                }
                <div className="article-suggestions__list">
                    {this.props.articles.map(function (article) {
                        let articleRouteParams = objectAssign({
                            contentId: article.id,
                            contentSlug: slugify(article.name)
                        }, routeParams);
                        return (
                            <div className="article-suggestions__item">
                                <div className="article-suggestions__item-icon">
                                    <i className="fa fa-file-text-o fa-2x" aria-hidden="true" />
                                </div>
                                <div className="article-suggestions__title">
                                    <Link className="article-suggestions__link" to="article-slug">
                                        <Text>
                                          article.name
                                        </Text>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default ArticleSuggestions;
