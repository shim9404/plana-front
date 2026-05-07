import profileMarker from '../../assets/images/profileImage/profileMarker.png';

const ProfileMarkerImage = ({ number = 1, active = 1 }) => {
  const imgUrl = `url(${profileMarker})`

  const index = number - 1;
  const col = index % 3;             // 가로
  const row = Math.floor(index / 3); // 세로
  
  const scale = 70 / 110;
  
  const common = {
    borderRadius: "12px",
    backgroundImage: imgUrl,
    backgroundRepeat: "no-repeat",
  };

  const style1 = {
    ...common,
    width: "70px",
    height: "70px",
    backgroundPosition: `-${col * 110 * scale}px -${row * 110 * scale}px`,
    backgroundSize: `${330 * scale}px ${330 * scale}px`,
    boxShadow: "0 2px 5px rgba(0,0,0,0.5)",
  };

  const style2 = {
    ...common,
    width: "110px",
    height: "110px",
    backgroundPosition: `-${col * 110}px -${row * 110}px`,
    backgroundSize: "330px 330px",
    border: "1px solid #eee"
  };

  const style = active === 2 ? style2 : style1;

  return <div style={style} />;
}

export default ProfileMarkerImage;