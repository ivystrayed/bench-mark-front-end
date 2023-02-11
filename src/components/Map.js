import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'



const Map = (props) => {
     
    const allMarkers = props.markers.map((marker) => {
      
        return (
              <Marker 
                key={marker.id} 
                position={[marker.long, marker.lat]} 
                icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
                eventHandlers={{click: props.onClick}}
              >
                  <Popup>
                      its a bench <br /> yeah
                  </Popup>
              </Marker>
          );  
      })
      
      return (
          <MapContainer center={[47.6062, -122.3321]} zoom={12} scrollWheelZoom={true} id='map'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <div>
              {allMarkers}
            </div>
          </MapContainer>)
}

Map.propTypes = {
    markers : PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        img: PropTypes.any.isRequired,
        long: PropTypes.number.isRequired,
        lat:  PropTypes.number.isRequired,
      })
    ),
    onClick: PropTypes.func.isRequired,
    }
        


export default Map
