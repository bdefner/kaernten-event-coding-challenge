import '../../styles/elementsStyles.css';
import searchIcon from '../../public/icons/search.png';

export default function SearchButton(props) {
  return (
    <div className="button searchButton">
      <img src={searchIcon} alt="" className="icon" />
      <p>Suche</p>
    </div>
  );
}
