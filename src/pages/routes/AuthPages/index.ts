import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';

export const Login = loadable(() => pMinDelay(import('./Login'), 300));
