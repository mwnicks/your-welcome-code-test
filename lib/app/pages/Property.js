import React from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
import PropertyMap from '../components/PropertyMap';

export function PropertyPage({ relay, viewer }) {
  if (!viewer.property) {
    return (
      <div>
        <h3>this property ({relay.variables.propertyID}) was not found</h3>
      </div>
    );
  }
  const long = parseFloat(viewer.property.location.split(':')[0]);
  const lat = parseFloat(viewer.property.location.split(':')[1]);

  return (
    <div className="propertyDetails">
      <div className="column-1">
        <h1>Property</h1>
        <h2>Address: {viewer.property.address}</h2>
      </div>
      <div className="column-3">
        <PropertyMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div />}
          containerElement={<div className="containerElement" />}
          mapElement={<div className="mapElement" />}
          lat={lat}
          long={long}
        />
      </div>
    </div>
  );
}

export default Relay.createContainer(PropertyPage, {
  initialVariables: {
    propertyID: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        property(propertyID: $propertyID) {
          address, location
        }
      }
    `,
  },
});

PropertyPage.propTypes = {
  relay: PropTypes.object.isRequired,
  viewer: PropTypes.object.isRequired,
};
