import React, { useState } from 'react';
import MovieModal from './MovieModal';
import './MovieList.css';
import placeholderImage from './2443819.jpeg';

const MovieList = (props) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="row">
      <div className="col">
        <div className="movie-list-container">
          <div className="movie-list">
            {props.movies.map((movie, index) => (
              <div className="card movie-card" key={index} onClick={() => handleMovieClick(movie)}>
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : placeholderImage}
                  alt="movie"
                  className="card-img-top movie-poster"
                  height="250"
                  width="170"
                  style={{ objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">{`Year: ${movie.Year}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedMovie && (
          <MovieModal
            isOpen={true}
            movie={selectedMovie}
            onRequestClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};

export default MovieList;
