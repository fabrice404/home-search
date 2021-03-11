import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBath, faBed, faTrain, faEuroSign, faHome, faPlug, faCity, faLayerGroup, faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { getScoringColor } from '../lib/color';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const formatDistanceM = (distance) => Math.round(distance / 100) / 10;

const formatDistanceKm = (distance) => Math.round(distance * 10) / 10;

const formatSecondsToMinutes = (s) => `${Math.round(s / 60)} min`;

const formatPrice = (price) => {
  let formated = '';
  const r = `${price}`.split('').reverse();
  for (let i = 0; i < r.length; i += 1) {
    if (i > 0 && i % 3 === 0) {
      formated = `.${formated}`;
    }
    formated = `${r[i]}${formated}`;
  }
  return formated;
};

const List = ({ daft, getMap }) => {
  const centerMap = (point) => {
    getMap().flyTo(point.coordinates.reverse(), 16);
  };

  return (
    <table className="border-collapse table-auto w-full">
      <thead>
        <tr>
          <th className="sticky top-0 bg-gray-800 p-2 text-white">Photo</th>
          <th className="sticky top-0 bg-gray-800 p-2 text-white text-left">Address</th>
          <th className="sticky top-0 bg-gray-800 p-2 text-white">
            <FontAwesomeIcon icon={faHome} />
          </th>
          <th className="sticky top-0 bg-gray-800 p-2 text-white">
            <FontAwesomeIcon icon={faEuroSign} />
          </th>
          <th className="sticky top-0 bg-gray-800 p-2 text-white">
            <FontAwesomeIcon icon={faLayerGroup} />
          </th>
          <th className="sticky top-0 bg-gray-800 p-2 text-white">
            <FontAwesomeIcon icon={faBed} />
          </th>
          <th className="sticky top-0 bg-gray-800 p-2 text-white">
            <FontAwesomeIcon icon={faBath} />
          </th>
          <th className="sticky top-0 bg-gray-800 p-2 text-white">
            <FontAwesomeIcon icon={faPlug} />
          </th>
          <th className="sticky top-0 bg-gray-800 p-2 text-white">
            <FontAwesomeIcon icon={faCity} />
          </th>
          <th className="sticky top-0 bg-gray-800 p-2 text-white">
            <FontAwesomeIcon icon={faTrain} />
          </th>
          <th className="sticky top-0 bg-gray-800 p-2 text-white">
            Score&nbsp;
            <FontAwesomeIcon icon={faCaretDown} />
          </th>
        </tr>
      </thead>
      {
        daft
          .sort((a, b) => b.scoring.total - a.scoring.total)
          .map((property) => (
            <tbody key={`${property.id}`}>
              <tr id={`${property.id}`}>
                <td className="border-t-2 border-gray-200 text-center center" rowSpan="2">
                  <a href={`https://www.daft.ie${property.seoFriendlyPath}`} target="daft">
                    <img src={property.image} alt={`${property.title}`} className="inline" width="150" />
                  </a>
                </td>
                <td className="border-t-2 border-gray-200 whitespace-pre">
                  <a href={`https://www.daft.ie${property.seoFriendlyPath}`} target="daft">{property.title.replace(/, /gi, '\n')}</a>
                </td>
                <td className="border-t-2 border-gray-200 bg-gray-50 text-center whitespace-pre">{property.propertyType.replace(/ /gi, '\n')}</td>
                <td className="border-t-2 border-gray-200 text-center">
                  {formatPrice(property.price)}
                  <div className="text-xs">{`${formatPrice(property.pricePerSquareMeter)} €/m²`}</div>
                </td>
                <td className="border-t-2 border-gray-200 bg-gray-50 text-center">{property.floorArea}</td>
                <td className="border-t-2 border-gray-200 text-center">{property.bedrooms}</td>
                <td className="border-t-2 border-gray-200 bg-gray-50 text-center">{property.bathrooms}</td>
                <td className="border-t-2 border-gray-200 text-center">{property.ber}</td>
                <td className="border-t-2 border-gray-200 bg-gray-50 text-center">{formatDistanceKm(property.distance)}</td>
                <td className="border-t-2 border-gray-200 text-center">
                  {formatDistanceM(property.transport.distance)}
                  <div className="text-xs whitespace-pre">{property.transport.name.replace(/ /gi, '\n')}</div>
                  <div className="text-xs whitespace-pre">{formatSecondsToMinutes(property.transport.duration)}</div>
                </td>
                <td className="border-t-2 border-gray-200 bg-gray-50 text-center" rowSpan="2">
                  <button
                    className={getScoringColor(property.scoring.total)}
                    onClick={() => { centerMap(property.point); }}
                    type="button"
                  >
                    {property.scoring.total}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="text-left text-xs text-gray-300">{`${formatDate(property.publishDate)}`}</td>
                <td className="text-center text-xs bg-gray-50">{property.scoring.type}</td>
                <td className="text-center text-xs">{property.scoring.price}</td>
                <td className="text-center text-xs bg-gray-50">{property.scoring.floorArea}</td>
                <td className="text-center text-xs">{property.scoring.bedrooms}</td>
                <td className="text-center text-xs bg-gray-50">{property.scoring.bathrooms}</td>
                <td className="text-center text-xs">{property.scoring.ber}</td>
                <td className="text-center text-xs bg-gray-50">{property.scoring.distance}</td>
                <td className="text-center text-xs">{property.scoring.transport}</td>
              </tr>
            </tbody>
          ))
      }
    </table>
  );
};

List.propTypes = {
  daft: PropTypes.arrayOf(PropTypes.object).isRequired,
  getMap: PropTypes.func.isRequired,
};

export default List;
