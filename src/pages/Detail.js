import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { formatNumber } from '../global/util';
import "./Detail.scss";
import { getFetchData } from '../global/util';

const Detail = () => {
  const { state } = useLocation();
  const [publicRate, setPublicRate] = useState(0);
  const [myRate, setMyRate] = useState(0);
  const movieAmountData = [
    { label: "Budget", value: formatNumber(state.movieData.budget) + "$", className: "" },
    { label: "Revenue", value: formatNumber(state.movieData.revenue) + "$", className: "" },
    { label: "Recettes", value: formatNumber(state.movieData.profit) + "$", className: state.movieData.profit < 0 ? "red" : "green" },
  ]
  useEffect(() => {
    setPublicRate(Math.floor(state.movieData.vote_average));
    getMyRate();
  }, [])

  const getMyRate = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmVhZThmYWRjYjU0ZWVkODBjMWZhMjgyM2E0OTUwMSIsInN1YiI6IjY0Y2EyMmMzZGQ4M2ZhMDBjNTE3ZmU1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fJckGtzIJ1mZjYfVtbd0YJI5LSd5b8xBXnXzZYnec7c'
        }
      };
      const url = 'https://api.themoviedb.org/3/account/' + process.env.REACT_APP_ACCOUNT_ID + '/rated/movies?language=en-US&page=1&sort_by=created_at.asc'
      const data = await getFetchData(url, options);
      const targetMovieData = data.results.find((elem) => elem.id === state.movieData.id && elem.rating)
      if (targetMovieData) {
        setMyRate(Math.floor(targetMovieData.rating));
      }
    } catch (e) {
      alert(e);
    }
  }
  return (
    <>
      <main className='detail-content'>
        <div className='detail-content-left'>
          <img src={state.movieData.poster_path} alt="movie image" />
        </div>
        <div className='detail-content-right'>
          <h1>{state.movieData.title}</h1>
          <div className='amount-info'>
            {movieAmountData.map(movie => (
              <div className='amount-each' key={movie.label}>
                <h5>{movie.label}</h5>
                <h3 className={movie.className}>{movie.value}</h3>
              </div>
            ))}
          </div>
          <div className='overview-wrapper'>
            <h4>Synopsis</h4>
            <div className='overview'>{state.movieData.overview}</div>
          </div>
          <div className='rate-wrapper'>
            <div className='public-rate'>
              <h5>Communauté</h5>
              <div><span className={`rate-${publicRate}`}></span></div>
            </div>
            <div className='my-rate'>
              <h5>Ma note</h5>
              <div><span className={myRate ? `rate-${myRate}` : ""}></span></div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Detail