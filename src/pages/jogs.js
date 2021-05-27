import React, { useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { FormJog } from "../components";

import icon from "../assets/img/icon.svg";
import add from "../assets/img/add.svg";

const calculationSpeed = (distance, time) => {
  return Math.round((distance / 1000 / time) * 60 * 1000);
};

const Jogs = ({ dataJogs, token, userId, getDataJogs }) => {
  const [formJog, setFormJog] = useState(false);
  const [jogId, setjogId] = useState("");

  const updateJog = (e) => {
    setjogId(e.currentTarget.id);
    setFormJog(true);
  };

  const isFormJog = () => {
    setjogId("");
    setFormJog(!formJog);
  };

  return (
    <div>
      <div data-testid="jogs-component" className={formJog ? "jogs" : ""}>
        {dataJogs.length &&
          dataJogs.map((item) => (
            <div
              data-testid="jog"
              id={item.id}
              onClick={updateJog}
              key={item.id}
              className="jog"
            >
              <img className="icon" src={icon} alt="icon" />
              <div className="parameters">
                <div className="parameters__date">
                  Date:{" "}
                  <Moment date={item.date * 1000} format="DD.MM.yy"></Moment>
                </div>
                <div className="parameters__speed">
                  <span className="weight-text">Spead:</span>{" "}
                  {calculationSpeed(item.distance, item.time)} km/h
                </div>
                <div className="parameters__distance">
                  <span className="weight-text">Distance:</span> {item.distance}{" "}
                  km
                </div>
                <div className="parameters__time">
                  <span className="weight-text">Time:</span> {item.time} min
                </div>
              </div>
            </div>
          ))}
      </div>
      {formJog && (
        <FormJog
          isFormJog={isFormJog}
          token={token}
          userId={userId}
          jogId={jogId}
          dataJogs={dataJogs}
          getDataJogs={getDataJogs}
        />
      )}
      <img
        data-testid="is-form-jog"
        className="add"
        onClick={isFormJog}
        src={add}
        alt="add"
      />
    </div>
  );
};

Jogs.propTypes = {
  dataJogs: PropTypes.array.isRequired,
  getDataJogs: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

Jogs.defaultProps = {
  dataJogs: [],
  token: "",
  userId: "",
  getDataJogs: () => {},
};

export default Jogs;
