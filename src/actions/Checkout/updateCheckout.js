/**
 * Imports
 */


// Flux
import CheckoutStore from '../../stores/Checkout/CheckoutStore';
import CollectionsStore from '../../stores/Collections/CollectionsStore';
import checkoutActions from '../../constants/checkout';

// Instantiate logger
let debug = require('debug')('institutoaleman');

/**
 * Partial checkout update
 */
export default function updateCheckout(context, payload, done) {

    // Send hit to Google Analytics
    try {
        let checkout = context.getStore(CheckoutStore).getCheckout();
        if (payload.data.hasOwnProperty('customer') || payload.data.hasOwnProperty('paymentMethod') || payload.data.hasOwnProperty('shippingMethod') || payload.data.hasOwnProperty('shippingSchedule')) {
            checkout.cart.products.forEach(function (product) {
                let categoryName;
                if (product.details.metadata.mainCollection) {
                    let collection = context.getStore(CollectionsStore).getCollection(product.details.metadata.mainCollection);
                    categoryName = context.getStore(IntlStore).getMessage(collection.name);
                }

            });


        }
    } catch (err) {
        debug('Unable to send hit to Google Analytics', err);
    }

    // Send hit to Facebook Pixel
    if (payload.data.hasOwnProperty('paymentMethod')) {
        try {
            fbq('track', 'AddPaymentInfo');
        } catch (err) {
            debug('Unable to send hit to Facebook Pixel', err);
        }
    }

    // Make API call
    context.dispatch(checkoutActions.CHECKOUT_UPDATE);
    context.api.checkouts.patch(payload.checkoutId, payload.data, payload.cartAccessToken).then(function successFn(result) {
        context.dispatch(checkoutActions.CHECKOUT_UPDATE_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(checkoutActions.CHECKOUT_UPDATE_ERROR, err.result);
        done && done();
    });
};
