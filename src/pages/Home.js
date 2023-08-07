import React, { useEffect, useState } from 'react'
import leftArrow from "../assets/left-arrow.png"
import rightArrow from "../assets/right-arrow.png"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPopularMovieActions } from '../store/index';
import "./css/Home.scss";
import EachMovie from '../components/common/EachMovie';
import Chart from '../components/Home/Chart';
import { getFetchData } from '../global/util';

const Home = () => {
  const dispatch = useDispatch();
  const popularMovieList = useSelector(state => state.popularMovieList)

  const [shownPopularMovieList, setShownPopularMovieList] = useState([]);
  const [movieNumberList, setMovieNumberList] = useState([0, 4]);
  const [isMovieListLoading, setIsMovieListLoading] = useState(false);

  const getPopularMovieData = async () => {
    setIsMovieListLoading(true);
    const url = "https://api.themoviedb.org/3/movie/popular?api_key=" + process.env.REACT_APP_MOVIE_FINDER_API_KEY + "&language=en-US&page=1"
    const data = await getFetchData(url);
    const updatedData = [];

    for (const d of data.results) {
      const detailDataUrl = "https://api.themoviedb.org/3/movie/" + d.id
        + "?api_key=" + process.env.REACT_APP_MOVIE_FINDER_API_KEY;
      const movieDetailData = await getFetchData(detailDataUrl);
      updatedData.push({
        ...d, poster_path: "https://image.tmdb.org/t/p/original/" + d.poster_path,
        vote_average: movieDetailData.vote_average, revenue: movieDetailData.revenue,
        budget: movieDetailData.budget, profit: movieDetailData.revenue - movieDetailData.budget
      })
    }

    dispatch(setPopularMovieActions.setPopularMovieList(updatedData));
    setShownPopularMovieList(updatedData.slice(0, 4));
    setIsMovieListLoading(false);
  }

  const changeShownMovie = (num) => {
    addClickEvent();
    setMovieNumberList([movieNumberList[0] + num, movieNumberList[1] + num])
  }

  useEffect(() => {
    getPopularMovieData();
    addClickEvent();
  }, []);

  const addClickEvent = () => {
    const movieCarrousselElem = document.querySelector('.movie-ranking-details');
    const buttonLeft = document.querySelector(".carroussel-button-left");
    const buttonRight = document.querySelector(".carroussel-button-right");
    const buttonElemArray = [
      { elem: buttonLeft, className: "-left" },
      { elem: buttonRight, className: "-right" }
    ]
    buttonElemArray.forEach((button) => {
      button.elem.addEventListener("click", () => {
        movieCarrousselElem.classList.add("active" + button.className);
      })
      setTimeout(() => {
        movieCarrousselElem.classList.remove("active" + button.className);
      }, 500)
    })
  }

  useEffect(() => {
    setShownPopularMovieList(popularMovieList.slice(movieNumberList[0], movieNumberList[1]))
  }, [movieNumberList]);

  return (
    <>
      <main className='home-content'>
        <section>
          {
            isMovieListLoading &&
            <div className='spinner-wrapper'>
              <div className='spinner1'></div>
              <div className='spinner2'></div>
              <div className='spinner3'></div>
            </div>
          }
          <div className={isMovieListLoading ? "unvisible" : "visible"}>
            <h1 className='movie-ranking-title'>Les 10 films les plus populaires du moment</h1>
            <div className="movie-ranking-content">
              <button onClick={() => changeShownMovie(-1)} className={`carroussel-button-left ${movieNumberList[0] === 0 ? "button-unvisible" : ""}`}>
                <img src={leftArrow} alt="left arrow" />
              </button>
              <div className='movie-ranking-details'>
                {shownPopularMovieList.map((movie) => (
                  < EachMovie movie={movie} key={movie.id} />
                ))}
              </div>
              <button onClick={() => changeShownMovie(1)} className={`carroussel-button-right ${movieNumberList[1] === 9 ? "button-unvisible" : ""}`}>
                <img src={rightArrow} alt="right arrow" />
              </button>
            </div>
            <Link to="/search" className='movie-ranking-link'>Voir tous les films</Link>
          </div>
        </section>
        <Chart />
      </main>
    </>
  )
}

export default Home