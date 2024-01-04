import {datatype, random, image, internet, lorem, name, music} from 'faker';
import {FilmsProps, MoviesProps} from "../src/types/films";
import {Genre} from "../src/types/genre";
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {createAPI} from "../src/services/api.ts";
import {State} from '../src/types/state.ts';
import {AuthorizationStatus} from "../src/components/private-route/private-route.tsx";
import {InitialNumberFilms} from "../src/store/film-process/film-process.ts";


export const makeFakeFilm = (): FilmsProps => ({
  posterImage: image.image(),
  previewImage: image.image(),
  backgroundImage: image.image(),
  name: random.words(2),
  genre: music.genre() as Genre,
  released: datatype.number({min: 1980, max: 2023}),
  id: datatype.uuid(),
  description: lorem.sentences(3),
  rating: datatype.number({min: 0, max: 10, precision: 0.1}),
  scoresCount: datatype.number({min: 0, max: 1000}),
  director: name.findName(),
  starring: new Array(3).fill(null).map(() => (name.findName())),
  videoLink: internet.url(),
  backgroundColor: internet.color(),
  runTime: datatype.number({min: 30, max: 120}),
  isFavorite: datatype.boolean(),
  previewVideoLink: internet.url(),
})

export const makeFakeFilms = (): MoviesProps[] => new Array(8).fill(null).map(
  () =>
    ({
      id: datatype.uuid(),
      name: name.firstName(),
      previewImage: image.imageUrl(),
      previewVideoLink: image.imageUrl(),
      genre: music.genre(),
    } as MoviesProps)
);
export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);
export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  FILM: {
    genre: 'All genres' as Genre,
    listFilms: makeFakeFilms(),
    promoFilm: null,
    countFilms: InitialNumberFilms,
    isFilmsDataLoading: false,
    isSimilarFilmsLoading: false,
    isChoosedFilmLoading: false,
    isPromoFilmLoading: false,
    isFilmCommentsLoading: false,
    isFavoriteFilm: false,
    film: makeFakeFilm(),
    relatedMovies: [],
    comments: [],
    favoriteFilms: [],
  },
  GENRE: {genre: "All genres"},
  ...initialState ?? {},
});
