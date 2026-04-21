const MapMarkerImage = ({ number = 1, active }) => {
  const imgUrl = `url("../../../../public/images/map/MapMarkers${active?"Over":""}.png")`;

  let offsetY = number % 10 - 1;
  let offsetX = Math.floor(number / 10);
  offsetX = offsetY < 0 ? offsetX - 1 : offsetX;
  offsetY =  offsetY < 0 ? offsetY + 10 : offsetY;
  
  const imageStyle = {
    backgroundImage: imgUrl,
    height: "48px",
    width: "48px",
    backgroundPosition: `-${48 * offsetX}px -${48 * offsetY}px`
  }

  return (
    <image style={imageStyle}/>
  )
}

export default MapMarkerImage;
