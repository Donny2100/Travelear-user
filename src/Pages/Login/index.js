import loadable from 'react-loadable';

export const LoginPage = loadable ({
  loader: () => import ('./Login'),
  loading: () => null
});