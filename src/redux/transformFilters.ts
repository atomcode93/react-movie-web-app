import { createWhitelistFilter } from 'redux-persist-transform-filter';

export default [createWhitelistFilter('movies', ['movies'])];

export const blacklist = ['auth', 'modals'];

export const whitelist = ['navigation'];
