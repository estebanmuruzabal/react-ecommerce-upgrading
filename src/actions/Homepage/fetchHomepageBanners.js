import homepageActions from '../../constants/homepage';

export default function fetchAccountDetails(context, payload, done) {
    context.dispatch(homepageActions.HOMEPAGE_FETCH);
    context.api.homepage.get().then(function successFn(result) {
        context.dispatch(accountActions.HOMEPAGE_FETCH_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(accountActions.HOMEPAGE_FETCH_ERROR, err.result);
        done && done();
    });
}
