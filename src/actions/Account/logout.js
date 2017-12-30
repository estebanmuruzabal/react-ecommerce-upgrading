import accountActions from '../../constants/account';

export default function logout(context, payload, done) {
    context.dispatch(accountActions.ACCOUNT_LOGOUT_SUCCESS);
}
