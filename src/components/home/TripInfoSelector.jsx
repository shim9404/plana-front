import { FlexBox } from '../common/PLA_FlexBox';
import { TextButton } from '../common/PLA_Buttons';
import { useRef } from 'react';
import styles from "../../styles/TripInfoSelector.module.css";
import TripDatePicker from './TripDatePicker';
import TripRegionPicker from './TripRegionPicker';
import useProtectedNavigate from '../../hooks/useProtectedNavigate';
import { addTripApi } from '../../services/tripApi';
import authStore from '../../store/authStore';
import tripRegionStore from '../../store/trip/tripRegionStore';
import tripDateStore from '../../store/trip/tripDateStore';
import modalStore from '../../store/modalStore';

// 📌 라운지 아이콘 (UsersRoundGroup)
import { UserRoundGroup } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TripInfoSelector = ({ setHoveredId }) => {
  const selectedZdo = tripRegionStore((state) => state.selectedZdo);
  const setSelectedZdo = tripRegionStore((state) => state.setSelectedZdo);
  const selectedSigu = tripRegionStore((state) => state.selectedSigu);
  const setSelectedSigu = tripRegionStore((state) => state.setSelectedSigu);

  const confirmedDates = tripDateStore((state) => state.confirmedDates);
  const memberId = authStore((state) => state.memberId);
  const username = authStore((state) => state.username);

  const openLoginModal = modalStore((state) => state.openLoginModal);

  const protectedNavigate = useProtectedNavigate();
  const navigate = useNavigate();

  const hoverTimerRef = useRef(null);

  const cascaderValue = selectedSigu
    ? [selectedZdo, selectedSigu]
    : selectedZdo
      ? [selectedZdo]
      : undefined;

  const handleCreateTrip = async (successCallback) => {
    const data = {
      memberId: memberId,
      name: "새 여행 이름",
      startDate: confirmedDates[0]?.format("YYYY-MM-DD"),
      endDate: confirmedDates[1]?.format("YYYY-MM-DD"),
      regionId: selectedSigu
    };

    try {
      const result = await addTripApi(data);
      if (result) {
        const response = result.data;
        successCallback?.(response.tripId);
      }
    } catch (e) {
      console.error("여행 생성 실패:", e);
    }
  };

  const handleStart = () => {
    if (!memberId) {
      openLoginModal();
      return;
    }

    handleCreateTrip((tripId) => {
      protectedNavigate({ path: `/plan/${tripId}`, requireAuth: true });
    });
  };

  const handleValuesChange = (value) => {
    if (!value || value.length === 0) {
      setSelectedZdo(null);
      setSelectedSigu(null);
      return;
    }

    setSelectedZdo(value[0] ?? null);
    setSelectedSigu(value[1] ?? `${value[0]}000`);
  };

  const handleMouseEnter = (value) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setHoveredId(value);
  };

  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => {
      setHoveredId(null);
    }, 100);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
      {/* 📌 Floating 카드 박스: 좌측 고정 위치, 흰색 불투명 배경, 지도 위 뎁스(zIndex: 20) 적용 */}
<div style={{
  position: 'absolute',
  top: '45%',
  left: '25%',
  transform: 'translate(-50%, -50%)',
  
  // 📌 반응형 너비 설정
  width: '22vw',         // 뷰포트 너비의 22%로 유동적 변경
  minWidth: '340px',     // 화면이 너무 작아져도 최소 340px 이하로는 찌그러지지 않음
  maxWidth: '420px',     // 화면이 너무 커져도 최대 420px 이상으로는 늘어나지 않음
  
  backgroundColor: '#FFFFFF',
  borderRadius: '16px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  zIndex: 20,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  pointerEvents: 'auto'
}}>
        {/* 1. 상단 폼 영역 */}
        <div style={{ 
          width: '100%', 
          padding: '36px 28px 28px 28px', 
          boxSizing: 'border-box', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '24px',
          backgroundColor: '#FFFFFF' // 내부 불투명 보장
        }}>
          
          {/* 타이틀 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {username && (
              <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827' }}>
                {`${username} 님 :)`}
              </span>
            )}
            <span style={{ fontSize: '20px', fontWeight: '600', color: '#374151' }}>
              어떤 여행을 계획하고 있나요?
            </span>
          </div>

          {/* 입력 폼 세트 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* 어디로 가볼까요? */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                어디로 가볼까요?
              </label>
              <div style={{ height: '48px' }}>
                <TripRegionPicker
                  width='100%'
                  value={cascaderValue}
                  onChange={handleValuesChange}
                  changeOnSelect={handleValuesChange}
                  popupRender={(menus) => (
                    <div
                      onMouseLeave={() => {
                        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
                        setHoveredId(null);
                      }}
                    >
                      {menus}
                    </div>
                  )}
                  optionRender={(option) => (
                    <div
                      onMouseEnter={() => handleMouseEnter(option.value)}
                      onMouseLeave={handleMouseLeave}
                      style={{ width: '100%' }}
                    >
                      {option.label}
                    </div>
                  )}
                  rootClassName={styles.customPopup} 
                />
              </div>
            </div>

            {/* 언제 출발할까요? */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                언제 출발할까요?
              </label>
              <div style={{ height: '48px' }}>
                <TripDatePicker width='100%' />
              </div>
            </div>

          </div>

          {/* 여행 계획 시작하기 버튼 */}
          <div style={{ height: '50px', marginTop: '6px' }}>
            <TextButton 
              type="primary" 
              disabled={!selectedZdo} 
              onClickEvent={handleStart} 
              width="100%" 
              height="100%" 
              fontSize="16px"
            >
              여행 계획 시작하기
            </TextButton>
          </div>

        </div>

        {/* 2. 하단 라운지 링크 바 */}
        <div 
          onClick={() => navigate('/lounge')}
          style={{
            width: '100%',
            padding: '16px 24px',
            backgroundColor: '#2b3658',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxSizing: 'border-box',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1f2845'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2b3658'}
        >
          <UserRoundGroup size={22} color="#ffffff" strokeWidth={2} />
          <span style={{
            color: '#ffffff',
            fontSize: '15px',
            fontWeight: '500',
            letterSpacing: '-0.3px'
          }}>
            라운지에서 다른 사람의 여행 계획 구경하기
          </span>
        </div>

      </div>
    </div>
  );
};

export default TripInfoSelector;