import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/Map.module.css';
import { tooltipStyle, animDivStyle, mapStyle, siguStyle, slideVariants, zdoStyle } from '../../styles/homeStyles.js';

//#region SVG 임포트
import Total from '../../assets/images/svg/regions/SouthKorea.svg?react';
import Seoul from '../../assets/images/svg/regions/Seoul.svg?react';
import Busan from '../../assets/images/svg/regions/Busan.svg?react';
import Daegu from '../../assets/images/svg/regions/Daegu.svg?react';
import Incheon from '../../assets/images/svg/regions/Incheon.svg?react';
import Gwangju from '../../assets/images/svg/regions/Gwangju.svg?react';
import Daejeon from '../../assets/images/svg/regions/Daejeon.svg?react';
import Ulsan from '../../assets/images/svg/regions/Ulsan.svg?react';
import Sejong from '../../assets/images/svg/regions/Sejong.svg?react';
import Gyeonggi from '../../assets/images/svg/regions/Gyeonggi.svg?react';
import Gangwon from '../../assets/images/svg/regions/Gangwon.svg?react';
import Chungbuk from '../../assets/images/svg/regions/Chungbuk.svg?react';
import Chungnam from '../../assets/images/svg/regions/Chungnam.svg?react';
import Jeonbuk from '../../assets/images/svg/regions/Jeonbuk.svg?react';
import Jeonnam from '../../assets/images/svg/regions/Jeonnam.svg?react';
import Gyeongbuk from '../../assets/images/svg/regions/Gyeongbuk.svg?react';
import Gyeongnam from '../../assets/images/svg/regions/Gyeongnam.svg?react';
import Jeju from '../../assets/images/svg/regions/Jeju.svg?react';
import { useRegion } from '../../hooks/home/RegionContext.jsx';
import { useTripRegion } from '../../hooks/trip/TripRegionContext.jsx';
//#endregion

// svg파일과 regionId 매칭
const SIGU_MAPS = {
  '11': Seoul,
  '21': Busan,
  '22': Daegu,
  '23': Incheon,
  '24': Gwangju,
  '25': Daejeon,
  '26': Ulsan,
  '29': Sejong,
  '31': Gyeonggi,
  '32': Gangwon,
  '33': Chungbuk,
  '34': Chungnam,
  '35': Jeonbuk,
  '36': Jeonnam,
  '37': Gyeongbuk,
  '38': Gyeongnam,
  '39': Jeju
};

function Map() {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, name: '' }); // 툴팁 정보

  const { selectedZdo, setSelectedZdo, selectedSigu, setSelectedSigu } = useTripRegion();
  const { regionData } = useRegion();
  const { regionMap } = regionData;

  const ActiveMap = SIGU_MAPS[selectedZdo] || Total;  // svg파일

  const GetIsTotalView = () => {
    return selectedZdo == null || selectedZdo === ""
  }

  // 시군구 선택 시 색상 조정
  useEffect(() => {
    if (selectedSigu == null) return;

    const el = document.getElementById(String(selectedSigu));
    if (el) el.classList.add('selected');

    return () => {
      if (el) el.classList.remove('selected');
    };
  }, [selectedSigu]);



  //#region 마우스 이벤트
  const onMouseMove = (e) => {
    if (regionMap == null) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const regionName = regionMap[e.target.id];
    if (regionName) {
      setTooltip({
        visible: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 20,
        name: regionName
      });
    } else {
      setTooltip(prev => ({ ...prev, visible: false }));
    }
  };

  const onMouseLeaveMap = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const onClick = (e) => {
    const id = e.target.id; // 숫자 코드 (예: "32")

    if (GetIsTotalView() && SIGU_MAPS[id]) {  // 시도
      setSelectedZdo(id);
      setSelectedSigu(`${id}000`);
    } else if (!GetIsTotalView() && id) { // 시군구
      setSelectedSigu(id);
    }
  }
  //#endregion


  return (
    <div
      style={mapStyle}
      className={styles.mapContainer}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeaveMap}>
      {/* Map */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedZdo} // key가 바뀌어야 애니메이션이 작동함
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          style={animDivStyle}
        >
          <ActiveMap
            onClick={onClick}
            style={GetIsTotalView() ? zdoStyle : siguStyle}
          />
        </motion.div>
      </AnimatePresence>
      {/* Tooltip */}
      <AnimatePresence>
        {tooltip.visible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={tooltipStyle(tooltip)}
          >
            {tooltip.name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default Map;