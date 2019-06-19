
declare module 'react-toastify' {
  const content: any 
  export const ToastContainer: any
  export const toast: any
  export default content
}
declare interface IMovie {
  backdrop_path: string;
  budget?: number;
  genre_ids: number[];
  id: number;
  favorited?: boolean;
  watchLater?: boolean;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: number;
  revenue?: number;
  runtime?: number;
  title: string;
  video: boolean;
  videos: any;
  vote_average: number;
  vote_count: number;
}
declare interface IMovies {
    page: number,
    total_results: number,
    total_pages: number
    results: IMovie[],
}

declare interface ISortOrder {
  value: string;
  label: string;
}

declare interface IRatingRuntime {
  min: number;
  max:number;
}

/**
 * RootStore
 */

declare interface IRouterState {
  location: any;
  action: string;
}

declare interface IAuthState {
  isAuthenticated: boolean;
  user: Object | null;
  error: boolean;
}

declare interface IModalsState {
    type: any;
    open: boolean;
    args: any;
}

declare interface IFavoritesState {
  favoritedMovies: any | IMovie[];
  favoritedIds: any | string[];
  error: boolean;
}

declare interface IWatchLaterState {
  watchLaterMovies: any | IMovie[];
  watchLaterIds: any | number[];
  error: boolean;
}

declare interface IMoviesState {
  movies: any | IMovies;
  movie: any | IMovie;
  popularMovies: any | IMovies;
  soonMovies: any | IMovies;
  topRatedMovies: any | IMovies;
  favorites: any[],
  watchLater: any[] | null,
  loading: boolean,
  error: boolean,
}

declare interface IFiltersState {
  rating: IRatingRuntime;
  runtime: IRatingRuntime;
  sort_by: ISortOrder;
  order: ISortOrder;
  year: number;
}


declare interface IRootState {
  router: IRouterState;
  auth: IAuthState;
  favorites: IFavoritesState;
  filters: IFiltersState;
  modals: IModalsState;
  movies: IMoviesState;
  watchLater: IWatchLaterState;
}