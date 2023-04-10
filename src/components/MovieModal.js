import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './MovieList.css';
import placeholderImage from './2443819.jpeg';
import { ReactComponent as LoaderIcon } from './loader.svg';

Modal.setAppElement('#root');

const MovieModal = ({ isOpen, movie, onRequestClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=5d7d2681`
      );
      const data = await response.json();
      setMovieDetails(data);
      setIsLoading(false);
    };
    fetchMovieDetails();
  }, [movie]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="movie-modal"
      overlayClassName="movie-modal-overlay"
    >
      {isLoading ? (
        <div className="movie-details-loader">
          <LoaderIcon />
        </div>
      ) : movieDetails ? (
        <div className="movie-details">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : placeholderImage}
            alt="movie"
          />
          <div>
            <h2>{movie.Title} ({movie.Year})</h2>
            <p>
              <strong>Runtime:</strong> {movieDetails.Runtime}
            </p>
            <p>
              <strong>Genre:</strong> {movieDetails.Genre}
            </p>
            <p>{movieDetails.Plot}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Modal>
  );
};

export default MovieModal;
