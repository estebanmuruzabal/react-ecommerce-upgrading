import checkoutActions from '../../constants/checkout';
import config from '../../config';

// Initialize debugging utility
let debug = require('debug')('institutoaleman');

export default function createCheckout(context, payload, done) {
    context.dispatch(checkoutActions.CHECKOUT_CREATE);
    context.api.checkouts.create(payload.cartId, payload.cartAccessToken, payload.data).then(function checkoutCreateSuccess(checkout) {

        function dispatchEvents(paymentOptions) {
            context.dispatch(checkoutActions.CHECKOUT_CREATE_SUCCESS, checkout);
            done && done();
        }

        // 0) Send hit to Facebook Pixel
        try {
            fbq('track', 'InitiateCheckout');
        } catch (err) {
            debug('Unable to send hit to Facebook Pixel', err);
        }

        dispatchEvents();
        
    }, function checkoutCreateError(err) {
        context.dispatch(checkoutActions.CHECKOUT_CREATE_ERROR, err.result);
        done && done();
    });
}
