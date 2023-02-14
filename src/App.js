import "./App.css";
import data from "./dummidata.json";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import React, { useState } from "react";
import RatingForm from "./components/RatingForm";
import BenchForm from "./components/BenchForm";
import axios from "axios";

function App() {
  // need a function to create the average rating to send with POST requests

  // sets bench to be displayed on info sheet
  const [currentBench, setBench] = useState(null);
  const setInfoBoard = (benchID) => {
    setBench(benchID);
  };

  // shows and hidese rating form
  const [ratingFormSwitch, setRatingFormSwitch] = useState(false);
  const toggleRatingFormSwitch = () => {
    setRatingFormSwitch(!ratingFormSwitch);
  };

  // enters into add bench mode
  const [newBenchMode, setNewBenchMode] = useState(false);
  const toggleNewBenchMode = () => {
    setNewBenchMode(!newBenchMode);
  };

  // submits rating on specified bench
  const submitRating = (rating) => {
    console.log(rating);
    setRatingFormSwitch(false);
  };

  const submitBench = (bench) => {
    console.log(bench);
    setNewBenchMode(false);
  };

  // creates all the markers
  const allMarkers = data.map((marker) => {
    return (
      <Marker
        key={marker.id}
        position={[marker.long, marker.lat]}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
        eventHandlers={{
          click: () => {
            setInfoBoard(marker.id);
          },
        }}
      />
    );
  });

  return (
    <div className="App">
      {/* left side bar for forms and sort*/}

      {/* Map Componant */}
      <MapContainer
        center={[47.6062, -122.3321]}
        zoom={12}
        scrollWheelZoom={true}
        id="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div>{allMarkers}</div>

        {newBenchMode && <BenchForm onSubmit={submitBench} />}
      </MapContainer>

      <button
        type="button"
        onClick={() => {
          toggleNewBenchMode();
        }}
        id="add-bench"
      >
        ADD BENCH
      </button>

      {/* pop up info sheet compoannt  */}
      {currentBench && (
        <div id="info-sheet">
          <button
            type="button"
            onClick={() => {
              setInfoBoard(null);
              setRatingFormSwitch(false);
            }}
          >
            close
          </button>
          <div>
            <div id="bench-image">{/* image needs to go here */}</div>
          </div>
          <div id="average-ratings">{/* each of the ratings */}</div>
          <button type="button" onClick={() => toggleRatingFormSwitch()}>
            Add Rating
          </button>
          {ratingFormSwitch && <RatingForm onSubmit={submitRating} />}
        </div>
      )}
    </div>
  );
}

export default App;

// const Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	subdomains: 'abcd',
// 	minZoom: 1,
// 	maxZoom: 16,
// 	ext: 'jpg'
// });
