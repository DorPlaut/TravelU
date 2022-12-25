import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin';

function Map({ mapLocayion, locationName }) {
  const defaultProps = {
    center: mapLocayion,
    zoom: 12,
  };
  return (
    <div>
      <div style={{ height: '10rem', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_KEY + '&libraries=places',
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <LocationPin
            lat={mapLocayion.lat}
            lng={mapLocayion.lng}
            locationName={locationName}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default Map;
