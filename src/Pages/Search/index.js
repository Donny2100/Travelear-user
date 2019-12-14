import loadable from 'react-loadable';

export const SearchPage = loadable ({
  loader: () => import ('./Search'),
  loading: () => null
});