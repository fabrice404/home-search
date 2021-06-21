import PropTypes from 'prop-types';
import {
  MapContainer, TileLayer,
  Marker, Tooltip,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import {
  getScoringColor, SCORE_GREEN, SCORE_RED, SCORE_YELLOW,
} from '../lib/color';

const icon = new Icon({
  iconUrl: './pixel.png',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});
const Map = ({ daft, setMap }) => {
  let map;

  const [green, setGreen] = useState(true);
  const [yellow, setYellow] = useState(true);
  const [red, setRed] = useState(true);

  const getTooltipOpacity = (score) => {
    if (score >= SCORE_GREEN) {
      return 1;
    }
    if (score >= SCORE_YELLOW) {
      return 0.7;
    }
    if (score >= SCORE_RED) {
      return 0.5;
    }
    return 0;
  };

  const mapLoaded = (m) => {
    if (m) {
      map = m;
      setMap(map);
    }
  };

  return (
    <MapContainer
      center={[53.29, -6.45]}
      zoom={10}
      className="h-screen"
      whenCreated={mapLoaded}
    >
      <div className="absolute top-5 right-5 z-1000">
        <button type="button" className={getScoringColor(-1)} onClick={() => { if (map) { map.flyTo([53.29, -6.5], 9); } }}>
          <FontAwesomeIcon icon={faMapMarker} />
        </button>
        <button type="button" className={getScoringColor(green ? SCORE_GREEN : -1)} onClick={() => setGreen(!green)}>{`${SCORE_GREEN}+`}</button>
        <button type="button" className={getScoringColor(yellow ? SCORE_YELLOW : -1)} onClick={() => setYellow(!yellow)}>{`${SCORE_YELLOW}+`}</button>
        <button type="button" className={getScoringColor(red ? SCORE_RED : -1)} onClick={() => setRed(!red)}>{`${SCORE_RED}+`}</button>
      </div>
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
      />
      {
        daft
          .filter((property) => ((green && property.scoring.total >= SCORE_GREEN)
            || (yellow
              && property.scoring.total >= SCORE_YELLOW
              && property.scoring.total < SCORE_GREEN)
            || (red
              && property.scoring.total >= SCORE_RED
              && property.scoring.total < SCORE_YELLOW)))
          .sort((a, b) => a.scoring.total - b.scoring.total)
          .map((property) => (
            <Marker
              key={property.id}
              position={[property.lat, property.lng]}
              icon={icon}
              eventHandlers={{
                click: () => {
                  document.querySelector(`#property${property.id}`).scrollIntoView();
                  window.scrollBy(0, -40);
                  if (map) {
                    map.flyTo([property.lat, property.lng], 16);
                  }
                },
              }}
            >
              <Tooltip
                direction="top"
                className="text-center"
                opacity={getTooltipOpacity(property.scoring.total)}
                permanent
              >
                <span className={getScoringColor(property.scoring.total)}>
                  {property.scoring.total}
                </span>
                <div className="text-sm">{property.abbreviatedPrice}</div>
              </Tooltip>
            </Marker>
          ))
      }
    </MapContainer>
  );
};

Map.propTypes = {
  daft: PropTypes.arrayOf(PropTypes.object).isRequired,
  setMap: PropTypes.func.isRequired,
};

export default Map;
