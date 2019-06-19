export const initialState = {
  auth: {
    error: false,
    isAuthenticated: false,
    user: null,
  },
  favorites: {
    error: false,
    favoritedIds: [],
    favoritedMovies: null,
  },
  filters: {
    order: {
      label: 'Descending',
      value: 'desc',
    },
    rating: {
      max: 10,
      min: 5,
    },
    runtime: {
      max: 250,
      min: 45,
    },
    sort_by: {
      label: 'Rating',
      value: 'vote_average',
    },
    year: 2019,
  },
  modals: {
    args: null,
    open: false,
    type: null,
  },
  movies: {
    error: false,
    favorites: [],
    loading: false,
    movie: null,
    movies: null,
    popularMovies: null,
    soonMovies: null,
    topRatedMovies: null,
    watchLater: null,
  },
  router: {
    action: 'POP',
    location: {
      hash: '',
      pathname: '/',
      search: '',
      state: undefined,
    },
  },
  watchLater: {
    error: false,
    watchLaterIds: [],
    watchLaterMovies: null,
  },
};
