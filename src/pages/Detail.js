import React from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { formatNumber } from '../global/util';
import "./Detail.scss";

const Detail = () => {
  const params = useParams();
  const movieId = params.movieId;
  const { state } = useLocation();
  // console.log(state.filmData)
  const movieAmountData = [
    { label: "Budget", value: formatNumber(state.filmData.budget) + "$", className: "" },
    { label: "Revenue", value: formatNumber(state.filmData.revenue) + "$", className: "" },
    { label: "Recettes", value: formatNumber(state.filmData.profit) + "$", className: state.filmData.profit < 0 ? "red" : "green" },
  ]
  return (
    <>
      <main className='detail-content'>
        <div className='detail-content-left'>
          <img src={state.filmData.poster_path} alt="movie image" />
        </div>
        <div className='detail-content-right'>
          <h1>{state.filmData.title}</h1>
          <div className='amount-info'>
            {movieAmountData.map(movie => (
              <div className='amount-each'>
                <h6>{movie.label}</h6>
                <h3 className={movie.className}>{movie.value}</h3>
              </div>
            ))}
            {/* <h6>Budget</h6>
              <h3>{formatNumber(state.filmData.revenue) + "$"}</h3> */}
            {/* <h3>{formatNumber(state.filmData.budget) + "$"}</h3>
            <h3 className={state.filmData.profit < 0 ? "red" : "green"}>{formatNumber(state.filmData.profit) + "$"}</h3> */}
          </div>
        </div>
      </main>
      {/* detail {movieId}
      <div>{state.filmData.title}</div> */}
    </>
  )
}

export default Detail