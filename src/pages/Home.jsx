import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import EventListItem from '../components/EventListItem';
import Hero from '../components/Hero';
import LoadingAnimation from '../components/LoadingAnimation';

const ScrollingList = ({ items }) => {
  const [visibleItems, setVisibleItems] = useState(items.slice(0, 10));

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const currentBottom = scrollTop + clientHeight;
      const maxBottom = scrollHeight - clientHeight;
      const shouldFetchMore = currentBottom >= maxBottom;
      if (shouldFetchMore) {
        setVisibleItems((prevItems) => [
          ...prevItems,
          ...items.slice(prevItems.length, prevItems.length + 10),
        ]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  return (
    <div>
      {visibleItems.map((item, index) => (
        <div key={index}>
          <EventListItem
            title={item.name}
            thumbnailUrl={item.image[0].thumbnailUrl}
            caption={item.image[0].caption}
            startDate={'2023-01-28T20:00:00.000+01:00'}
            endDate={'2023-01-28T20:00:00.000+01:00'}
            description={item.description}
            slug={item['dc:slug']}
          />
        </div>
      ))}
    </div>
  );
};

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState();
  const [currentEndpoint, setCurrentEndpoint] = useState(
    'https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image&token=9962098a5f6c6ae8d16ad5aba95afee0',
  );

  function loadNewDataAndScrollToTop(prevOrNext) {
    if (eventData && eventData.links[prevOrNext]) {
      setEventData(null);
      setCurrentEndpoint(
        eventData &&
          eventData.links &&
          eventData.links[prevOrNext] &&
          eventData.links[prevOrNext].toString(),
      );
    }
    window.scrollTo({
      top: document.getElementById('top-of-scroll-list').offsetTop,
      behavior: 'smooth',
    });
  }
  useEffect(() => {
    setIsLoading(true);
    fetch(currentEndpoint, {})
      .then((response) => response.json())
      .then((response) => {
        setEventData(response);
        setIsLoading(false);
      })
      .then(() => {
        console.log('eventData', eventData);
      })
      .catch((error) => console.log(error));
  }, [currentEndpoint]);

  return (
    <>
      <Hero
        slogan="Da ist was los!"
        text="Alle Events in Kärnten auf einen Blick"
      />
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          <LoadingAnimation />
        </div>
      ) : (
        <div id="top-of-scroll-list">
          {!isLoading && eventData && eventData['@graph'] && (
            <ScrollingList items={eventData['@graph']} />
          )}
          <div className="margin-top-bottom flex-row-center">
            {eventData && eventData.links && eventData.links.prev && (
              <div
                className="load-new"
                onClick={() => {
                  loadNewDataAndScrollToTop('prev');
                }}
              >
                <Button type="greenPrimary" span={''} text={'vorherige'} />
              </div>
            )}
            {eventData && eventData.links && eventData.links.next && (
              <div
                className="load-new"
                onClick={() => {
                  loadNewDataAndScrollToTop('next');
                }}
              >
                <Button type="bluePrimary" span={''} text={'weitere'} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
