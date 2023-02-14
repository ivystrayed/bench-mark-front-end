import PropTypes from "prop-types";
import "./RatingForm.css";
import React, { useState } from "react";

const RatingForm = () => {
  const [viewRating, setViewRating] = useState(0);
  const [seclusionRating, setSeclusionRating] = useState(0);
  const [squirrelRating, setSquirrelRating] = useState(0);
  const [accesibilityRating, setAccesibilityRating] = useState(0);

  const RatingArray = (rating, setRating) => {
    const [hover, setHover] = useState(0);
    return [...Array(5)].map((star, index) => {
      index += 1;
      return (
        <button
          type="button"
          key={index}
          className={index <= (hover || rating) ? "on" : "off"}
          onClick={() => setRating(index)}
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(rating)}
        >
          <span className="star">&#9733;</span>
        </button>
      );
    });
  };

  return (
    <div id="rating-form">
      <div id="view">{RatingArray(viewRating, setViewRating)}</div>

      <div id="seclusion">
        {RatingArray(seclusionRating, setSeclusionRating)}
      </div>

      <div id="squirrels">{RatingArray(squirrelRating, setSquirrelRating)}</div>

      <div id="accesibility">
        {RatingArray(accesibilityRating, setAccesibilityRating)}
      </div>

      <div id="time-spent"></div>

      <button type="submit">submit</button>
    </div>
  );
};

export default RatingForm;