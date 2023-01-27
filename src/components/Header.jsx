import '../../styles/globalStyles.css';
import '../../styles/elementsStyles.css';
import { Link } from 'react-router-dom';
import searchIcon from '../../public/icons/search.png';
import SearchButton from './SearchButton';

export default function Header(props) {
  return (
    <div className="header-wrap">
      <div className="nav-container">
        <div className="nav-wrap">
          <Link to="/" className="text-logo-wrap">
            <span>Kärnten</span>Events
          </Link>
          <nav>
            <ul>
              <li>
                <Link className="header-link">Veranstaltungen</Link>
              </li>
              <li>
                <Link className="header-link">Spielstätten</Link>
              </li>
              <li>
                <Link className="header-link">Kontakt</Link>
              </li>
            </ul>
          </nav>
        </div>

        <SearchButton />
      </div>
    </div>
  );
}
