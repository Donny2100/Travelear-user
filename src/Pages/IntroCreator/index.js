import loadable from 'react-loadable';

export const BecomeCreatorPage = loadable ({
  loader: () => import('./IntroCreator'),
  loading: () => null
});