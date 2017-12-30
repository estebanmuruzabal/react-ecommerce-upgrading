import React from 'react';
import {Link} from 'react-router';
import {slugify} from '../../../utils/strings';
import Heading from '../typography/Heading';
import Text from '../typography/Text';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
class ArticleSummary extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ArticleSummary.scss');
    }

    //*** Template ***//

    render() {

        let articleRouteParams = objectAssign({
            contentId: this.props.content.id,
            contentSlug: slugify(this.props.content.name)
        });

        let headingSize = 'medium';
        if (['small', 'large'].indexOf(this.props.size) !== -1) {
            headingSize = this.props.size;
        }

        let showReadMore = this.props.content.body.markdown && this.props.content.body.markdown
            && this.props.content.body.markdown !== ''
            && !this.props.hideLink;

        //
        // Return
        //
        return (
            <div className="article-summary">
                <Heading size={headingSize}>
                  {this.props.content.name}
                </Heading>
                <div className="article-summary__content">
                    <Text size="small">
                      {this.props.content.body.summary}
                        {showReadMore ?
                            <Link className="article-summary__link" to="article-slug">
                                Leer más
                                <i className="fa fa-file-text-o" aria-hidden="true" />
                            </Link>
                            :
                            null
                        }
                    </Text>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default ArticleSummary;
