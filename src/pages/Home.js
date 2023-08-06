import React, { useEffect, useState } from 'react'
import leftArrow from "../assets/left-arrow.png"
import rightArrow from "../assets/right-arrow.png"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPopularFilmActions } from '../store/index';
import "./Home.scss";
import EachMovie from '../components/EachMovie';
import Chart from '../components/Home/Chart';
import { getFetchData } from '../global/util';

const Home = () => {
  const dispatch = useDispatch();
  const popularFilmList = useSelector(state => state.popularFilmList)

  const [shownPopularFilmList, setShownPopularFilmList] = useState([]);
  const [filmNumberList, setFilmNumberList] = useState([0, 4]);


  const getPopularFilmData = async () => {
    const url = "https://api.themoviedb.org/3/movie/popular?api_key=" + process.env.REACT_APP_MOVIE_FINDER_API_KEY + "&language=en-US&page=1"
    const data = await getFetchData(url);
    // console.log(data)
    const updatedData = [];

    for (const d of data.results) {
      const detailDataUrl = "https://api.themoviedb.org/3/movie/" + d.id + "?api_key=" + process.env.REACT_APP_MOVIE_FINDER_API_KEY;
      const movieDetailData = await getFetchData(detailDataUrl);
      // console.log(filmDetailData)
      updatedData.push({
        ...d, poster_path: "https://image.tmdb.org/t/p/original/" + d.poster_path,
        vote_average: movieDetailData.vote_average, revenue: movieDetailData.revenue,
        budget: movieDetailData.budget, profit: movieDetailData.revenue - movieDetailData.budget
      })
    }

    // console.log(updatedData)
    dispatch(setPopularFilmActions.setPopularFilmList(updatedData));
    setShownPopularFilmList(updatedData.slice(0, 4));

  }

  const changeShownFilm = (num) => {
    setFilmNumberList([filmNumberList[0] + num, filmNumberList[1] + num])
  }

  useEffect(() => { getPopularFilmData() }, []);

  useEffect(() => {
    setShownPopularFilmList(popularFilmList.slice(filmNumberList[0], filmNumberList[1]))
  }, [filmNumberList])

  return (
    <>
      <main className='home-content'>
        <section>
          <div className='film-ranking-title'>Les 10 films les plus populaires du moment</div>
          <div className='film-ranking-content'>
            <button onClick={() => changeShownFilm(-1)} className={filmNumberList[0] === 0 ? "unvisible" : ""}>
              <img src={leftArrow} alt="left arrow" />
            </button>
            <div className='film-ranking-details'>
              {shownPopularFilmList.map((film) => (
                < EachMovie film={film} key={film.id} />
              ))}
            </div>
            <button onClick={() => changeShownFilm(1)} className={filmNumberList[1] === 9 ? "unvisible" : ""}>
              <img src={rightArrow} alt="right arrow" />
            </button>
          </div>
          <Link to="/search" className='film-ranking-link'>Voir tous les films</Link>
        </section>
        <Chart />
      </main>
    </>
  )
}

export default Home