/**
 * Imports
 */
 
// Actions
import accountActions from '../../constants/account';

/**
 * Action Creator
 */
export default function processAuthToken(context, payload, done) {

    // 1) Save authToken
    context.dispatch(accountActions.ACCOUNT_LOGIN_SUCCESS, payload);

    // 2) Fetch Account Details
    context.dispatch(accountActions.ACCOUNT_FETCH);
    context.api.account.get().then(function fetchAccountSuccessFn(accountResult) {
        context.dispatch(accountActions.ACCOUNT_FETCH_SUCCESS, accountResult);

        // Error fetching Account Details
    }, function fetchAccountErrorFn(accountErr) {
        context.dispatch(accountActions.ACCOUNT_FETCH_ERROR, accountErr.result);
        done && done();
    });
};
