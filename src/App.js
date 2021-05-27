import React, { useState, useEffect } from "react";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import "./scss/App.scss";
import bearFace from "./assets/img/bear-face.svg";
import axios from "axios";

import { Header, Filter } from "./components";
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

function App() {
  const [token, setToken] = useLocalStorage("Token");
  const [dataJogs, setDataJogs] = useState([]);
  const [userId, setUserId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filterBlock, setFilterBlock] = useState(true);

  const getDataJogs = async () => {
    const urlData = "https://jogtracker.herokuapp.com/api/v1/data/sync";

    const res = await axios.get(urlData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data.response;

    setDataJogs(data.jogs);
    setSearchResults(data.jogs);
    setUserId(data.users[0].id);
  };

  useEffect(() => {
    if (token) getDataJogs();
  }, [token]);

  const getToken = async () => {
    const urlToken = "https://jogtracker.herokuapp.com/api/v1/auth/uuidLogin";
    const payload = { uuid: "hello" };

    const res = await axios.post(urlToken, payload);
    const token = res.data.response.access_token;

    setToken(token);
  };

  const isFelter = () => {
    setFilterBlock(!filterBlock);
  };

  const isSearchResults = (data) => {
    setSearchResults(data);
  };

  return (
    <div data-testid="app-component" className="wrapper">
      <BrowserRouter>
        <Header isFelter={isFelter} filterBlock={filterBlock} />
        <div className="content">
          {filterBlock && (
            <Filter
              dataJogs={dataJogs}
              searchResults={searchResults}
              isSearchResults={isSearchResults}
            />
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
                    data-testid="button-let-me-in"
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
          render={() => (
            <Jogs
              dataJogs={searchResults}
              token={token}
              userId={userId}
              getDataJogs={getDataJogs}
            />
          )}
        />
        <Route path="/INFO" exact component={Info} />
        <Route path="/CONTACT-US" exact component={ContactUs} />
      </BrowserRouter>
    </div>
  );
}

export default App;
