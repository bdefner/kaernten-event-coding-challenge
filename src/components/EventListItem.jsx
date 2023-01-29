import moment from 'moment-timezone';
import { useState } from 'react';
import iconCalendar from '../../public/icons/calendar.png';
import iconPin from '../../public/icons/pin.png';
import Button from './Button';

function handleIcsDownload(props) {
  // Convert the date strings to valid timezone identifiers
  const startDate = moment
    .tz(props.startDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'UTC')
    .format('YYYYMMDDTHHmmss');
  const endDate = moment
    .tz(props.endDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'UTC')
    .format('YYYYMMDDTHHmmss');
  const timezone = 'Europe/Vienna';

  // Create the .ics file content
  const icsData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${props.title}
DTSTART;TZID=${timezone}:${startDate}
DTEND;TZID=${timezone}:${endDate}
LOCATION:${props.location}
END:VEVENT
END:VCALENDAR`;

  // Create a Blob object with the .ics file content
  const blob = new Blob([icsData], { type: 'text/calendar' });

  // Create a URL for the Blob object
  const url = URL.createObjectURL(blob);

  // Create an a element
  const a = document.createElement('a');
  a.href = url;
  a.download = `${props.title}.ics`;

  // Simulate a click on the a element to trigger the download
  a.click();
}

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
          {/* onClick={() => history.push(`/event/${props.title}`)} */}
          {!isCollapsed && (
            <div>
              <Button
                type="iconLink"
                iconType="open"
                span={''}
                text={'als Seite öffnen'}
              />
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div dangerouslySetInnerHTML={{ __html: props.description }} />
        )}
      </div>
    </div>
  );
}
