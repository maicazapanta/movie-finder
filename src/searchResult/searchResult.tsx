// import from node modules
import React, { useState, useEffect } from "react";
import { Card, Input, Spin, Icon } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

// import css
import "antd/dist/antd.css";
import "./searchResult.css";

// import custom components, utils, etc
// import {movies} from "../utils/data";

// all global constant variables
const { Search } = Input;
const { Meta } = Card;
const apiKey = "1d229eb894b9ce78a542d83256829774";
const imgURL = "http://image.tmdb.org/t/p/original";
const antIcon = (
  <Icon type="loading" style={{ fontSize: 50, color: "red" }} spin />
);

// interfaces
interface movieProps {
  id: number;
  poster_path: string;
  original_title: string;
  vote_average: string;
  overview: string;
}

// main function
export const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Passes query / string variable to the get movies
  const handleOnSearch = (query: any) => {
    handleGetMovies(query);
  };

  const handleGetMovies = async (query?: string) => {
    setLoading(true);
    let response;

    // checks if {query} is not empty
    let url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}` // not empty
      : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`; // empty

    response = await axios.get(url); // pass the url based on the query condition
    setMovieList(response.data.results); // setState of MovieList
    setLoading(false);
  };

  // pareho ng componentDidMount, componentWillMount, componentDidUpdate (React life cycle)
  useEffect(() => {
    handleGetMovies();
  }, []);

  return (
    <div>
      <div className="find">
        <h1>MOVIE FINDER</h1>
        <Search
          className="search"
          placeholder="Search movie...."
          onSearch={handleOnSearch}
        />
      </div>
      <div className="rowMain">
        <h2>POPULAR MOVIES:</h2>
        <Spin spinning={loading} indicator={antIcon}>
          <div className="container">
            {movieList.map((movie: movieProps, key: number) => (
              <Link to={`/more-info/${movie.id}`}>
                <div className="columnMain" key={key}>
                  <Card
                    className="card"
                    hoverable
                    style={{ width: 450, height: 250 }}
                    cover={
                      <div>
                        <img
                          alt="movie"
                          className="image"
                          src={imgURL + movie.poster_path}
                        />
                        <p>{movie.original_title}</p>
                        {movie.overview}
                      </div>
                    }
                  >
                    <div className="meta">
                      <Meta title="More Info" />
                    </div>
                  </Card>
                </div>
              </Link>
            ))}
          </div>
        </Spin>
      </div>
    </div>
  );
};
