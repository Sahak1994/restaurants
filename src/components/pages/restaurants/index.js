import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

import { Map } from "components/map";
import Header from "components/header";
import TableSection from "components/pages/restaurants/table-section";
import Footer from "components/footer";

import classes from "./Restaurants.module.css";

const Restaurants = ({ data }) => {
  return (
    <div className={classes.Restaurants}>
      <Header title="Restaurants" />
      {!isEmpty(data) && (
        <main className={classes.MainSection}>
          <TableSection data={data} />
          <div className={classes.Map}>
            <Map data={data} />
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
};

Restaurants.defaultProps = {
  data: [],
};

Restaurants.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rateValue: PropTypes.number.isRequired,
      rateCount: PropTypes.number.isRequired,
    })
  ),
};

export default Restaurants;
