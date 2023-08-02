import React from 'react'
import Header from '../components/layout/Header'
import leftArrow from "../assets/left-arrow.png"
import rightArrow from "../assets/right-arrow.png"
import "./Home.scss";

const Home = () => {
  return (
    <div>
      <Header />
      <main className='home-content'>
        <section>
          <div className='film-ranking-title'>Les 10 films les plus populaires du moment</div>
          <div className='film-ranking-content'>
            <img src={leftArrow} alt="left arrow" />
            <div>ranking</div>
            <img src={rightArrow} alt="right arrow" />
          </div>
          <div className='film-ranking-link'>Voir tous les films</div>
        </section>
      </main>
    </div>
  )
}

export default Home