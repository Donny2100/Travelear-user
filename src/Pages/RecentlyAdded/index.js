import loadable from 'react-loadable';

export const RecentlyAddedPage = loadable ({
  loader: () => import ('./RecentlyAdded'),
  loading: () => null
});