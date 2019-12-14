import loadable from 'react-loadable';

export const QueuePage = loadable ({
  loader: () => import ('./Queue'),
  loading: () => null
});