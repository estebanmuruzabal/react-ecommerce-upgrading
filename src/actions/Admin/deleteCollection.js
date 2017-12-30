import applicationActions from '../../constants/application';
import collectionActions from '../../constants/collections';

export default function deleteCollection(context, payload, done) {
    context.dispatch(collectionActions.COLLECTIONS_ITEM_DELETE);
    context.api.collections.delete(payload).then(function successFn(result) {
        context.dispatch(collectionActions.COLLECTIONS_ITEM_DELETE_SUCCESS, result);
        context.dispatch(collectionActions.APPLICATION_POST_NOTIFICATION, {
            type: 'success',
            message: 'Deleted'
        });
        done && done();
    }, function errorFn(err) {
        context.dispatch(collectionActions.COLLECTIONS_ITEM_DELETE_ERROR, err.result);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'error',
            message: 'Unable to delete'
        });
        done && done();
    });
}
