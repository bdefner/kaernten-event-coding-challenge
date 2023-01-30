import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import grid from '../../public/icons/grid.png';
import list from '../../public/icons/list.png';
import Button from '../components/Button';
import EventListItem from '../components/EventListItem';
import FilterItem from '../components/FilterItem';
import Hero from '../components/Hero';
import LoadingAnimation from '../components/LoadingAnimation';

const ScrollingList = ({ items, token }) => {
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
            id={item['@id']}
            title={item.name}
            thumbnailUrl={item.image[0].thumbnailUrl}
            caption={item.image[0].caption}
            startDate={item.startDate}
            endDate={item.endDate}
            description={item.description}
            slug={item['dc:slug']}
            token={token}
            locationId={item.location[0]['@id']}
          />
        </div>
      ))}
    </div>
  );
};

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [displayListFiler, setDisplayListFilter] = useState('expand-list');
  const [locationFilter, setLocationFilter] = useState();
  const [dateFilter, setDateFilter] = useState();
  const [eventData, setEventData] = useState();
  const [currentEndpoint, setCurrentEndpoint] = useState(
    'https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image&token=9962098a5f6c6ae8d16ad5aba95afee0',
  );

  const token = '9962098a5f6c6ae8d16ad5aba95afee0';
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
      top: document.getElementById('top').offsetTop,
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
      <div className="slogan-wrap" id="top">
        <p className="slogan">
          <span>{`Es gibt immer `}</span>was zu erleben!
        </p>
        <p className="slogan">
          Kärnten.
          <span>{` It's my life!`}</span>
        </p>
      </div>
      <div className="filter-row-wrap">
        <div className="filter-selection-wrap">
          <div onClick={() => setDisplayListFilter('expand-list')}>
            <FilterItem
              icon={list}
              active={displayListFiler === 'expand-list' && true}
            />
          </div>
          <div onClick={() => setDisplayListFilter('list')}>
            <FilterItem
              icon={grid}
              active={displayListFiler === 'list' && true}
            />
          </div>
        </div>
        <div className="filter-selection-wrap">
          <div onClick={() => setLocationFilter('')}>
            <FilterItem text="Ganz Kärnten" active={!locationFilter && true} />
          </div>
          <div div onClick={() => setLocationFilter('Klagenfurt')}>
            <FilterItem
              text="Klagenfurt"
              active={locationFilter === 'Klagenfurt' && true}
            />
          </div>
        </div>
        <div className="filter-selection-wrap">
          <div div onClick={() => setDateFilter('')}>
            <FilterItem text="Ab heute" active={!dateFilter && true} />
          </div>
          <div onClick={() => setDateFilter('weekend')}>
            <FilterItem
              text="Dieses Wochenende"
              active={dateFilter === 'weekend' && true}
            />
          </div>
        </div>
      </div>
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
            <ScrollingList items={eventData['@graph']} token={token} />
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
