import loadable from 'react-loadable';

export const CityPage = loadable ({
  loader: () => import('./City'),
  loading: () => null
});