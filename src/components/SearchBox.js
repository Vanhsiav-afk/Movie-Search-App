import React from 'react';

const SearchBox = (props) => {
  const genres = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller',
  ];

  const handleInputChange = (event) => {
    props.setSearchValue(event.target.value);
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      props.onSearch();
    }
  };
  const handleGenreChange = (event) => {
    props.setGenre(event.target.value);
  };

  return (
    <div className="row">
      <div className="col-12 col-sm-6 mb-3">
        <div className="input-group">
          <input
            className="form-control"
            id="searchInput"
            placeholder="Type to search movies..."
            value={props.searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary" onClick={() => props.onSearch()}>
            Search
          </button>
        </div>
      </div>
      <div className="col-12 col-sm-4">
        <select
          className="form-select"
          id="genreSelect"
          onChange={handleGenreChange}
          value={props.genre}
        >
          <option value="">Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBox;
