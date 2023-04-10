import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [genre, setGenre] = useState('');

  const getMovieRequest = async (page = 1, searchType) => { 
    let url = `http://www.omdbapi.com/?apikey=5d7d2681&page=${page}&r=30`;
    if (searchValue && searchType === 'search') { 
      url += `&s=${searchValue}`;
    } else if (genre && searchType === 'genre') {
      url += `&type=movie&genre=${genre}`;
    }
    
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
      setTotalResults(responseJson.totalResults);
      setCurrentPage(page);
    }
  };
  
  const handleSearch = (searchType) => { 
    if (searchType === 'search' && !searchValue) {
      return;
    } else if (searchType === 'genre' && !genre) {
      return;
    }
    
    getMovieRequest(1, searchType);
  };

  useEffect(() => {
    getMovieRequest(currentPage);
  }, [searchValue, currentPage, genre]);

  const onPageChange = (pageNumber) => {
    getMovieRequest(pageNumber, "search");
  };

  const renderPagination = () => {
    const pagesCount = Math.ceil(totalResults / 10);
    const pages = [];

    
    if (pagesCount > 1) {
      pages.push(
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} key="prev">
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </button>
        </li>
      );

      pages.push(
        <li className={`page-item ${currentPage === pagesCount ? 'disabled' : ''}`} key="next">
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      );
    }

    return (
      <nav>
        <ul className="pagination">{pages}</ul>
      </nav>
    );
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row align-items-center mt-4 mb-4">
        <div className="col-sm-8">
          <MovieListHeading heading="Movie Search" />
        </div>
        <div className="col-sm-4">
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            genre={genre}
            setGenre={setGenre}
            onSearch={() => handleSearch('search')} 
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <MovieList movies={movies} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          {totalResults > 0 && (
            <h5>
              Showing {movies.length} of {totalResults} results
            </h5>
          )}
          {renderPagination()}
        </div>
      </div>
    </div>
  );
  
};

export default App;