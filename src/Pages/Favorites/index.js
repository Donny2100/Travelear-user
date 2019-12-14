import loadable from 'react-loadable';

export const FavoritesPage = loadable ({
  loader: () => import ('./Favorites'),
  loading: () => null
});