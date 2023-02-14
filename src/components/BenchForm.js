import PropTypes from "prop-types";
import React, { useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const AddBench = (props) => {
  const map = useMap();
  const markerRef = useRef();

  const submitBench = () => {
    const marker = markerRef.current;
    const info = marker.getLatLng();

    const bench = {
      lat: info["lat"],
      long: info["lng"],
    };
    props.onSubmit(bench);
  };

  return (
    <Marker
      position={map.getCenter()}
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
      draggable="true"
      ref={markerRef}
    >
      <Popup>
        <button type="button" onClick={submitBench}>
          submit
        </button>
      </Popup>
    </Marker>
  );
};

AddBench.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddBench;
