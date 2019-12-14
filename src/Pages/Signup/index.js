import loadable from 'react-loadable';

export const SignupPage = loadable ({
    loader: () => import ('./signup'),
    loading: () => null
});