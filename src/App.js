
import './App.css';
import data from './dummidata.json'
import { MapContainer, TileLayer, Marker,} from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import React, {useState} from 'react';

function App() {
  
  // need a function to create the average rating to send with POST requests
  

  

  const [currentBench, setBench] = useState(null)

  const setInfoBoard = (benchID) => {
    setBench(benchID)
  }




 
  const allMarkers = data.map((marker) => {
    
    return (
          <Marker 
            key={marker.id} 
            position={[marker.long, marker.lat]} 
            icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
            eventHandlers={{
              click: () => {
                setInfoBoard(marker.id)
                console.log('marker clicked')
              }
            }}
            />
      );  
  })
  
  return (
    <div className='App'>
      
      {/* Map Componant */}
      <MapContainer center={[47.6062, -122.3321]} zoom={12} scrollWheelZoom={true} id='map'>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div>
          {allMarkers}
        </div>

      </MapContainer>     
      
      {/* pop up info sheet compoannt  */}
      {currentBench && (
        <div id='info-sheet'>
          <div>
            {currentBench}
          </div>
          <button type='button' onClick={() => setInfoBoard(null)}>
            close
          </button>
        </div>
      )}

    </div>
      
  )
}


export default App;


// const Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	subdomains: 'abcd',
// 	minZoom: 1,
// 	maxZoom: 16,
// 	ext: 'jpg'
// });