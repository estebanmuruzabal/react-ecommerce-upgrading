/**
 * Imports
 */


// Flux
import CheckoutStore from '../../stores/Checkout/CheckoutStore';
import AccountStore from '../../stores/Account/AccountStore';
import CollectionsStore from '../../stores/Collections/CollectionsStore';
import orderActions from '../../constants/orders';

//Product update
import updateProduct from '../../actions/Admin/updateProduct';
import fetchProduct from '../../actions/Products/fetchProduct';
import sendOrderEmail from '../../actions/Orders/sendOrderEmail';

import config from '../../config';

// Instantiate logger
let debug = require('debug')('institutoaleman');

/**
 * Create a new order
 */
export default function createOrder(context, payload, done) {
    context.dispatch(orderActions.ORDER_CREATE);
    context.api.orders.create(payload.checkoutId, payload.cartAccessToken).then(function orderCreateSuccess(order) {

        function dispatchOrderCreatedSuccessfullyAndUpdateStocks() {

            let checkout = context.getStore(CheckoutStore).getCheckout();
            let user = context.getStore(AccountStore).getAccountDetails();
            // Send hit to Google Analytics
            try {
                checkout.cart.products.forEach(function (product) {
                    let categoryName;
                    if (product.details.metadata.mainCollection) {
                        let collection = context.getStore(CollectionsStore).getCollection(product.details.metadata.mainCollection);
                        categoryName = context.getStore(IntlStore).getMessage(collection.name);
                    }


                    //update stock of product
                    try {
                      let newProductStockNum = product.details.stock - product.quantity;
                      context.executeAction(updateProduct, {
                          id: product.id,
                          data: {
                              enabled: product.details.enabled,
                              sku: product.details.sku,
                              name: product.details.name,
                              description: product.details.description,
                              images: product.details.images,
                              pricing: {
                                  currency: product.details.pricing.currency,
                                  list: parseFloat(product.details.pricing.list),
                                  retail: parseFloat(product.details.pricing.retail),
                                  vat: parseInt(product.details.pricing.vat)
                              },
                              stock: parseInt(newProductStockNum),
                              tags: product.details.tags,
                              collections: product.details.collections,
                              metadata: product.details.metadata
                          }
                      });
                    } catch (err) {
                        debug('Unable update stock of product', err);
                    }
                });
                
            } catch (err) {
                debug('Unable to send hit to Google Analytics', err);
            }

            let subject = 'Órden #' + order.id;

            if (checkout.customer) {
              if (checkout.paymentMethod == 'cash') {
                context.executeAction(sendOrderEmail,
                  {orderId: order.id,
                    data: {
                      template: 'order.created',
                      email: checkout.customer.email,
                      subject: subject,
                      paymentlink: ''
                    }
                  });
                  context.executeAction(sendOrderEmail,
                    {orderId: order.id,
                      data: {
                        template: 'order.created',
                        email: 'estebannmuruzabal@gmail.com',
                        subject: subject,
                        paymentlink: ''
                      }
                    });
              }
            } else if (user) {
              if (checkout.paymentMethod == 'cash') {
                context.executeAction(sendOrderEmail,
                  {orderId: order.id,
                    data: {
                      template: 'order.created',
                      email: user.email,
                      subject: subject,
                      paymentlink: ''
                    }
                  });
                  context.executeAction(sendOrderEmail,
                    {orderId: order.id,
                      data: {
                        template: 'order.created',
                        email: 'estebannmuruzabal@gmail.com',
                        subject: subject + 'Cash',
                        paymentlink: ''
                      }
                    });
              }
            } else {
              context.executeAction(sendOrderEmail,
                {orderId: order.id,
                  data: {
                    template: 'order.created',
                    email: 'estebannmuruzabal@gmail.com',
                    subject: 'CC',
                    paymentlink: ''
                  }
                });
            }

            // Send hit to Facebook Pixel
            try {
                fbq('track', 'Purchase', {
                    value: checkout.total,
                    currency: checkout.currency
                });
            } catch (err) {
                debug('Unable to send hit to Facebook Pixel', err);
            }

            // Dispatch action and execute callback
            context.dispatch(orderActions.ORDER_CREATE_SUCCESS, order);
            done && done();
        }

        dispatchOrderCreatedSuccessfullyAndUpdateStocks();


    }, function orderCreateError(orderErr) {
        context.dispatch(orderActions.ORDER_CREATE_ERROR, orderErr.result);
        done && done();
    });
}
