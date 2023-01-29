import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingAnimation from '../components/LoadingAnimation';

export default function EventPage(props) {
  const params = useParams();

  console.log('params.Id: ', params.Id);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${params.Id}`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
        console.log(`https://swapi.dev/api/people/${params.Id}`);
      })
      .catch((error) => console.log(error));
  }, [params.Id]);

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <h1>Name: {data.name}</h1>
          <h2>Height: {data.height}</h2>
          <h2>Mass: {data.mass}</h2>
          <h2>Hair Color: {data.hair_color}</h2>
          <h2>Skin Color: {data.skin_color}</h2>
          <h2>Eye Color: {data.eye_color}</h2>
          <h2>Birth Year: {data.birth_year}</h2>
          <h2>Gender: {data.gender}</h2>
          <Link to="/">Back to homepage</Link>
        </>
      )}
    </>
  );
}
