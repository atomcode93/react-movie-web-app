import { request } from 'lib/helpers';
import { API_KEY,DEFAULT_PAGE, PATH_BASE, PATH_DISCOVER, PATH_POPULAR, PATH_TOP_RATED, PATH_MOVIE, PATH_PAGE, PATH_UPCOMING, PATH_SEARCH } from 'lib/constants/searchConfig';

export default {
  getMovies: (page: number = DEFAULT_PAGE, filters: IFiltersState) => {
    if (filters) {
      return request('get', `${PATH_BASE}${PATH_DISCOVER}${PATH_MOVIE}?language=en-US&api_key=${API_KEY}&${PATH_PAGE}${page}&primary_release_year=${filters.year}
      &vote_average.gte=${filters.rating.min}
      &vote_average.lte=${filters.rating.max}
      &with_runtime.gte=${filters.runtime.min}
      &with_runtime.lte=${filters.runtime.max}
      &sort_by=${filters.sort_by.value}.${filters.order.value}`);
    }
  },
  getPopularMovies: (page: number = DEFAULT_PAGE) => request('get', `${PATH_BASE}${PATH_MOVIE}${PATH_POPULAR}?language=en-US&api_key=${API_KEY}&${PATH_PAGE}${page}`),
  getTopRatedMovies: (page: number = DEFAULT_PAGE) => request('get', `${PATH_BASE}${PATH_MOVIE}${PATH_TOP_RATED}?language=en-US&api_key=${API_KEY}&${PATH_PAGE}${page}`),
  getSoonMovies: (page: number = DEFAULT_PAGE) => request('get', `${PATH_BASE}${PATH_MOVIE}${PATH_UPCOMING}?language=en-US&api_key=${API_KEY}&${PATH_PAGE}${page}`),
  getMovie: (id: number) => request('get', `${PATH_BASE}${PATH_MOVIE}/${id}?api_key=${API_KEY}&append_to_response=videos`),
  getSearchMovie: (name: string, page: number = DEFAULT_PAGE) => {
    const TERM = name.replace(/\s/g, '+');
    return request('get',`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}?api_key=${API_KEY}&query=${TERM}&${PATH_PAGE}${page}`);
  },
};