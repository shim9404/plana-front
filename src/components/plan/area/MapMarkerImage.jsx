import MapMarkersImg from '../../../assets/images/map/MapMarkers.png';
import MapMarkersOverImg from '../../../assets/images/map/MapMarkersOver.png';


const MapMarkerImage = ({ number = 1, active }) => {
  const imgUrl = `url(${active ? MapMarkersOverImg : MapMarkersImg})`;

  let offsetY = number % 10 - 1;
  let offsetX = Math.floor(number / 10);
  offsetX = offsetY < 0 ? offsetX - 1 : offsetX;
  offsetY =  offsetY < 0 ? offsetY + 10 : offsetY;
  
  const imageStyle = {
    backgroundImage: imgUrl,
    height: "48px",
    width: "48px",
    backgroundPosition: `-${48 * offsetX}px -${48 * offsetY}px`,
    backgroundSize: "auto",
    backgroundRepeat: "no-repeat",
    border: "none"
  }

  return (
    <div style={imageStyle}/>
  )
}

export default MapMarkerImage;
