import Header from "../../header";
import PropTypes from "prop-types";
import { Map } from "components/map";
import TableSection from "components/pages/restaurants/table-section";
import Footer from "../../footer";

import classes from "./Restaurants.module.css";
import isEmpty from "lodash/isEmpty";

const Restaurants = ({ data }) => {
  return (
    <div className={classes.Restaurants}>
      <Header title="Restaurants" />
      {!isEmpty(data) && (
        <main className={classes.MainSection}>
          <TableSection data={data} />
          <div style={{ height: "100vh", width: "100%" }}>
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
