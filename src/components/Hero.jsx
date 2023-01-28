import '../../styles/globalStyles.css';
import '../../styles/elementsStyles.css';
import heroImage from '../../public/hero-image.jpeg';
import KaerntenLogo from '../../public/kaernten-logo.png';

export default function Hero(props) {
  return (
    <>
      <div className="hero-image-wrap">
        <img src={heroImage} alt="" className="darken-image" />
        <div style={{ position: 'absolute', color: 'white', zIndex: '1' }}>
          <span className="hero-span textShadow" style={{}}>
            {props.slogan}
          </span>
          <p className="hero-text textShadow">{props.text}</p>
        </div>
        <img
          src={KaerntenLogo}
          alt="Logo Kärnten Tourismus"
          className="kaernten-logo"
        />
      </div>
    </>
  );
}
