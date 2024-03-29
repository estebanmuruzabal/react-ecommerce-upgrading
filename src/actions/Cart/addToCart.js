/**
 * Imports
 */


// Flux
import CartStore from '../../stores/Cart/CartStore';
import CollectionsStore from '../../stores/Collections/CollectionsStore';

import cartActions from '../../constants/cart';

// Instantiate logger
let debug = require('debug')('institutoaleman');

/**
 * Update cart product
 */
export default function addToCart(context, payload, done) {

    // Send hit to Google Analytics
    try {
        let categoryName;
        if (payload.details.metadata.mainCollection) {
            let collection = context.getStore(CollectionsStore).getCollection(payload.details.metadata.mainCollection);
            categoryName = collection.name;
        }
      
    } catch (err) {
        debug('Unable to send hit to Google Analytics', err);
    }

    // Send hit to Facebook Pixel
    try {
        fbq('track', 'AddToCart');
    } catch (err) {
        debug('Unable to send hit to Facebook Pixel', err);
    }

    // Make API call
    let cartId = context.getStore(CartStore).getCartId();
    let cartAccessToken = context.getStore(CartStore).getCartAccessToken();
    context.dispatch(cartActions.CART_UPDATE);
    context.api.cart.patch(cartId, {product: {
        id: payload.id,
        quantity: payload.quantity
    }}, cartAccessToken).then(function successFn(result) {
        context.dispatch(cartActions.CART_UPDATE_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(cartActions.CART_UPDATE_ERROR, err.result);
        done && done();
    });
}
