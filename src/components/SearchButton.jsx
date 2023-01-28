import '../../styles/elementsStyles.css';
import { useState } from 'react';
import searchIcon from '../../public/icons/search.png';

export default function SearchButton(props) {
  const [searchOpen, setSearchOpen] = useState(false);

  function switchSearchOpenState() {
    setSearchOpen(!searchOpen);
  }

  return (
    <div className="button searchButton">
      <div
        onClick={() => {
          switchSearchOpenState();
        }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <img
          src={searchIcon}
          alt=""
          className="icon"
          style={{ marginRight: '10px' }}
        />
        {!searchOpen && (
          <p style={{ cursor: 'inherit', margin: '0px' }}>Suche</p>
        )}
      </div>
      {searchOpen && <input />}
    </div>
  );
}
