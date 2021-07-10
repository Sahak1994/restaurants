import React from "react";
import Restaurant from "components/pages/restaurant";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "react-query";
import axios from "config/axios";
import get from "lodash/get";
import defaultTo from "lodash/defaultTo";
import { useCallback } from "react";

const RestaurantContainer = () => {
  const queryClient = useQueryClient();
  const params = useParams();

  const getRestaurantQuery = useCallback(
    () =>
      axios.get("/restaurants.json", {
        params: {
          orderBy: '"id"',
          equalTo: params.id, //WHY
          limitToFirst: 1,
        },
      }),
    [params.id]
  );

  const getCommentsQuery = useCallback(
    () =>
      axios.get("/comments.json", {
        params: {
          orderBy: '"restaurant_id"',
          equalTo: `"${params.id}"`,
        },
      }),
    [params.id]
  );

  const {
    isLoading: isRestaurantLoading,
    error: restaurantError,
    data: restaurant,
  } = useQuery("restaurant", getRestaurantQuery, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: areRestaurantCommentsLoading,
    error: restaurantCommentsError,
    data: restaurantComments,
  } = useQuery("restaurantComments", getCommentsQuery, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const restaurantData = defaultTo(
    Object.values(defaultTo(get(restaurant, "data", {}), {}))[0],
    {}
  );

  const changeRatingFunc = useCallback(
    async ({ previousRateValue, previousRateCount, newRateValue }) => {
      const restaurantKey = Object.keys(get(restaurant, "data", {}))[0];

      const result = await axios.patch(`restaurants/${restaurantKey}.json`, {
        rateValue: previousRateValue + newRateValue,
        rateCount: previousRateCount + 1,
      });

      queryClient.setQueryData("restaurant", (cache) => ({
        ...cache,
        data: {
          ...cache.data,
          [restaurantKey]: {
            ...cache.data[restaurantKey],
            rateValue: result.data.rateValue,
            rateCount: result.data.rateCount,
          }
        },
      }));
    },
    [restaurant, queryClient]
  );

  const {
    mutate: changeRating,
    isLoading: isChangeRatingLoading,
    data: changeRatingResult,
    error: changeRatingError,
  } = useMutation(changeRatingFunc);

  const addCommentFunc = useCallback(async value => {
    if(!value.trim()) return;

    const payload = {
      value,
      restaurant_id: params.id,
    };

    const result = await axios.post(`comments.json`, {
      value,
      restaurant_id: params.id,
    });

    queryClient.setQueryData("restaurantComments", cache => (
      {
        ...cache,
        data: {
          ...cache.data,
          [result.data.name]: payload
        }
      }
    ));

  }, [params.id, queryClient]);

  const {
    mutate: addComment,
    isLoading: addCommentIsLoading,
    data: addCommentResult,
    error: addCommentError,
  } = useMutation(addCommentFunc);

  if (isRestaurantLoading) return "Loading...";

  if (restaurantError)
    return "An error has occurred: " + restaurantError.message;

  return (
    <div>
      <Restaurant
        baseInfo={restaurantData}
        comments={get(restaurantComments, "data", [])}
        mutations={{
          changeRating,
          addComment,
        }}
      />
    </div>
  );
};

export default RestaurantContainer;
