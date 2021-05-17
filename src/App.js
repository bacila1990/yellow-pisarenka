import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import "./scss/App.scss";
import bearFace from "./assets/img/bear-face.svg";
import axios from "axios";

import { Header } from "./components";
import { Jogs, Info, ContactUs } from "./pages";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

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

function App() {
  const [token, setToken] = useLocalStorage("Token");
  const [dataJogs, setDataJogs] = useState([]);
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filterBlock, setFilterBlock] = useState(true);
  const [filterOne, setFilterOne] = useState(false);
  const [filterTwo, setFilterTwo] = useState(false);

  useEffect(() => {
    const urlData = "https://jogtracker.herokuapp.com/api/v1/data/sync";

    if (token) {
      axios
        .get(urlData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setDataJogs(res.data.response.jogs);
          setSearchResults(res.data.response.jogs);
        })
        .catch((error) => console.log(error));
    }
  }, [token]);

  const getToken = () => {
    const urlToken = "https://jogtracker.herokuapp.com/api/v1/auth/uuidLogin";
    axios
      .post(urlToken, { uuid: "hello" })
      .then((res) => {
        const token = res.data.response.access_token;
        setToken(token);
      })
      .catch((error) => console.log(error));
  };

  const handleChangeOne = (e) => {
    if (event.target.name === "setFilterFrom") {
      setFilterFrom(e.target.value);
    }
    if (event.target.name === "setFilterTo") {
      setFilterTo(e.target.value);
    }

    if (e.target.value.length === 10) {
      if (event.target.name === "setFilterFrom") {
        if (filterTwo === false) {
          setSearchResults(filterDate(dataJogs, e.target.value, ">="));
          setFilterOne(true);
        } else {
          setSearchResults(filterDate(searchResults, e.target.value, ">="));
        }
      }
      if (event.target.name === "setFilterTo") {
        if (filterOne === false) {
          setSearchResults(filterDate(dataJogs, e.target.value, "<="));
          setFilterTwo(true);
        } else {
          setSearchResults(filterDate(searchResults, e.target.value, "<="));
        }
      }
    } else {
      if (event.target.name === "setFilterFrom") {
        if (filterTwo === true) {
          setSearchResults(filterDate(dataJogs, filterTo, "<="));
        }
        setFilterOne(false);
      } else {
        setSearchResults(dataJogs);
      }
      if (event.target.name === "setFilterTo") {
        if (filterOne === true) {
          setSearchResults(filterDate(dataJogs, filterFrom, ">="));
        }
        setFilterTwo(false);
      } else {
        setSearchResults(dataJogs);
      }
    }
  };

  const isFelter = () => {
    setFilterBlock(!filterBlock);
  };

  return (
    <div className="wrapper">
      <Header isFelter={isFelter} />
      <div className="content">
        {filterBlock && (
          <div className="rectangle">
            <span className="date-from ">
              Date from
              <input
                className="search-jogs "
                type="text"
                name="setFilterFrom"
                placeholder="13.01.1970"
                value={filterFrom}
                onChange={handleChangeOne}
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
                onChange={handleChangeOne}
              />
            </span>
          </div>
        )}
        <Route
          path="/"
          exact
          render={() =>
            token ? (
              <Redirect to="/JOGS" />
            ) : (
              <div className="Rectangle-3">
                <img className="bear-face" src={bearFace} alt="bear face" />
                <button
                  type="button"
                  onClick={getToken}
                  className="Rectangle-2"
                >
                  Let me in
                </button>
              </div>
            )
          }
        />
      </div>
      <Route
        path="/JOGS"
        exact
        render={() => <Jogs dataJogs={searchResults} token={token} />}
      />
      <Route path="/INFO" exact component={Info} />
      <Route path="/CONTACT-US" exact component={ContactUs} />
    </div>
  );
}

export default App;
