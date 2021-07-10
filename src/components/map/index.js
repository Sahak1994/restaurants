import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ReactMapGL,  { Marker } from 'react-map-gl';
import isEmpty from 'lodash/isEmpty';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';

const useStyles = makeStyles({
  description: {
    position: 'absolute',
    left: 0,
    bottom: 10,
    color: 'orange',
    display: 'none'
  }
});

const StyledIconButton = withStyles({
  root: {
    position: 'relative',
    '&:hover p': {
      display: 'block',
    } 
  }
})(IconButton);

const StyledPlaceIcon = withStyles({
  root: {
    cursor: 'pointer',
  }
})(PlaceIcon);


export const Map = ({ data }) => {
  const classes = useStyles();
  const history = useHistory();
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 1
  });

  return (
    <ReactMapGL
    {...viewport}
    width="100%"
    height="100%"
    onViewportChange={(viewport) => setViewport(viewport)}
  >
    {
      !isEmpty(data) && (
        data.map(item => (
          <Marker key={item.id} latitude={item.latitude} longitude={item.longitude} offsetLeft={-20} offsetTop={-10} captureClick={true}>
            <StyledIconButton
              onClick={() => history.push(`/${item.id}`)}>
              <StyledPlaceIcon color='secondary' />
              <p className={classes.description}>{item.title}</p> 
            </StyledIconButton>
       </Marker>
        ))
      )
    }
  </ReactMapGL>
  );
};

Map.defaultProps = {
  data: [],
};

Map.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }))
};
