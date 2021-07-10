import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../../header";
import Footer from "../../footer";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import classes from "./Restaurant.module.css";
import defaultTo from "lodash/defaultTo";
import isEmpty from "lodash/isEmpty";
import { useCallback } from "react";

const Restaurant = ({
  baseInfo,
  comments,
  mutations: { changeRating, addComment },
}) => {
  const [rateValue, setRateValue] = useState(
    defaultTo(Math.round(baseInfo.rateValue / baseInfo.rateCount), 0)
  );

  const [commentValue, setCommentValue] = useState("");

  const handleTextAreaChange = useCallback(
    e => setCommentValue(e.target.value),
    []
  );

  const handleSendButton = useCallback(
    () => !!commentValue.trim() && addComment(commentValue),
    [addComment, commentValue]
  );

  useEffect(
    () =>
      baseInfo.rateValue &&
      setRateValue(
        defaultTo(Math.round(baseInfo.rateValue / baseInfo.rateCount), 0)
      ),
    [baseInfo.rateValue, baseInfo.rateCount]
  );

  return (
    <div className={classes.Restaurant}>
      <Header backButton title={baseInfo.title} />
      <div className={classes.a}>
        <p>Descriotion: </p>
        <p>{baseInfo.description}</p>
      </div>
      <p>Testimonials count: {baseInfo.rateCount}</p>
      <Rating
        name="restaurant_rating"
        value={rateValue}
        onChange={(event, newRateValue) =>
          changeRating({
            previousRateValue: baseInfo.rateValue,
            previousRateCount: baseInfo.rateCount,
            newRateValue,
          })
        }
      />
      <div>
        <p>Add feedback</p>
        <TextareaAutosize
          minRows={5}
          placeholder="Your feedback"
          value={commentValue}
          onChange={handleTextAreaChange}
        />
        <div>
          <Button
            onClick={handleSendButton}
            variant="contained"
            color="primary"
            disabled={!commentValue.trim()}
          >
            Send
          </Button>
        </div>
      </div>
      <div>
        All feedbacks:
        {isEmpty(comments) ? (
          <p>There is no feedback yet</p>
        ) : (
          Object.entries(comments).map(([key, {value}]) => {
            return (
              <div key={key}>
                <p>{value}</p>
              </div>
            )
          })
        )}
      </div>
      <Footer />
    </div>
  );
};

Restaurant.defaultProps = {
  baseInfo: {},
  comments: [],
  mutations: {
    changeRating: () => {},
    addComment: () => {},
  },
};

Restaurant.propTypes = {
  baseInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rateValue: PropTypes.number.isRequired,
    rateCount: PropTypes.number.isRequired,
  }),
  comments: PropTypes.object,
  mutations: PropTypes.shape({
    changeRating: PropTypes.func,
    addComment: PropTypes.func,
  }),
};

export default Restaurant;
