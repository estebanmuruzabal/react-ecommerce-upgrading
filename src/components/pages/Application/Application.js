/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {RouteHandler} from 'react-router';
import PropTypes from 'prop-types';
import {slugify} from '../../../utils/strings';

// Flux
import AccountStore from '../../../stores/Account/AccountStore';
import ApplicationStore from '../../../stores/Application/ApplicationStore';
import CollectionsStore from '../../../stores/Collections/CollectionsStore';
import DrawerStore from '../../../stores/Application/DrawerStore';

import NotificationQueueStore from '../../../stores/Application/NotificationQueueStore';
import PageLoadingStore from '../../../stores/Application/PageLoadingStore';

import popNotification from '../../../actions/Application/popNotification';
import triggerDrawer from '../../../actions/Application/triggerDrawer';

// Required components
import Drawer from '../../common/layout/Drawer/Drawer';
import Footer from '../../common/layout/Footer';
import Header from '../../common/layout/Header';
import Heading from '../../common/typography/Heading';
import OverlayLoader from '../../common/indicators/OverlayLoader';
import SideCart from '../../common/cart/SideCart';
import SideMenu from '../../common/navigation/SideMenu';

import PopTopNotification from '../../common/notifications/PopTopNotification';

/**
 * Component
 */
class Application extends React.Component {

    static contextTypes = {
        executeAction: PropTypes.func.isRequired,
        getStore: PropTypes.func.isRequired,
        router: PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        navCollections: this.context.getStore(CollectionsStore).getMainNavigationCollections(),
        collectionsTree: this.context.getStore(CollectionsStore).getCollectionsTree(),
        notification: this.context.getStore(NotificationQueueStore).pop(),
        openedDrawer: this.context.getStore(DrawerStore).getOpenedDrawer(),
        pageLoading: this.context.getStore(PageLoadingStore).isLoading()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Load styles
        require('./Application.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            navCollections: nextProps._navCollections,
            collectionsTree: nextProps._collectionsTree,
            notification: nextProps._notification,
            openedDrawer: nextProps._openedDrawer,
            pageLoading: nextProps._pageLoading
        });
    }

    //*** View Controllers ***//

    handleNotificationDismissClick = () => {
        this.context.executeAction(popNotification);
    };

    handleOverlayClick = () => {
        this.context.executeAction(triggerDrawer, null);
    };

    //*** Template ***//

    render() {

        let collections = this.state.navCollections.map(function (collection) {
            return {
                name: collection.name,
                to: 'collection-slug',
                params: {
                    collectionId: collection.id,
                    collectionSlug: slugify(collection.name)
                }
            };
        });

        let tabs = [
          {
            name: 'Inicio',
            to: 'homepage'
         },
         {
           name: 'Sobre nosotros',
           to: 'sobre-nosotros'
        },
          {
            name: 'Idioma Alemán',
            to: 'idioma-aleman',
            submenus: [
              {
                name: 'Por qué aprender alemán',
                to: 'porque-aprender-aleman',
              },
               {
                 name: 'Cursos de Alemán',
                 to: 'cursos-de-aleman',
               },
                {
                 name: 'Exámenes',
                 to: 'examenes-de-aleman',
               },

            ]
         },
           {
             name: 'Intercambios',
             to: 'intercambios',
             submenus: [
                 {
                  name: 'Intercambio Cultural',
                  to: 'intercambio-cultural',
                }
              ]
          },
          {
            name: 'Becas',
            to: 'becas'
         }
        ];

        // Compute CSS classes for the overlay
        let overlayClass = 'application__overlay';
        if (this.state.openedDrawer === 'menu') {
            overlayClass += ' application__overlay--right-drawer-open';
        } else if (this.state.openedDrawer === 'cart') {
            overlayClass += ' application__overlay--left-drawer-open';
        }

        // Compute CSS classes for the content
        let contentClass = 'application__container';
        if (this.state.openedDrawer === 'menu') {
            contentClass += ' application__container--right-drawer-open';
        } else if (this.state.openedDrawer === 'cart') {
            contentClass += ' application__container--left-drawer-open';
        }

        // Check if user logged-in is an Admin
        //let isAdmin = this.context.getStore(AccountStore).isAuthorized(['admin']);

        // Return
        return (
            <div className="application">
                {this.state.pageLoading ?
                    <OverlayLoader />
                    :
                    null
                }

                {this.state.notification ?
                    <PopTopNotification key={this.context.getStore(ApplicationStore).uniqueId()}
                                        type={this.state.notification.type}
                                        onDismissClick={this.handleNotificationDismissClick}>
                        {this.state.notification.message}
                    </PopTopNotification>
                    :
                    null
                }
                <Drawer position="right" open={this.state.openedDrawer === 'menu'}>
                    <SideMenu collections={collections} tabs={tabs} />
                </Drawer>
                <div className={overlayClass} onClick={this.handleOverlayClick}>
                    <div className="application__overlay-content"></div>
                </div>
                <div className={contentClass}>
                    <Header collections={collections} tabs={tabs} collectionsTree={this.state.collectionsTree} />
                    <div className="application__container-wrapper">
                        <div className="application__container-content">
                            <RouteHandler />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
Application = connectToStores(Application, [
    AccountStore,
    CollectionsStore,
    DrawerStore,
    NotificationQueueStore,
    PageLoadingStore
], (context) => {
    return {
        _navCollections: context.getStore(CollectionsStore).getMainNavigationCollections(),
        _collectionsTree: context.getStore(CollectionsStore).getCollectionsTree(),
        _notification: context.getStore(NotificationQueueStore).pop(),
        _openedDrawer: context.getStore(DrawerStore).getOpenedDrawer(),
        _pageLoading: context.getStore(PageLoadingStore).isLoading()
    };
});

/**
 * Exports
 */
export default Application;
