import Cookies from 'js-cookie';
import actions from './actions';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = loginForm => {
  return async dispatch => {
    try {
      dispatch(loginBegin());

      const token=Cookies.get('token');

      Cookies.set('token', token);
      dispatch(loginSuccess(token));
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = () => {
  return async dispatch => {
    try {
      dispatch(logoutBegin());
      Cookies.remove('token');
      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut };