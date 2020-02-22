import React, { useState } from "react";

const SearchBar = () => {
  const [term, setTerm] = useState("");

  const onInputChange = event => {
    setTerm(event.target.value);
  };

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
            value={term}
            onChange={onInputChange}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
