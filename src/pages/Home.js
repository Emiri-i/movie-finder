import React, { useEffect, useState } from 'react'
import leftArrow from "../assets/left-arrow.png"
import rightArrow from "../assets/right-arrow.png"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPopularFilmActions } from '../store/index';
import "./Home.scss";
import EachMovie from '../components/EachMovie';

const Home = () => {
  const dispatch = useDispatch();
  const popularFilmList = useSelector(state => state.popularFilmList)

  const [shownPopularFilmList, setShownPopularFilmList] = useState([]);
  const [filmNumberList, setFilmNumberList] = useState([0, 4]);

  const getPopularFilmData = async () => {
    try {
      const url = "https://api.themoviedb.org/3/movie/popular?api_key=" + process.env.REACT_APP_MOVIE_FINDER_API_KEY + "&language=en-US&page=1"
      const res = await fetch(url);
      const data = await res.json();
      console.log(data)
      const updatedData = [];
      for (const d of data.results) {
        const filmDetailData = await fetch("https://api.themoviedb.org/3/movie/" + d.id + "?api_key=" + process.env.REACT_APP_MOVIE_FINDER_API_KEY).then(res => { return res.json() })
        // console.log(filmDetailData)
        updatedData.push({
          ...d, poster_path: "https://image.tmdb.org/t/p/original/" + d.poster_path,
          vote_average: filmDetailData.vote_average, revenue: filmDetailData.revenue,
          budget: filmDetailData.budget, profit: filmDetailData.revenue - filmDetailData.budget
        })
      }
      console.log(updatedData)
      // console.log("shownPopularFilmList", shownPopularFilmList)
      dispatch(setPopularFilmActions.setPopularFilmList(updatedData));
      setShownPopularFilmList(updatedData.slice(0, 4));
    } catch (e) {
      alert(e);
    }
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
          <div>{filmNumberList}</div>
          <Link to="/search" className='film-ranking-link'>Voir tous les films</Link>
        </section>
      </main>
    </>
  )
}

export default Home