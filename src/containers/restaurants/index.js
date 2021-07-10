import { useQuery } from "react-query";
import axios from 'config/axios';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';

import Restaurants from "components/pages/restaurants";
import Loader from 'UI/loader';

const RestaurantsContainer = () => {
  const { 
    isLoading, 
    error, 
    data: restaurants 
  } = useQuery("restaurants", () => axios.get('/restaurants.json'));

  if (isLoading) return <Loader />;

  if (error) return "An error has occurred: " + error.message;

  const sortedData = sortBy(
    get(restaurants, 'data', {}), 
    restaurant => -restaurant.rateValue,
  );

  return <Restaurants data={sortedData} />;
};

export default RestaurantsContainer;
