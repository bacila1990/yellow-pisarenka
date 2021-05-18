import React from "react";
import cancel from "../assets/img/cancel.svg";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import axios from "axios";

const FormJog = ({ isFormJog, token }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ distance, time, date }) => {
    console.log("distance, time, date:", distance, time, date);
    const urlData = "https://jogtracker.herokuapp.com/api/v1/data/jog";

    axios({
      method: "post",
      url: urlData,
      data: `date=${date}&time=${time}&distance=${distance}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("res:", res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <form className="formJog" onSubmit={handleSubmit(onSubmit)}>
      <img
        className="formJog__cancel"
        onClick={() => isFormJog()}
        src={cancel}
        alt="cancel"
      />
      <div className="formJog__block">
        <span className="formJog__block__elem">
          Distance:{" "}
          <input
            placeholder="6"
            className="input-form"
            {...register("distance", {
              required: true,
              pattern: /^[0-9]*[.,]?[0-9]+$/,
            })}
          />
          {errors.distance && (
            <span className="errors-input">This field is required</span>
          )}
        </span>
        <span className="formJog__block__elem">
          Time:
          <input
            placeholder="12"
            className="input-form"
            {...register("time", {
              required: true,
              pattern: /^[0-9]*[.,]?[0-9]+$/,
            })}
          />
          {errors.time && (
            <span className="errors-input">This field is required</span>
          )}
        </span>
        <span className="formJog__block__elem">
          Date:
          <input
            placeholder="21.02.1970"
            className="input-form"
            {...register("date", {
              required: true,
              maxLength: 10,
              pattern: /^\d{2}([./-])\d{2}\1\d{4}$/,
            })}
          />
          {errors.date && (
            <span className="errors-input">This field is required</span>
          )}
        </span>
      </div>
      <input className="formJog__submit" type="submit" value="Save" />
    </form>
  );
};

FormJog.propTypes = {
  isFormJog: PropTypes.func.isRequired,
  token: PropTypes.string,
};

export default FormJog;
