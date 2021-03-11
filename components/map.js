import { Icon } from 'leaflet';
import PropTypes from 'prop-types';
import {
  MapContainer, TileLayer, Marker, Tooltip,
} from 'react-leaflet';
import { getScoringColor } from '../lib/color';

const getTooltipOpacity = (score) => {
  if (score >= 400) {
    return 1;
  }
  if (score >= 300) {
    return 0.7;
  }
  return 0.5;
};

const icon = new Icon({
  iconUrl: './pixel.png',
  iconSize: [1, 1],
  iconAnchor: [1, 1],
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

const Map = ({ daft, setMap }) => (
  <MapContainer
    center={[53.29, -6.2]}
    zoom={11}
    className="h-screen"
    whenCreated={setMap}
  >
    <TileLayer
      attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
      daft
        .filter((property) => property.scoring.total > 200)
        .sort((a, b) => a.scoring.total - b.scoring.total)
        .map((property) => (
          <Marker
            position={[property.lat, property.lng]}
            icon={icon}
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

Map.propTypes = {
  daft: PropTypes.arrayOf(PropTypes.object).isRequired,
  setMap: PropTypes.func.isRequired,
};

export default Map;
