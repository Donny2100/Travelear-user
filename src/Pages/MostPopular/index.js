import loadable from 'react-loadable';

export const MostPopularPage = loadable ({
  loader: () => import('./MostPopular'),
  loading: () => null
});