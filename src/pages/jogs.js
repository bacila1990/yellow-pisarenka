import React, { useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { FormJog } from "../components";

import icon from "../assets/img/icon.svg";
import add from "../assets/img/add.svg";

const calculationSpeed = (distance, time) => {
  return Math.round((distance / 1000 / time) * 60 * 1000);
};

const Jogs = ({ dataJogs, token, userId }) => {
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
    <>
      <div className={formJog ? "jogs" : ""}>
        {dataJogs.length &&
          dataJogs.map((item) => (
            <div id={item.id} onClick={updateJog} key={item.id} className="jog">
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
        />
      )}
      <img className="add" onClick={isFormJog} src={add} alt="add" />
    </>
  );
};

Jogs.propTypes = {
  dataJogs: PropTypes.array.isRequired,
  token: PropTypes.string,
  userId: PropTypes.string,
};

export default Jogs;
