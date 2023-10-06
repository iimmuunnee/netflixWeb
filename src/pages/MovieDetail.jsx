import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import axios from "../api";

const MovieDetail = () => {
  useEffect(() => {
    getMovieDetail();
    getReviews();
  }, []);

  const [movieInfo, setMovieInfo] = useState();
  const [reviews, setReviews] = useState();
  const backgroundImg = movieInfo?.poster_path;

  const { id } = useParams();
  console.log(id);

  /** 영화 정보 불러오는 함수 */
  const getMovieDetail = async () => {
    const movieDetail = axios.get(`/movie/${id}?language=ko-KR`);

    const [detail] = await Promise.all([movieDetail]);

    console.log(detail.data);
    setMovieInfo(detail.data);
  };

  /** 영화 정보 불러오는 함수 */
  const getReviews = async () => {
    const reviews = axios.get(`movie/${id}/reviews?language=en-US&page=1`);

    const [review] = await Promise.all([reviews]);

    console.log("reviews", review.data);
    setReviews(review.data);
  };

  const poster_Style = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/original${backgroundImg})`,
    height: "1200px",
    width: "900px",
  };

  const runtime_hour = parseInt(movieInfo?.runtime / 60);
  const runtime_min = movieInfo?.runtime % 60;

  return (
    <div>
      {/* 영화 상세정보 */}
      {movieInfo ? (
        <div className="container movieDetail" style={{ display: "flex", height: "100vh", justifyContent: "center" }}>

          <div className="posterContainer">
            <img src={`https://www.themoviedb.org/t/p/original/${backgroundImg}`} alt="" />
          </div>

          <div className="movieInfo">
            <section className="genres">
              <Stack direction="horizontal" gap={2}>
                {movieInfo.genres.map((item) => (
                  <Badge bg="danger" key={item.id}>
                    {item.name}
                  </Badge>
                ))}
              </Stack>
            </section>
            <h1>{movieInfo.title}</h1>
            <h5>{movieInfo.tagline}</h5>
            <section className="dateRuntime">
              <span>출시일: {movieInfo.release_date}</span>
              <span>
                러닝타임: {runtime_hour}시간 {runtime_min}분
              </span>
              <span>평점 {movieInfo.vote_average.toFixed(1)}점</span>
              <span>
                {movieInfo.adult ? "15세 이상 관람가" : "청소년관람불가"}
              </span>
            </section>
            <section className="overview">
              {movieInfo.overview}
            </section>
          </div>
        </div>
      ) : ''}

      {/* 리뷰 영역 */}
      <div className="container reviewBox">
        {reviews?.results.map((review, index) => (
          <div className="reviewItem" key={index}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
