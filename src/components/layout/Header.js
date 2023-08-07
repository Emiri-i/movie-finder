import React from 'react';
import "./Header.scss";
import headerLogo from "../../assets/movie-finder.png"
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <header className="App-header">
        <div className='header-wrapper'>
          <img src={headerLogo} alt="movie finder logo" />
          <div className='header-right'>
            <div className='header-link'>
              <NavLink to="/" className={({ isActive }) =>
                isActive ? "active" : undefined}
                end >
                ACCUEIL
              </NavLink>
            </div>
            <div className='header-division'>|</div>
            <div className='header-link'>
              <NavLink to="/search" className={({ isActive }) =>
                isActive ? "active" : undefined}>
                RECHERCHE
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header