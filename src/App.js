import "./App.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import React, { useState, useEffect } from "react";
import RatingForm from "./components/RatingForm";
import BenchForm from "./components/BenchForm";
import axios from "axios";

export const URL = "http://127.0.0.1:8000/";

function App() {
  const [benchRefresh, refreshBenches] = useState(null);
  const [benchList, updateBenchList] = useState([]);

  useEffect(() => {
    axios
      .get(URL + "benches/")
      .then((response) => {
        updateBenchList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [benchRefresh]);

  // sets bench to be displayed on info sheet
  const [currentBench, setBench] = useState(null);
  const [avgBenchInfo, setAvgInfo] = useState([]);
  const setInfoBoard = (benchID) => {
    setBench(benchID);
  };

  useEffect(() => {
    if (currentBench)
      axios
        .get(URL + "benches/" + currentBench + "/benchstats/")
        .then((response) => {
          setAvgInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [currentBench]);

  // shows and hids rating form
  const [ratingFormSwitch, setRatingFormSwitch] = useState(false);
  const toggleRatingFormSwitch = () => {
    setRatingFormSwitch(!ratingFormSwitch);
  };

  // submits rating on specified bench
  const submitRating = (rating) => {
    axios
      .post(URL + "ratings/", {
        bench: currentBench,
        view: rating["view"],
        seclusion: rating["seclusion"],
        squirrels: rating["squirrels"],
        accesibility: rating["accesibility"],
      })
      .then((response) => {
        setRatingFormSwitch(false);
        console.log(response);
        console.log(benchList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // enters into add bench mode
  const [newBenchMode, setNewBenchMode] = useState(false);
  const toggleNewBenchMode = () => {
    setNewBenchMode(!newBenchMode);
  };

  const submitBench = (bench) => {
    axios
      .post(URL + "benches/", {
        lat: bench["lat"].toFixed(6),
        long: bench["long"].toFixed(6),
      })
      .then((response) => {
        toggleNewBenchMode();
        console.log(response);
        refreshBenches(() => !benchRefresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // creates all the markers
  const allMarkers = benchList.map((marker) => {
    return (
      <Marker
        key={marker.id}
        position={[marker.lat, marker.long]}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [20, 41],
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

      <div id="left-side">
        <img
          src={require("./assets/default-bench.png")}
          alt="A Bench"
          id="logo"
        ></img>
        <div id="sub-heading">BENCHMARK</div>
        <button
          type="button"
          onClick={() => {
            toggleNewBenchMode();
          }}
          id="add-bench"
        >
          ADD BENCH
        </button>

        <div id="rating-labels" className="info">
          <img src={require("./assets/mountain-light.png")} alt="view"></img>
          <img src={require("./assets/crowd-light.png")} alt="view"></img>
          <img
            src={require("./assets/squirrel-light.png")}
            alt="squirrel"
          ></img>
          <img
            src={require("./assets/hike-light.png")}
            alt="accesibility"
          ></img>
        </div>

        {/* pop up info sheet compoannt  */}
        {currentBench && (
          <div id="info-sheet" className="info">
            <button
              id="close-button"
              type="button"
              onClick={() => {
                setInfoBoard(null);
                setAvgInfo([]);
                setRatingFormSwitch(false);
              }}
            >
              X
            </button>
            <div id="average-ratings">
              <div id="letter format">
                <div className="nine" id="avgview">
                  <div className="bleh">{avgBenchInfo["view__avg"]}</div>
                </div>
                <div className="nine" id="avgseclusion">
                  <div className="bleh">{avgBenchInfo["seclusion__avg"]}</div>
                </div>
                <div className="nine" id="avgsqurels">
                  <div className="bleh">{avgBenchInfo["squirrels__avg"]}</div>
                </div>
                <div className="nine" id="avgaccesibility">
                  <div className="bleh">
                    {avgBenchInfo["accesibility__avg"]}
                  </div>
                </div>
              </div>
            </div>

            <button
              id="rating-button"
              type="button"
              onClick={() => {
                toggleRatingFormSwitch();
              }}
            >
              RATE
            </button>
            {ratingFormSwitch && <RatingForm onSubmit={submitRating} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
