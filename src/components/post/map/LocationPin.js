import React from 'react';
import { BsFillGeoAltFill } from 'react-icons/bs';

function LocationPin({ locationName }) {
  return (
    <div className="pin">
      <BsFillGeoAltFill />
    </div>
  );
}

export default LocationPin;
