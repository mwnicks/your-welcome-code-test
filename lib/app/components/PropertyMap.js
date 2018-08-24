import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const PropertyMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.lat, lng: props.long }}
  >
    <Marker position={{ lat: props.lat, lng: props.long }} />
  </GoogleMap>
));

export default PropertyMap;

PropertyMap.propTypes = {
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
};
