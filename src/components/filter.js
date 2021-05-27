import React, { useState } from "react";
import PropTypes from "prop-types";

const reversDate = (date) => {
  const day = date.substring(3, 5);
  const month = date.substring(0, 2);
  const year = date.substring(6, 10);

  return `${day}.${month}.${year}`;
};

const filterDate = (data, date, sign) => {
  let result = null;

  if (sign === ">=") {
    result = data.filter(
      (elem) => elem.date * 1000 >= Date.parse(reversDate(date))
    );
  }

  if (sign === "<=") {
    result = data.filter(
      (elem) => elem.date * 1000 <= Date.parse(reversDate(date))
    );
  }

  return result;
};

const Filter = ({ dataJogs, searchResults, isSearchResults }) => {
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

  const [filterOne, setFilterOne] = useState(false);
  const [filterTwo, setFilterTwo] = useState(false);

  const handleChange = (event) => {
    if (event.target.name === "setFilterFrom") {
      setFilterFrom(event.target.value);
    }
    if (event.target.name === "setFilterTo") {
      setFilterTo(event.target.value);
    }

    if (event.target.value.length === 10) {
      if (event.target.name === "setFilterFrom") {
        if (filterTwo === false) {
          isSearchResults(filterDate(dataJogs, event.target.value, ">="));
          setFilterOne(true);
        } else {
          isSearchResults(filterDate(searchResults, event.target.value, ">="));
        }
      }
      if (event.target.name === "setFilterTo") {
        if (filterOne === false) {
          isSearchResults(filterDate(dataJogs, event.target.value, "<="));
          setFilterTwo(true);
        } else {
          isSearchResults(filterDate(searchResults, event.target.value, "<="));
        }
      }
    } else {
      if (event.target.name === "setFilterFrom") {
        if (filterTwo === true) {
          isSearchResults(filterDate(dataJogs, filterTo, "<="));
        }
        setFilterOne(false);
      } else {
        isSearchResults(dataJogs);
      }
      if (event.target.name === "setFilterTo") {
        if (filterOne === true) {
          isSearchResults(filterDate(dataJogs, filterFrom, ">="));
        }
        setFilterTwo(false);
      } else {
        isSearchResults(dataJogs);
      }
    }
  };

  return (
    <div className="rectangle">
      <span className="date-from ">
        Date from
        <input
          className="search-jogs "
          type="text"
          name="setFilterFrom"
          placeholder="13.01.1970"
          value={filterFrom}
          onChange={handleChange}
        />
      </span>
      <span className="date-to">
        Date to
        <input
          className="search-jogs "
          type="text"
          name="setFilterTo"
          placeholder="18.01.1970"
          value={filterTo}
          onChange={handleChange}
        />
      </span>
    </div>
  );
};

Filter.propTypes = {
  dataJogs: PropTypes.array.isRequired,
  searchResults: PropTypes.array,
  isSearchResults: PropTypes.func,
};

Filter.defaultProps = { dataJogs: [] };

export default Filter;
