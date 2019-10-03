import React, { useState, useEffect } from "react";
import { Card, Spin, Icon } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import "./moreInfo.css";

const imgURL = "http://image.tmdb.org/t/p/original";
const apiKey = "1d229eb894b9ce78a542d83256829774";
const antIcon = (
  <Icon type="loading" style={{ fontSize: 50, color: "red" }} spin />
);

type MoreInfoProps = {
  match: any;
};

// interfaces
// interface movieProps {
//   id: number;
//   poster_path: string;
//   original_title: string;
//   vote_average: string;
//   overview: string;
//   release_date: string;
// }

// interface castProps {
//   id: number;
//   casts: [{ id: number }, { name: string }];
// }

// const movieInitialProps = {
//   id: 0,
//   poster_path: "",
//   original_title: "",
//   vote_average: "",
//   overview: "",
//   release_date: ""
// };

// let movie: movieProps = movieInitialProps;

export const MoreInfo: React.FC<MoreInfoProps> = ({ match }) => {
  const [movie, setMovie] = useState();

  let movieId = match.params.id;

  const handleGetMovies = async () => {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    );
    setMovie(response.data);
  };

  useEffect(() => {
    handleGetMovies();
  }, []);
  handleGetMovies();

  if (!movie) {
    return (
      <div>
        <div className="div">
          <Spin indicator={antIcon} spinning={true} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="div">
        <Card
          className="card1"
          style={{ width: 1050 }}
          cover={
            <div>
              <img
                alt="movie"
                className="image1"
                src={imgURL + movie.poster_path}
              ></img>
              <h1>{movie.original_title}</h1>
              Rating: {movie.vote_average}
              <div>{movie.overview}</div>
              <h3>Released Date:{movie.release_date}</h3>
              <strong>Genre:</strong>Comedy/Horror/Thriller
              <br></br>
              <strong>Directed by:</strong> Tim Miller
              <br></br>
              <strong>Written by:</strong> Rhett Reese & Paul Wernick
              <br></br>
              <a href="https://www.youtube.com/watch?v=D86RtevtfrA">
                WATCH TRAILER
              </a>
            </div>
          }
        ></Card>
      </div>
    </div>
  );
};
