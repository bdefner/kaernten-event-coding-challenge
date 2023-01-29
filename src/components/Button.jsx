import downloadIcon from '../../public/icons/download.png';
import openIcon from '../../public/icons/open.png';

export default function Button(props) {
  const icon = (type) => {
    switch (type) {
      case 'open':
        return openIcon;
        break;

      case 'download':
        return downloadIcon;
        break;

      default:
        return '';
    }
  };

  return (
    <div className={`button ${props.type}`}>
      {props.type === 'iconLink' && (
        <img src={icon(props.iconType)} alt="" style={{ height: '12px' }} />
      )}
      {props.span && <span>{props.span}</span>}
      <p>{props.text}</p>
    </div>
  );
}
