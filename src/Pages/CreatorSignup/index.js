import loadable from 'react-loadable';

export const NewCreatorPage = loadable ({
  loader: () => import ('./CreatorSignup'),
  loading: () => null
});