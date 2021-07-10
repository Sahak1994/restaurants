import Restaurants from "components/pages/restaurants";
import { useQuery } from "react-query";
import axios from 'config/axios';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';

const RestaurantsContainer = () => {
  const { isLoading, error, data: restaurants } = useQuery("restaurants", () =>
    axios.get('/restaurants.json')
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const sortedData = sortBy(get(restaurants, 'data', {}), restaurant => -restaurant.rateValue );

  return (
    <div>
      <Restaurants data={sortedData}/>
    </div>
  );
};

export default RestaurantsContainer;
