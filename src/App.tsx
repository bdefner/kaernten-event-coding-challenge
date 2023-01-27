import '../styles/globalStyles.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, Outlet, Route, Routes, useParams } from 'react-router-dom';
import Header from './components/Header';

const PersonPage = () => {
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
      {!isLoading && (
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
};

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="event/:Id" element={<PersonPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch('https://swapi.dev/api/people/', {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log('data: ', data);

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        data.map((person, index) => {
          return (
            <h5 key={index}>
              <Link to={`/event/${index + 1}`}>{person.name}'s Page</Link>
            </h5>
          );
        })
      )}
    </>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>404 - Nothing to see here!</h2>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
}
