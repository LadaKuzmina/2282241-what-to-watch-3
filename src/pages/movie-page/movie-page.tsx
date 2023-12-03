import Copyright from '../../components/copyright/copyright.tsx';
import Logo from '../../components/logo/logo.tsx';
import UserBlock from '../../components/user-block/user-block.tsx';
import FilmRating from '../../components/film-rating/film-rating.tsx';
import FilmCardText from '../../components/film-card/film-card-text.tsx';
import FilmCardWrap from '../../components/film-card/film-card-wrap.tsx';
import Tab from '../../components/tabs/tab.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks-index.ts';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchCommentsMovie, fetchFilmAction, fetchRelatedMovies} from '../../store/api-actions.ts';
import {MoreLikeThis} from '../../components/show-more/more-like-this.tsx';
import {AuthorizationStatus} from '../../components/private-route/private-route.tsx';
import {UnauthorizedUser} from '../../components/unauthorized-user/unauthorized-user.tsx';
import NotFoundPage from '../not-found-page/not-found-page.tsx';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';
import {getFilm} from '../../store/film-process/film-selectors.ts';

function MoviePage() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const film = useAppSelector(getFilm);
  const {id} = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
      dispatch(fetchRelatedMovies(id));
      dispatch(fetchCommentsMovie(id));
    }
  }, [id]);

  if (!film || !id) {
    return <NotFoundPage/>;
  }
  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo className={'logo__link'}/>
            {authorizationStatus === AuthorizationStatus.Auth ? <UserBlock imgPath={'img/avatar.jpg'}/> :
              <UnauthorizedUser/>}
          </header>
          <FilmCardWrap nameMovie={film.name} genre={film.genre} date={film.released}/>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <Tab className={'film-nav__item film-nav__item--active'} name={'Overview'}
                    link={`/films/${film.id}`}
                  />
                  <Tab className={'film-nav__item'} name={'Details'}
                    link={`/films/${film.id}/details`}
                  />
                  <Tab className={'film-nav__item'} name={'Reviews'}
                    link={`/films/${film.id}/review`}
                  />
                </ul>
              </nav>
              <FilmRating rating={film.rating} level={film.rating} count={film.scoresCount}/>
              <FilmCardText description={film.description} starring={film.starring}
                director={film.director}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <MoreLikeThis/>
        <footer className="page-footer">
          <Logo className={'logo__link logo__link--light'}/>
          <Copyright/>
        </footer>
      </div>
    </>
  );
}

export default MoviePage;
