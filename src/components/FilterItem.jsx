export default function FilterItem(props) {
  console.log('props: ', props);
  return (
    <div className={`filter-item ${props.active && 'active'}`}>
      {props.icon && <img src={props.icon} alt="" />}
      <p>{props.text}</p>
    </div>
  );
}
