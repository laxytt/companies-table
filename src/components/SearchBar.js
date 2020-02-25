import React, { useState } from "react";

const SearchBar = ({ searchTerm, onTermChange, onTermSubmit }) => {
  const onFormSubmit = event => {
    event.preventDefault();
    //make sure to call callback from parent comp.
  };

  return (
    <div className="search-bar ui segment">
      <form onSubmit={onFormSubmit} className="ui form">
        <div className="field">
          <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={onTermChange}
            onFormSubmit={onTermSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
