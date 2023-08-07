import React from 'react'
import { formatNumber } from '../../global/util';
import { getYear } from '../../global/util';
import { Link } from 'react-router-dom';
import "./EachMovie.scss";

const EachMovie = (props) => {
  const movie = props.movie;
  return (
    <div className='each-movie'>
      <Link to={`/detail/${movie.id}`} state={{ movieData: movie }}>
        <img src={movie.poster_path} alt="movie image" />
      </Link>
      <div className='each-movie-title-wrapper'>
        <div className='movie-title'>{movie.title}</div>
        <div className={movie.profit < 0 ? "red" : "green"}>{formatNumber(movie.profit) + "$"}</div>
      </div>
      <div className='movie-release-date'>{getYear(movie.release_date)}</div>
    </div>
  )
}

export default EachMovie;