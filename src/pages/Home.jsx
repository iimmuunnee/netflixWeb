import React, { useEffect, useState, CSSProperties } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MovieReducerActions } from "../redux/reducers/movieSlice"
import axios from '../api'
import Banner from '../components/Banner'
import MovieSlide from '../components/MovieSlide'
import FadeLoader from "react-spinners/FadeLoader";


const Home = () => {

  const [isLoading, setIsLoading] = useState(true)

  const {popularMovies, topRatedMovies, upComingMovies} = useSelector((state) => state.movie)

  const dispatch = useDispatch()

  // 3가지 종류의 영화목록을 묶어서 요청하는 방법
  const getMovieList = async () => {
    const popularList = axios.get("/movie/popular", {
      params: { language: 'ko-KR', page: '1' },
    })

    const topRatedList = axios.get("/movie/top_rated", {
      params: { language: 'ko-KR', page: '1' },
    })
    const upComingList = axios.get("/movie/upcoming", {
      params: { language: 'ko-KR', page: '1' },
    })
    const genres = await axios.get("/genre/movie/list", {
      params: { language: 'ko' },
    })

    // 모든 데이터가 응답할 때까지 기다림
    // 여러 데이터를 한번에 응답 처리하기
    const [popular, topRated, upComing, genre] = await Promise.all([popularList, topRatedList, upComingList, genres])

    dispatch(MovieReducerActions.initData({
      popular: popular.data,
      topRated: topRated.data,
      upComing: upComing.data,
      genre : genre.data
    }))

    setTimeout(()=>{
      setIsLoading(false)
    }, 1000)
  }

  useEffect(() => {
    getMovieList()
    // popular
    // popularReq()

    // top rated
    // topRated()

    // upcoming
    // upComing()

  }, [])

  return (
    <div>
      {isLoading ?
        <div className='loader'>
          <FadeLoader
            color={"red"}
            loading={isLoading}
            size={120}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          </div> : (

          <div>
            <Banner popularMovie0={popularMovies[13]} />
            <MovieSlide slide={"Popular Movie"} movies={popularMovies} />
            <MovieSlide slide={"Top Rated Movie"} movies={topRatedMovies} />
            <MovieSlide slide={"Upcoming Movie"} movies={upComingMovies} />
          </div>
        )}

    </div>
  )
}

export default Home