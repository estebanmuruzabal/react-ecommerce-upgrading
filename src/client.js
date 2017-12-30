/**
 * Imports.
 */
/*global App, document, window */
import Debug from 'debug';
import React from 'react';
import Router from 'react-router';
import {FluxibleComponent} from 'fluxible-addons-react';

// Flux
import ApplicationStore from './stores/Application/ApplicationStore';

import clearRouteErrors from './actions/Application/clearRouteErrors';
import fetchAccountDetails from './actions/Account/fetchAccountDetails';
import navigateAction from './actions/Application/navigate';
import pageWidthChanged from './actions/Application/pageWidthChanged';
import triggerPageLoading from './actions/Application/triggerPageLoading';

// Utils
import fetchData from './utils/fetchData';
import fetchPageTitleAndSnippets from './utils/fetchPageTitleAndSnippets';

import config from './config';

// Setup and initialize debugging utility.
const debug = Debug('institutoaleman');

// For chrome dev tool support.
window.React = React;

// State sent from the server.
let dehydratedState = window.App;

/**
 * Helper methods
 */

function dispatchClearRouteErrors(context) {
    return new Promise(function (resolve, reject) {
        context.executeAction(clearRouteErrors, {}, function () { resolve(); });
    });
}

function dispatchGetAccountDetails(context) {
    return new Promise(function (resolve, reject) {
        context.executeAction(fetchAccountDetails, {}, function () { resolve(); });
    });
}

function dispatchPageResize(context) {
    return new Promise(function (resolve, reject) {
        context.executeAction(pageWidthChanged, window.innerWidth, function () { resolve(); });
    });
}

/**
 * Run application.
 * Everything that should be run after certain polyfills are initialized (e.g. Intl in Safari browser) should
 * be encapsulated in this method (e.g. fluxible app require, which needs Intl).
 */
function runApp() {

    var app = require('./app');

    // Render application with re-hydrated state.
    function RenderApp(context, Handler) {
        return new Promise(function (resolve, reject) {
            debug('React Rendering');
            let mountNode = document.getElementById('app');
            let Component = React.createFactory(Handler);
            React.render(
                React.createElement(
                    FluxibleComponent,
                    { context: context.getComponentContext() },
                    Component()
                ),
                mountNode,
                function () {
                    debug('React Rendered');
                    resolve();
                }
            );
        });
    }

    // Initialize Google Analytics
    if (config.googleAnalytics.enabled === true) {
        debug('Initialize Google Analytics');

    }

    // Initialize Facebook Pixel
    if (config.facebookPixel.enabled === true) {
        try {
            fbq('init', config.facebookPixel.id);
            debug('Facebook pixel successfully initialized!');
        } catch (err) {
            console.error('Unable to initialize Facebook Pixel', err);
        }
    }

    // Re-hydrate application state.
    debug('rehydrating app');
    app.rehydrate(dehydratedState, function (err, context) {
        if (err) {
            throw err;
        }
        window.context = context;

        var firstRender = true;
        Router.run(app.getComponent(), Router.HistoryLocation, async function (Handler, state) {

            // Track Pageviews with Google Analytics
            if (config.googleAnalytics.enabled === true) {
                debug('Track pageview', state.pathname);

            }

            // Send hit to Facebook Pixel
            try {
                fbq('track', 'PageView');
            } catch (err) {
                debug('Unable to send hit to Facebook Pixel', err);
            }

            if (firstRender) {
                debug('First render');

                if (config.api.enabled === true) {
                  // When first loading the app on the client, trigger fetching of user account
                  // details before proceding so that, if a user is logged in, this information
                  // is readily available to the application (e.g. for limiting access to certain pages)
                  await dispatchGetAccountDetails(context);
                }

                // Don't call the action on the first render on top of the server rehydration
                // Otherwise there is a race condition where the action gets executed before
                // render has been called, which can cause the checksum to fail.
                firstRender = false; // This has to be done before render
                await RenderApp(context, Handler);

                // Add listener to page size changes and trigger respective action right away
                // so that components that depend on this information for implementing responsive
                // behaviors have this information available now and updated whenever it changes.
                // Note: this should only be triggered after React has finished rendering, to avoid
                // warnings regarding invalid DOM checksums.
                window.addEventListener('resize', dispatchPageResize.bind(null, context), false);
                dispatchPageResize(context);

            } else {
                debug('Single-page-mode render');

                context.executeAction(triggerPageLoading, true);

                // Trigger fetching and wait for the data required by the components of the given route.
                // On first render, this is done on the server side.
                await fetchData(context, state);

                // Set page title and snippets from the route handlers
                let pageTitleAndSnippets = fetchPageTitleAndSnippets(context, state);
                document.title = pageTitleAndSnippets ? pageTitleAndSnippets.title : config.app.title;

                // Route Errors (i.e. most likely 404 Not Found)
                // There are are routes that may be valid in the sense that they "exist" but,
                // in reality, are invalid because the underlying resource does not exist (e.g. Product ID not found).
                // We should catch those here and act accordingly, like rendering Not Found page or setting
                // proper HTTP status code.
                let routeError = context.getStore(ApplicationStore).getRouteError();
                await dispatchClearRouteErrors(context); // Very important!!!
                if (routeError) {
                    debug(`(Client) Route Error ${routeError}`);
                }

                context.executeAction(navigateAction, state, function () {
                    RenderApp(context, Handler).then(function () {
                        context.executeAction(triggerPageLoading, false);
                    });
                });
            }
        });
    });
}

 runApp();
