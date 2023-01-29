import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import LoadingAnimation from '../components/LoadingAnimation';

export default function EventPage(props) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get('id');
  const token = query.get('token');

  console.log('id: ', id);
  console.log('token: ', token);

  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState();
  const [imageData, setImageData] = useState({});
  const [endpointForEventData, setEndpointForEventData] = useState(
    `https://data.carinthia.com/api/v4/universal/${id}?token=${token}`,
  );
  const [endpointForImageData, setEndpointForImageData] = useState('');

  // // const Endpoint = `https://data.carinthia.com/api/v4/universal/${props.id}token=${props.token}`;
  // const endpointForEventData = `https://data.carinthia.com/api/v4/universal/${id}?token=${token}`;

  useEffect(() => {
    setIsLoading(true);
    fetch(endpointForEventData, {})
      .then((response) => response.json())
      .then((response) => {
        setEventData(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [endpointForEventData]);

  useEffect(() => {
    if (eventData) {
      console.log('eventData', eventData);
      const imageId = 'cc8980ee-d067-4c4c-97ac-cf4e01e2037e';
      setEndpointForImageData(
        `https://data.carinthia.com/api/v4/universal/${imageId}?token=${token}`,
      );
      fetch(endpointForImageData, {})
        .then((response) => response.json())
        .then((response) => {
          setImageData(response);
        })
        .then(() => {
          console.log('imageData', imageData);
        });
    }
  }, [eventData]);

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="event-container" style={{ width: '100%' }}>
          <div
            className="event-page-content-wrap"
            style={{ display: 'flex', position: 'relative' }}
          >
            <div className="sticky">
              {imageData &&
                imageData['@graph'] &&
                imageData['@graph'][0] &&
                imageData['@graph'][0].contentUrl && (
                  <div className="image-wrap-event-page">
                    <img
                      src={imageData['@graph'][0].contentUrl}
                      alt={imageData['@graph'][0].name}
                    />
                  </div>
                )}
            </div>
            <div>
              <div
                className="event-page-description-wrap"
                dangerouslySetInnerHTML={{
                  __html: eventData['@graph'][0].description,
                }}
              ></div>
            </div>
          </div>

          <Link to="/">Back to homepage</Link>
        </div>
      )}
    </>
  );
}
