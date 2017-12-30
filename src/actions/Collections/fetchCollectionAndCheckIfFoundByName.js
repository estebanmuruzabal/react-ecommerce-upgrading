import applicationActions from '../../constants/application';
import collectionActions from '../../constants/collections';

export default function fetchCollectionAndCheckIfFoundByName(context, payload, done) {
    context.dispatch(collectionActions.COLLECTIONS_ITEM);
    context.api.collections.find({collectionName: payload.collectionName}).then(function successFn(result) {
        context.dispatch(collectionActions.COLLECTIONS_ITEM_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(collectionActions.COLLECTIONS_ITEM_ERROR, err.result);
        context.dispatch(applicationActions.APPLICATION_ROUTE_ERROR, err.status);
        done && done();
    });
}
