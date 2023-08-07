import React, { useEffect, useState } from 'react';
import "./css/Search.scss";
import { useSelector } from 'react-redux';
import EachMovie from '../components/common/EachMovie';

const Search = () => {
  const movieList = useSelector(state => state.popularMovieList);
  const [movieListDescByReleaseDate, setMovieListDescByReleaseDate] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const sortData = movieList.slice().sort((a, b) => {
      return (new Date(a.release_date) < new Date(b.release_date) ? 1 : -1);
    })
    setMovieListDescByReleaseDate(sortData);
    setFilteredMovieList(sortData);
    setIsLoading(false);
  }, [movieList])

  useEffect(() => {
    if (movieListDescByReleaseDate.length) {
      const filteredMovieArray = movieListDescByReleaseDate.filter((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
      setFilteredMovieList(filteredMovieArray);
    }
  }, [searchText])


  return (
    <main className={`search-content ${!isLoading ? "visible" : ""}`}>
      <section className='search-header'>
        <div className='search-page-title'>Tous les films</div>
        <div className='search-page-input-wrapper'>
          <input type="text" className='search-page-input'
            placeholder='Rechercher...' onInput={(e) => setSearchText(e.target.value)} />
        </div>
      </section>
      <section className="movie-list">
        {filteredMovieList.map((movie) => (
          < EachMovie movie={movie} key={movie.id} />
        ))
        }
      </section>
    </main>
  )
}

export default Search