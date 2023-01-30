import moment from 'moment-timezone';

export default function handleIcsDownload(props) {
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
