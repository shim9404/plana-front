import { useEffect, useState } from 'react';
import { motion, AnimatePresence, transform } from 'framer-motion';
import styles from '../../styles/Map.module.css';
import { tooltipStyle, animDivStyle, mapStyle, siguStyle, slideVariants, zdoStyle } from '../../styles/homeStyles.js';

//#region SVG 임포트
import Total from '../../../public/images/svg/regions/SouthKorea.svg?react';
import Seoul from '../../../public/images/svg/regions/Seoul.svg?react';
import Busan from '../../../public/images/svg/regions/Busan.svg?react';
import Daegu from '../../../public/images/svg/regions/Daegu.svg?react';
import Incheon from '../../../public/images/svg/regions/Incheon.svg?react';
import Gwangju from '../../../public/images/svg/regions/Gwangju.svg?react';
import Daejeon from '../../../public/images/svg/regions/Daejeon.svg?react';
import Ulsan from '../../../public/images/svg/regions/Ulsan.svg?react';
import Sejong from '../../../public/images/svg/regions/Sejong.svg?react';
import Gyeonggi from '../../../public/images/svg/regions/Gyeonggi.svg?react';
import Gangwon from '../../../public/images/svg/regions/Gangwon.svg?react';
import Chungbuk from '../../../public/images/svg/regions/Chungbuk.svg?react';
import Chungnam from '../../../public/images/svg/regions/Chungnam.svg?react';
import Jeonbuk from '../../../public/images/svg/regions/Jeonbuk.svg?react';
import Jeonnam from '../../../public/images/svg/regions/Jeonnam.svg?react';
import Gyeongbuk from '../../../public/images/svg/regions/Gyeongbuk.svg?react';
import Gyeongnam from '../../../public/images/svg/regions/Gyeongnam.svg?react';
import Jeju from '../../../public/images/svg/regions/Jeju.svg?react';
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
  const [currentView, setCurrentView] = useState('total'); // 현재 보고 있는 뷰 total / 32 / 31 ...
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, name: '' }); // 툴팁 정보
  const [regionMap, setRegionMap] = useState({}); // { "31": "경기도", "32": "강원도" ...

  const ActiveMap = SIGU_MAPS[currentView] || Total;  // svg파일

  const GetIsTotalView = () => {
    return currentView === 'total'
  }

  //#region 마우스 이벤트
  const onMouseMove = (e) => {
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
    console.log(id)
    if (GetIsTotalView() && SIGU_MAPS[id]) {
      setCurrentView(id);
    }
  }
  //#endregion

  // 컴포넌트 마운트 시 DB 데이터 불러오기
  useEffect(() => {
    loadDataFromDB();
  }, []);

  const loadDataFromDB = async () => {
    try {
      // const response = await axios.get('/api/regions'); 
      // 임시 데이터 (DB에서 가져온 결과라고 가정)
      const rawData = {
        "regions": [
          {
            "zdoCode": 32,
            "zdoName": "강원도",
            "sigus": [
              { "regionId": "32030", "siguName": "강릉시" },
              { "regionId": "32600", "siguName": "고성군" },
              { "regionId": "32040", "siguName": "동해시" }
            ]
          },
          {
            "zdoCode": 31,
            "zdoName": "경기도",
            "sigus": [
              { "regionId": "31570", "siguName": "가평군" }
            ]
          }
        ]
      };

      // Array를 Object로 변환: { "11": "서울특별시", ... }
      const convertRegionMap = rawData.regions.reduce((acc, region) => {
        // 1. 시도 데이터 추가 (예: "32": "강원도")
        // Key값을 문자열로 맞추기 위해 String()을 사용하거나 템플릿 리터럴을 씁니다.
        acc[String(region.zdoCode)] = region.zdoName;

        // 2. 해당 시도 안의 시군구들을 순회하며 추가 (예: "32030": "강릉시")
        region.sigus.forEach(sigu => {
          acc[sigu.regionId] = sigu.siguName;
        });

        return acc;
      }, {});

      setRegionMap(convertRegionMap);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  };


  return (
    <div
      style={mapStyle}
      className={styles.mapContainer}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeaveMap}>
      {/* Map */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView} // key가 바뀌어야 애니메이션이 작동함
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