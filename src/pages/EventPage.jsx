import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import loadingAnimationMin from '../../public/icons/loading-min.gif';
import handleIcsDownload from '../../utils/handleIcsDownload';
import Button from '../components/Button';
import LoadingAnimation from '../components/LoadingAnimation';

export default function EventPage(props) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get('id');
  const token = query.get('token');

  console.log('id: ', id);
  console.log('token: ', token);

  const [isLoading, setIsLoading] = useState(true);
  const [imageIsLoading, setImageIsLoading] = useState(true);
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
      const imageId = eventData['@graph'][0].image[0]['@id'];
      setEndpointForImageData(
        `https://data.carinthia.com/api/v4/universal/${imageId}?token=${token}`,
      );
      fetch(endpointForImageData, {})
        .then((response) => response.json())
        .then((response) => {
          setImageData(response);
        })
        .then(() => {
          setImageIsLoading(false);
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
              {imageIsLoading && (
                <div className="image-loading-animation-wrap">
                  <img
                    src={loadingAnimationMin}
                    alt=""
                    className="loading-animation-min"
                  />
                </div>
              )}

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
              <div className="event-page-menu-wrap">
                <Link to="/" className="link-component-wrap">
                  <Button type="bluePrimary" text="zurück" />
                </Link>
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
              </div>
              <div
                className="event-page-description-wrap"
                dangerouslySetInnerHTML={{
                  __html: eventData['@graph'][0].description,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
