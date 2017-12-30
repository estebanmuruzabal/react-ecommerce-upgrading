/**
 * Automatically hook babel into all node requires.
 */
require('babel/register')({
    optional: ['es7.asyncFunctions', 'es7.classProperties', 'es7.decorators']
});

/**
 * Get environment variables
 */
require('dotenv').config();

/**
 * Start application server.
 */
require('./src/server');

/**
 * In development, also start Webpack dev server.
 */
if (process.env.NODE_ENV === 'development') {
    require('./webpack/server');
}
