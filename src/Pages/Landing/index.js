import loadable from 'react-loadable';

export const LandingPage = loadable ({
  loader: () => import('./Landing'),
  loading: () => null
});