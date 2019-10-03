import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";
import "./Discover.css";

interface movieProps {
  id: number;
  poster_path: string;
  original_title: string;
  vote_average: string;
  overview: string;
}

const apiKey = "1d229eb894b9ce78a542d83256829774";
const imgURL = "http://image.tmdb.org/t/p/original";
export const Discover = () => {
  const [movieList, setMovieList] = useState([]);

  const handleGetMovies = async (query?: string) => {
    let response;

    // checks if {query} is not empty
    let url = query
      ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&query=${query}` // not empty
      : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22`; // empty

    response = await axios.get(url); // pass the url based on the query condition
    setMovieList(response.data.results); // setState of MovieList
  };

  // pareho ng componentDidMount, componentWillMount, componentDidUpdate (React life cycle)
  useEffect(() => {
    handleGetMovies();
  }, []);
  return (
    <div>
      <div>
        <h1 className="like">Other movies you might like:</h1>

        <div className="movies">
          <div className="row">
            {movieList.map((movie: movieProps, key: number) => (
              <Link to={`/more-info/${movie.id}`}>
                <div className="column" key={key}>
                  <Card
                    hoverable
                    style={{ width: 270 }}
                    cover={
                      <img
                        className="movie"
                        alt="example"
                        src={imgURL + movie.poster_path}
                      />
                    }
                  >
                    <div className="title">{movie.original_title}</div>
                  </Card>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
