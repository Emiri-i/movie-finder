import React, { useEffect, useState } from 'react';
import "./Search.scss";
import { useSelector } from 'react-redux';
import EachMovie from '../components/EachMovie';

const Search = () => {
  const filmList = useSelector(state => state.popularFilmList);
  const [filmListDescByReleaseDate, setFilmListDescByReleaseDate] = useState([]);
  const [filteredFilmList, setFilteredFilmList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const sortData = filmList.slice().sort((a, b) => {
      return (new Date(a.release_date) < new Date(b.release_date) ? 1 : -1);
    })
    setFilmListDescByReleaseDate(sortData);
    setFilteredFilmList(sortData);
  }, [filmList])

  useEffect(() => {
    if (filmListDescByReleaseDate.length) {
      const filteredFilmArray = filmListDescByReleaseDate.filter((film) => film.title.toLowerCase().includes(searchText.toLowerCase()))
      setFilteredFilmList(filteredFilmArray);
    }
  }, [searchText])


  return (
    <>
      <main className='search-content'>
        <section className='search-header'>
          <div className='search-page-title'>Tous les films</div>
          <div className='search-page-input-wrapper'>
            <input type="text" className='search-page-input'
              placeholder='Rechercher...' onInput={(e) => setSearchText(e.target.value)} />
          </div>
        </section>
        <section className="film-list">
          {filteredFilmList.map((film) => (
            < EachMovie film={film} key={film.id} />
          ))
          }
        </section>
      </main>
    </>
  )
}

export default Search