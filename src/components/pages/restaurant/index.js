import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import defaultTo from "lodash/defaultTo";
import isEmpty from "lodash/isEmpty";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";

import Header from "components/header";
import Footer from "components/footer";
import Auxiliary from 'hoc/auxiliary';

import classes from "./Restaurant.module.css";

const Restaurant = ({
  baseInfo,
  isChangeRatingLoading,
  comments,
  addCommentIsLoading,
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

  const handleSendButton = useCallback(() => {
    setCommentValue('')
    !!commentValue.trim() && addComment(commentValue)
  },
    [addComment, commentValue]
  );

  useEffect(() =>
    baseInfo.rateValue &&
    setRateValue(
      defaultTo(Math.round(baseInfo.rateValue / baseInfo.rateCount), 0)
    ),
    [baseInfo.rateValue, baseInfo.rateCount]
  );

  return (
    <Auxiliary>
      <Header backButton title={baseInfo.title} />
      <div className={classes.Restaurant}>
        <div className={classes.Description}>
          <h2>About Our Restaurant</h2>
          <Rating
            name="restaurant_rating"
            disabled={isChangeRatingLoading}
            value={rateValue}
            onChange={(event, newRateValue) =>
              changeRating({
                previousRateValue: baseInfo.rateValue,
                previousRateCount: baseInfo.rateCount,
                newRateValue,
              })
            }
          />
          <span 
            className={classes.Testimonials}>
              Testimonials count: <span>{baseInfo.rateCount}</span>
          </span>
          <p>{baseInfo.description}</p>
        </div>
        <div>
          <p style={{fontWeight: 'bold'}}>Add feedback</p>
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
              disabled={!commentValue.trim() || addCommentIsLoading}>
              Send
            </Button>
          </div>
        </div>
        <div>
          <span style={{display: 'inline-block', fontWeight: 'bold', marginTop: '15px'}}>All feedbacks:</span>
          {isEmpty(comments) ? (
            <p>There is no feedback yet</p>
          ) : (
            <ul
              style={{
                maxHeight: '500px',
                overflow: 'auto',
                margin: '10px 20px',
            }}>
              {
              Object.entries(comments).map(([key, {value}]) => {
                return (
                  <li key={key}>{value}</li>
                  )
                })
              }
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </Auxiliary>
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
  isChangeRatingLoading: PropTypes.bool,
  comments: PropTypes.object,
  addCommentIsLoading: PropTypes.bool,
  mutations: PropTypes.shape({
    changeRating: PropTypes.func,
    addComment: PropTypes.func,
  }),
};

export default Restaurant;
