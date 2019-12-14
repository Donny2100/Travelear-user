import loadable from 'react-loadable';

export const LogoutButton = loadable ({
  loader: () => import('./Logout'),
  loading: () => null
});