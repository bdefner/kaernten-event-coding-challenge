import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import LoadingAnimation from '../components/LoadingAnimation';

async function reduceData(data) {
  const events = data['@graph'].map((item) => {
    return item.name;
  });

  return events;
}

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [eventData, setEventData] = useState();
  const [testData, setTestData] = useState();

  useEffect(() => {
    fetch(
      'https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image&token=9962098a5f6c6ae8d16ad5aba95afee0',
      {},
    )
      .then((response) => response.json())
      .then((response) => {
        setEventData(response);
        setIsLoading(false);
      })
      .then(() => {
        console.log('eventData', eventData);
        setTestData(reduceData(eventData));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Hero
        slogan="Da ist was los!"
        text="Alle Events in Kärnten auf einen Blick"
      />
      {isLoading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        <>
          <p>ready</p>
          {console.log(
            'eventData["@graph"]',
            eventData['@graph'].map((item, index) => {
              return item.name;
            }),
          )}
          {eventData['@graph'].map((item, index) => {
            return (
              <div kex={index}>
                <p>{item.name}</p>
              </div>
            );
          })}
        </>

        // data.map((person, index) => {
        //   return (
        //     <h5 key={index}>
        //       <Link to={`/event/${index + 1}`}>{person.name}'s Page</Link>
        //     </h5>
        // );
        // })
      )}
    </>
  );
}
