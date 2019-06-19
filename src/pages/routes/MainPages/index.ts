import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';

export const ComingSoon = loadable(() =>
  pMinDelay(import('./ComingSoon'), 300),
);
export const Discover = loadable(() => pMinDelay(import('./Discover'), 300));
export const Favorites = loadable(() => pMinDelay(import('./Favorites'), 300));
export const Movie = loadable(() => pMinDelay(import('./Movie'), 300));
export const Popular = loadable(() => pMinDelay(import('./Popular'), 300));
export const TopRated = loadable(() => pMinDelay(import('./TopRated'), 300));
export const SearchResults = loadable(() =>
  pMinDelay(import('./SearchResults'), 300),
);
export const WatchLater = loadable(() =>
  pMinDelay(import('./WatchLater'), 300),
);
