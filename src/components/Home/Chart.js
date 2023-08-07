import React, { useEffect, useState } from 'react'
import { getFetchData } from '../../global/util';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import "./Chart.scss";

const Chart = () => {
  const defaultGenre = { id: 999999999999, name: "All genre" }
  const mutualUrl1 = "include_adult=false&include_video=false&language=en-US&page=";
  const mutualUrl2 = "&region=fr&sort_by=popularity.desc&vote_count.gte=2000"
  const chartDefaultYearRange = [new Date().getFullYear() - 4, new Date().getFullYear() - 1];

  const [genreList, setGenreList] = useState([]);
  const [chartMovieList, setChartMovieList] = useState([]);
  const [chartSelectedYearRange, setChartSelectedYearRange] = useState([new Date().getFullYear() - 4, new Date().getFullYear() - 1]);
  const [chartSelectedYearEndOptions, setChartSelectedYearEndOptions] = useState([]);
  const [isChartDataLoading, setIsChartDataLoading] = useState(false);
  const [currentSelectedGenre, setCurrentSelectedGenre] = useState(defaultGenre);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmVhZThmYWRjYjU0ZWVkODBjMWZhMjgyM2E0OTUwMSIsInN1YiI6IjY0Y2EyMmMzZGQ4M2ZhMDBjNTE3ZmU1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fJckGtzIJ1mZjYfVtbd0YJI5LSd5b8xBXnXzZYnec7c'
    }
  };

  useEffect(() => {
    getGenres();
    renderYearEndSelect();
  }, [])

  useEffect(() => {
    getChartMovieList();
  }, [chartSelectedYearRange, currentSelectedGenre])


  const getGenres = async () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + process.env.REACT_APP_MOVIE_FINDER_API_KEY + 'language=en'
    const data = await getFetchData(url, options);
    setGenreList([defaultGenre, ...data.genres]);
  }

  const getChartMovieList = async () => {
    setIsChartDataLoading(true);

    let maxCount = 1;
    let targetYear = chartSelectedYearRange[0];
    let movieList = [];
    const genreSortUrl = currentSelectedGenre.name === defaultGenre.name ? "" : "&with_genres=" + currentSelectedGenre.id

    for (let i = 0; targetYear <= chartSelectedYearRange[1]; i++) {
      let targetArr = [];
      for (let i = 0; i < maxCount; i++) {
        const url = 'https://api.themoviedb.org/3/discover/movie?api_key='
          + process.env.REACT_APP_MOVIE_FINDER_API_KEY
          + mutualUrl1
          + (i + 1) + "&primary_release_year=" + targetYear + "&primary_release_date.gte=" + targetYear + "-01-01&primary_release_date.lte=" + targetYear + "-12-31"
          + mutualUrl2
          + genreSortUrl
        const data = await getFetchData(url, options);
        targetArr.push(...data.results);
        if (i === 0) {
          data.total_pages <= 1000 ? maxCount = data.total_pages : maxCount = 100;
        }
      }
      movieList.push(targetArr);
      targetYear++;
    }

    createChart(movieList);
  }

  const createChart = (movieList) => {
    let chartData = [];
    let targetYear = chartSelectedYearRange[0];

    movieList.forEach((movie) => {
      if (movie.length) {
        const voteAverageList = movie.map((m) => m.vote_average);
        const voteSum = voteAverageList.reduce((a, b) => {
          return a + b
        })
        const targetData = {
          year: targetYear,
          movieNumber: movie.length,
          rating: Math.floor(voteSum / movie.length * 10) / 10,
        }
        chartData.push(targetData);
      } else {
        chartData.push({
          year: targetYear,
          movieNumber: 0,
          rating: 0,
        });
      }
      targetYear++;
    })

    setChartMovieList(chartData);
    setIsChartDataLoading(false);
  }

  const changeGenre = (e) => {
    const target = genreList.find((genre) => e.currentTarget.value === genre.name);
    setCurrentSelectedGenre(target);
  }

  const renderYearStartSelect = () => {
    let option = [];
    let targetYear = chartDefaultYearRange[0];
    for (let i = 0; targetYear <= chartDefaultYearRange[1]; i++) {
      option.push(<option key={i} value={targetYear}>{targetYear}</option>);
      targetYear++;
    }
    return option;
  };

  const renderYearEndSelect = (e) => {
    let option = [];
    let targetYear = e ? Number(e.currentTarget.value) : chartDefaultYearRange[0];
    for (let i = 0; targetYear <= chartDefaultYearRange[1]; i++) {
      option.push(<option key={i} value={targetYear}>{targetYear}</option>);
      targetYear++;
    }
    setChartSelectedYearEndOptions(option);
  }


  const onChangeYearStart = (e) => {
    renderYearEndSelect(e);
    if (Number(e.currentTarget.value) > chartSelectedYearRange[1]) {
      setChartSelectedYearRange([Number(e.currentTarget.value), Number(e.currentTarget.value)]);
    } else {
      setChartSelectedYearRange([Number(e.currentTarget.value), Number(chartSelectedYearRange[1])]);
    }
  }

  const onChangeYearEnd = (e) => {
    setChartSelectedYearRange([chartSelectedYearRange[0], Number(e.currentTarget.value)]);
  }

  return (
    <section className="chart">
      <hr />
      <div className='chart-header'>
        <div className='title-left'>
          <h1>Statistique par année</h1>
          <div className='year-range-start'>
            <select className='select' value={chartSelectedYearRange[0]} onChange={(e) => { onChangeYearStart(e) }} >
              {
                renderYearStartSelect()
              }
            </select>
          </div>
          <div className='year-range-middle'>à</div>
          <div className='year-range-end'>
            <select className='select' value={chartSelectedYearRange[1]} onChange={(e) => { onChangeYearEnd(e) }}>
              {
                chartSelectedYearEndOptions
              }
            </select>
          </div>
        </div>
        <div className='select-wrapper'>
          <select className='select genre-select' onChange={(e) => changeGenre(e)} defaultValue="All" name="genre" >
            {
              genreList.map((genre) => (
                <option key={genre.id} value={genre.name}>{genre.name}</option>
              ))
            }
          </select>
        </div>
      </div>
      {
        isChartDataLoading &&
        <div className='spinner-wrapper'>
          <div className='spinner1'></div>
          <div className='spinner2'></div>
          <div className='spinner3'></div>
        </div>
      }
      <div className={isChartDataLoading ? "unvisible" : "visible"}>
        <div className='chart-content'>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={500}
              height={400}
              data={chartMovieList}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="year" scale="band" />
              <YAxis yAxisId={1} label={{ value: "Nombre de films", angle: -90, dx: -20 }} />
              <YAxis
                yAxisId={2}
                orientation="right"
                domain={[0, 10]}
                tickCount={6}
                label={{ value: "Note moyenne", angle: -90, dx: 20 }}
              />
              <Tooltip />
              <Legend />
              <Bar yAxisId={1} dataKey="movieNumber" barSize={20} fill="#413ea0" name="Nombre de films" />
              <Line yAxisId={2} type="monotone" dataKey="rating" stroke="#ff7300" name="Note moyenne" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default Chart