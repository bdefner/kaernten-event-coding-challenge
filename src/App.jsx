import '../styles/globalStyles.css';
import './fonts/gnyrwn971.ttf';
import './fonts/OpenSans.ttf';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, Outlet, Route, Routes, useParams } from 'react-router-dom';
import Header from './components/Header';
import Event from './pages/Event';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="event/:Id" element={<Event />} />
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
