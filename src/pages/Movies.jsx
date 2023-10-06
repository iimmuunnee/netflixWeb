import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';


const Movies = () => {

  const [movieList, setMovieList] = useState([])
  const { popularMovies } = useSelector((state) => state.movie)
  let array = [...popularMovies]
  console.log("array", array);

  useEffect(() => {
    if (popularMovies.length !== 0) {
      setMovieList(popularMovies)
    }
  }, [])

  const movieSorted = (keyword, sortMethod) => {

    if(keyword === "제목"){
      if(sortMethod === "asc"){
        array.sort((a, b) => a.title.localeCompare(b.title))
        setMovieList(array)
      }
      else{
        array.sort((a, b) => b.title.localeCompare(a.title))
        setMovieList(array)
      }
    }

    if (keyword === "평점") {
      if (sortMethod === "asc") {
        array.sort((a, b) => a.vote_average - b.vote_average)
        setMovieList(array)
      }
      else{
        array.sort((a, b) => b.vote_average - a.vote_average)
        setMovieList(array)
      }
    }
    
    if(keyword === "인기도"){
      if (sortMethod === "asc") {
        array.sort((a, b) => a.popularity - b.popularity)
        setMovieList(array)
      }
      else{
        array.sort((a, b) => b.popularity - a.popularity)
        setMovieList(array)
      }
    }
  }

  return (
    <div>
      <div>
        <h3 style={{ display: "inline-block" }}>인기 영화 필터링</h3>
        <div className='container'>
          <div className='sort'>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>정렬</Accordion.Header>
                <Accordion.Body>
                  <Dropdown data-bs-theme="dark">
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                      정렬방식을 선택하세요
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => movieSorted('제목', 'asc')}>제목 오름차순</Dropdown.Item>
                      <Dropdown.Item onClick={() => movieSorted('제목', 'desc')}>제목 내림차순</Dropdown.Item>
                      <Dropdown.Item onClick={() => movieSorted('평점', 'asc')}>평점 오름차순</Dropdown.Item>
                      <Dropdown.Item onClick={() => movieSorted('평점', 'desc')}>평점 내림차순</Dropdown.Item>
                      <Dropdown.Item onClick={() => movieSorted('인기도', 'asc')}>인기도 오름차순</Dropdown.Item>
                      <Dropdown.Item onClick={() => movieSorted('인기도', 'desc')}>인기도 내림차순</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

          </div>
          <div className='CardList'>
            <Row xs={1} md={3} className="g-4">
              {movieList?.map((movie, idx) => (
                <Col key={idx}>
                  <Card>
                    <Card.Img variant="top" src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`} />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>
                        {movie.release_date} <br />
                        평점: {movie.vote_average}<br />
                        인기도: {movie.popularity.toFixed(0)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movies