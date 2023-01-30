import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import iconCalendar from '../../public/icons/calendar.png';
import iconPin from '../../public/icons/pin.png';
import handleIcsDownload from '../../utils/handleIcsDownload';
import Button from './Button';

function convertDateString(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
  const dateFormatted = date.toLocaleDateString('de-DE', options);
  const options2 = { hour: '2-digit', minute: '2-digit', hour12: false };
  const timeFormatted = date.toLocaleTimeString('de-DE', options2);
  return { date: dateFormatted, time: timeFormatted };
}

export default function EventListItem(props) {
  const startDate = convertDateString(props.startDate);
  const endDate = convertDateString(props.endDate);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [locationData, setLocationData] = useState();
  const [locationEndpoint, setLocationEndpoint] = useState(
    `https://data.carinthia.com/api/v4/universal/${props.locationId}?token=9962098a5f6c6ae8d16ad5aba95afee0`,
  );

  useEffect(() => {
    fetch(locationEndpoint, {})
      .then((response) => response.json())
      .then((response) => {
        setLocationData(response);
      })
      .then(() => {
        console.log('locationData', locationData);
      })
      .catch((error) => console.log(error));
  }, [locationEndpoint]);

  return (
    <div className="event-list-item-element">
      <div className="event-list-image-wrap">
        <img src={props.thumbnailUrl} alt={`Thumbnail:  ${props.caption}`} />
      </div>
      <div className="event-list-item-content-wrap">
        <h3>{props.title}</h3>
        <div style={{ display: 'flex' }}>
          <div className="event-list-item-date-wrap">
            <img src={iconCalendar} alt="" className="icon" />
            <p>{`${startDate.date} - ${startDate.time}`}</p>
          </div>
          <div
            className="event-list-item-date-wrap"
            id="location"
            onClick={() =>
              window.open(
                `https://www.openstreetmap.org/#map=18/${locationData['@graph'][0].geo.latitude}/${locationData['@graph'][0].geo.longitude}`,
              )
            }
            style={{ cursor: 'pointer' }}
          >
            {locationData &&
              locationData['@graph'] &&
              locationData['@graph'][0].address &&
              locationData['@graph'][0].address.addressLocality &&
              locationData['@graph'][0].name && (
                <>
                  <img src={iconPin} alt="" className="icon" />
                  <p>
                    {' '}
                    {locationData['@graph'][0].address.addressLocality}
                    {', '}
                    {locationData['@graph'][0].name}
                  </p>
                </>
              )}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div onClick={() => setIsCollapsed(!isCollapsed)}>
            <Button
              type="greenSecondary"
              span={isCollapsed && `mehr`}
              text={isCollapsed ? 'erfahren' : 'schließen'}
            />
          </div>
          {!isCollapsed && (
            <div
              onClick={() => {
                handleIcsDownload(props);
              }}
            >
              <Button
                type="iconLink"
                iconType="download"
                span={''}
                text={'in meinen Kalender speichern'}
              />
            </div>
          )}
          {!isCollapsed && (
            <div>
              {/* -> !!!Attention!!! This has to be improved!! I did this as a quick fix, assuming that the token is unproblematic to be exposed in the the URL, which might not be the case! Also, the URL is terrible to read. A better sollution might be using the UseContext Hook. But, from the way I build the component structure, I realized that this would need some rebuild in order to make it work, even if the URL get's accessed directly. Since this takes time, I temporarly go with this solution  */}
              <Link
                className="link-component-wrap"
                to={`/event/${props.slug}?id=${props.id}&token=${props.token}`}
              >
                <Button
                  type="iconLink"
                  iconType="open"
                  span={''}
                  text={'als Seite öffnen'}
                />
              </Link>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div
            dangerouslySetInnerHTML={{ __html: props.description }}
            className="event-list-content-wrap"
          />
        )}
      </div>
    </div>
  );
}
