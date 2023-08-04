import React from 'react'
import { formatNumber } from '../global/util';
import { getYear } from '../global/util';
import { Link } from 'react-router-dom';
import "./EachMovie.scss";

const EachMovie = (props) => {
  const film = props.film;
  return (
    <>
      <div className='each-film'>
        <Link to={`/detail/${film.id}`} state={{ movieData: film }}>
          <img src={film.poster_path} alt="movie image" />
        </Link>
        <div className='each-film-title-wrapper'>
          <div className='film-title'>{film.title}</div>
          <div className={film.profit < 0 ? "red" : "green"}>{formatNumber(film.profit) + "$"}</div>
        </div>
        <div className='film-release-date'>{getYear(film.release_date)}</div>

      </div>
    </>
  )
}

export default EachMovie;