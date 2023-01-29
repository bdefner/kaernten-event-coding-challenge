import { useState } from 'react';
import iconCalendar from '../../public/icons/calendar.png';
import iconPin from '../../public/icons/pin.png';
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
          <div className="event-list-item-date-wrap">
            <img src={iconPin} alt="" className="icon" />
            <p>location</p>
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
            <Button
              type="iconLink"
              iconType="download"
              span={''}
              text={'in meinen Kalender speichern'}
            />
          )}
          {!isCollapsed && (
            <Button
              type="iconLink"
              iconType="open"
              span={''}
              text={'als Seite öffnen'}
            />
          )}
        </div>

        {!isCollapsed && (
          <div dangerouslySetInnerHTML={{ __html: props.description }} />
        )}
      </div>
    </div>
  );
}
