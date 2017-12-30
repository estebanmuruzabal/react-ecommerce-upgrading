import React from 'react';
import async from 'async';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {Link} from 'react-router';
import {slugify} from '../../../utils/strings';
import CollectionsStore from '../../../stores/Collections/CollectionsStore';
import ContentsListStore from '../../../stores/Contents/ContentsListStore';
import fetchContents from '../../../actions/Contents/fetchContents';
import ArticleSummary from '../../common/articles/ArticleSummary';
import Carousel from '../../common/images/Carousel';
import HomepageFeaturedCollection from './HomepageFeaturedCollection';
import Heading from '../../common/typography/Heading';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
class Homepage extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    static fetchData = function (context, params, query, done) {
        async.parallel([
            function (callback) {
                context.executeAction(fetchContents, {tags: 'homepage'}, callback);
            }
        ], done);
    };

    state = {
        banners: this.context.getStore(ContentsListStore).getOrderedContentsOfType('banner', ['homepage'], true),
        articles: this.context.getStore(ContentsListStore).getOrderedContentsOfType('article', ['homepage'], true),
        collections: this.context.getStore(CollectionsStore).getOrderedCollections(['homepageFeatured'], true, 'homepageFeaturedOrder'),
        featuredCategories: this.context.getStore(CollectionsStore).getCollections(['category', 'homepage']),
        featuredCollections: this.context.getStore(CollectionsStore).getCollections(['collection', 'homepage'])
    };

    componentDidMount() {
        require('./Homepage.scss');

       // Load the SDK asynchronously
       (function(d, s, id) {
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) return;
         js = d.createElement(s); js.id = id;
         js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=1037352503073319';
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));


    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            banners: nextProps._banners,
            articles: nextProps._articles,
            collections: nextProps._collections,
            featuredCategories: nextProps._featuredCategories,
            featuredCollections: nextProps._featuredCollections
        });
    }

    render() {

        let featuredCollections = [null, null, null, null];
        for (let i=0; i<4; i++) {
            if (this.state.collections[i]) {
                let collection = this.state.collections[i];
                featuredCollections[i] = {
                    name: collection.name,
                    link: {
                        to: 'collection-slug',
                        params: objectAssign({
                            collectionId: collection.id,
                            collectionSlug: slugify(collection.name)
                        }, routeParams)
                    }
                };
                if (collection.images && collection.images.length > 0) {
                    featuredCollections[i].img = {
                        src: `//${collection.images[0].url}`,
                        alt: collection.name
                    };
                }
            }
        }

        return (
            <div className="homepage">
                <div className="homepage__cta">
                  <div className="homepage__banners">
                      <Carousel images={this.state.banners.filter(function (banner) {
                          return banner.body && banner.body.image;
                      }).map(function (banner) {
                          return {
                              src: `//${banner.body.image.url}`,
                              link: banner.body.link
                          };
                      })} />
                  </div>
                </div>
                <div className="homepage__text-content">
                  <div className="homepage__container-left-column">
                      <div className="homepage__title">
                        <Heading size="large">Nuestro instituto y el Goethe</Heading>
                      </div>
                      <br></br>
                      <p>El Instituto Alemán de Idioma y Cultura de Resistencia trabaja en Cooperación con el Goethe-Institut de Buenos Aires. El Goethe-Institut es el Instituto estatal de Alemania para difundir el idioma y la cultura alemana en todo el mundo.</p>
                      <br></br>
                      <p>Das Deutsche Institut für Sprache und Kultur in Resistencia arbeitet in Kooperation mit dem Goethe-Institut Buenos Aires. Das Goethe-Institut vermittelt in der ganzen Welt die Deutsche Sprache und Kultur.</p>
                      <br></br>
                      <p>Centro autorizado para exámenes internacionales del Goethe-Institut, Niveles A1-C1</p>
                      <br></br>
                      <div className="goethe-approve-image"></div>
                      <br></br>

                      <div className="actividades-div"></div>

                      <Heading size="large">Actividades adicionales</Heading>
                      <br></br>
                      <p>&bull; Alemania “Puertas abiertas”</p>
                      <br></br>
                      <p>&bull; Ciclos de cine alemán</p>
                      <br></br>
                      <p>&bull; Exposiciones internacionales</p>
                      <br></br>
                      <p>&bull; Encuentro de becarios del DAAD/UTN</p>
                      <br></br>
                      <p>&bull; Intercambio cultural con la Universidad de Nürnberg</p>
                      <br></br>
                      <p>&bull; Participación en eventos del Club Alemán-Austriaco, Municipalidad y Gobierno del Chaco</p>
                      <br></br>

                  </div>
                  <div className="homepage__container-right-column">
                      <div className="homepage__title">
                        <Heading size="large">Novedades en Facebook</Heading>
                      </div>
                      <br></br>
                      <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FInstitutoAlemanDeIdiomaYCultura%2Fposts%2F1973374199344135&width=500"  className="fb-frame" scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
                  </div>
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
Homepage = connectToStores(Homepage, [CollectionsStore], (context) => {
    return {
        _banners: context.getStore(ContentsListStore).getOrderedContentsOfType('banner', ['homepage'], true),
        _articles: context.getStore(ContentsListStore).getOrderedContentsOfType('article', ['homepage'], true),
        _collections: context.getStore(CollectionsStore).getOrderedCollections(['homepageFeatured'], true, 'homepageFeaturedOrder'),
        _featuredCategories: context.getStore(CollectionsStore).getCollections(['category', 'homepage']),
        _featuredCollections: context.getStore(CollectionsStore).getCollections(['collection', 'homepage'])
    };
});

/**
 * Export.
 */
export default Homepage;
