import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CompassOutlined } from '@ant-design/icons';
import { ThumbsUp, Download, Copy } from 'lucide-react';
import { Spin } from 'antd';
import BookmarkComponent from "../../components/myTripPage/BookmarkComponent";
import TripPlanComponent from "../../components/myTripPage/TripPlanComponent";
import { LoungeSidebar } from '../../components/lounge/LoungeSidebar';
import { getHubPlanDetailApi, likePlanApi, copyTripApi } from '../../services/loungeApi';
import { KEYWORD_OPTIONS } from '../../constants/keyword';
import authStore from "../../store/authStore";
import modalStore from "../../store/modalStore";
import { oneBtnPreset } from '../../utils/alertModalPreset';
import html2canvas from "html2canvas";

import jsPDF from "jspdf";
import PageLayout from '../../components/common/PageLayout';

const pageContainerStyle = {
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 64px)',
  overflow: 'hidden',
  backgroundColor: '#fff',
};

const rightAreaStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflowY: 'auto',
  padding: '32px',
};

export const LoungeDetailPage = () => {
  const { id } = useParams(); // URL의 :hubPlanId (예: 'HP39')
  const navigate = useNavigate();

  // 모달 스토어에서 함수 가져오기
  const openOneBtnModal = modalStore((state) => state.openOneBtnModal);
	const openTwoBtnModal = modalStore((state) => state.openTwoBtnModal);

  // 상태 정의
  const [loungeInfo, setLoungeInfo] = useState(null);
  const [myBookmarks, setMybookmarks] = useState([]);
  const [myPlanDates, setMyPlanDates] = useState({ startDate: "", endDate: "" });
  const [myActiveDay, setMyActiveDay] = useState(1);
  const [mySchedules, setMySchedules] = useState([]);
  const [myEntryCount, setMyEntryCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 좋아요 및 키워드/날짜 관련 상태
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [keywordTags, setKeywordTags] = useState([]);
  
  // 내 여행 여부 및 로딩 상태
  const [isMyPlan, setIsMyPlan] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isCopyLoading, setIsCopyLoading] = useState(false);

  const [currentTab, setCurrentTab] = useState('board');

  // authStore에서 현재 로그인한 유저의 memberId 가져오기
  const memberId = authStore((state) => state.memberId);

  // 1. 라운지 상세 정보 조회
  useEffect(() => {
    const fetchLoungeDetail = async () => {
      try {
        setIsLoading(true);
        const response = await getHubPlanDetailApi(id);
        const data = response.data;
        const trip = data?.tripDetail || {};

        setLoungeInfo(data);
        setIsLiked(data?.isLiked || false);
        setLikeCount(data?.likeCount || 0);
        setKeywordTags(data?.keywordTags || []);

        setMyPlanDates({ startDate: trip.startDate, endDate: trip.endDate });
        setMyActiveDay(trip.activeDayCount || 1);

        const schedule = trip.days || [];
        setMySchedules(schedule);

        const bookmark = trip.bookmarks || [];
        const countMap = {};      
        schedule.forEach(day => {
          day.schedules.forEach(s => {
            if (s.bookmarkId) {
              countMap[s.bookmarkId] = (countMap[s.bookmarkId] || 0) + 1;
            }
          });
        });
        
        const updatedBookmarks = bookmark.map(item => ({
          ...item,
          linkedCount: countMap[item.bookmarkId] || 0
        }));
        
        setMybookmarks(updatedBookmarks);
        setSelectedColor("");
        setMyEntryCount(trip.entryCount || 1);

      } catch (error) {
        console.error('라운지 상세 정보를 불러오는 중 에러가 발생했습니다.', error);
        openOneBtnModal(oneBtnPreset.retryOver);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchLoungeDetail();
    }
  }, [id, openOneBtnModal]);

  // loungeInfo와 memberId가 모두 준비되었을 때 내 여행 여부 판별
  useEffect(() => {
    const authorMemberId = loungeInfo?.tripDetail?.memberId;
    if (authorMemberId && memberId) {
      setIsMyPlan(String(authorMemberId) === String(memberId));
    } else {
      setIsMyPlan(false);
    }
  }, [loungeInfo, memberId]);

  // 좋아요 버튼 핸들러
  const handleLike = async () => {
    if (isMyPlan || isLikeLoading) return;

    try {
      setIsLikeLoading(true);
      await likePlanApi(id);
      setIsLiked(prev => !prev);
      setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    } catch (e) {
      console.error(e);
      openOneBtnModal(oneBtnPreset.retryOver);
    } finally {
      setIsLikeLoading(false);
    }
  };

  // 내 여행으로 담기(복사) 핸들러 연동
  const handleCopyPlan = async () => {
    if (!memberId) {
      openOneBtnModal(oneBtnPreset.loginRequired);
      return;
    }
    if (isCopyLoading) return;

    try {
      setIsCopyLoading(true);
      const tripDetail = loungeInfo?.tripDetail;
      if (!tripDetail) {
        openOneBtnModal(oneBtnPreset.tripNotFound);
        return;
      }

      const requestData = {
        memberId: memberId,
        name: tripDetail.name,
        startDate: tripDetail.startDate,
        endDate: tripDetail.endDate,
        regionId: tripDetail.regionId,
        bookmarks: tripDetail.bookmarks || [],
        days: tripDetail.days || []
      };

      const targetTripId = tripDetail.tripId || id;
      const res = await copyTripApi(targetTripId, requestData);
      
      const newTripId = res?.data?.tripId || res?.data;

      // 성공 모달 노출 및 확인 버튼 클릭 시 페이지 이동 처리
      openOneBtnModal({
        ...oneBtnPreset.tripCopySuccess,
        onConfirm: () => {
          if (newTripId) {
            navigate(`/plan/${newTripId}`);
          }
        }
      });

    } catch (e) {
      console.error('여행 복제 실패:', e);
      openOneBtnModal(oneBtnPreset.retryOver);
    } finally {
      setIsCopyLoading(false);
    }
  };

  // PDF 다운로드 핸들러
  const handleDownload = () => {
    // 콘텐츠 상단 - 다운로드 버튼 선택
    openTwoBtnModal({
      ...oneBtnPreset.downloadCheck,
      onOk: async () => {
          // 캡처 전 스타일 변경
        document.body.classList.add("pdf-mode");
        const element = document.getElementById("pdf-area");
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");

        // 캡처 후 바로 복구
        document.body.classList.remove("pdf-mode");

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        // const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

        window.open(pdf.output("bloburl")) // 미리보기
      }
    });
  };


  // 사이드바 탭 변경 시 목록 페이지로 이동
  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    navigate('/lounge', { state: { defaultTab: tabId } });
  };

  return (
    <PageLayout>
      <div style={pageContainerStyle}>
        
        {/* 좌측 사이드바 */}
        <LoungeSidebar currentTab={currentTab} onTabChange={handleTabChange} />

        {/* 우측 콘텐츠 영역 */}
        <div style={rightAreaStyle}>
          <div style={{ maxWidth: '1435px', width: '100%', margin: '0 auto' }}>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Spin size="large" tip="계획을 불러오는 중..." />
              </div>
            ) : (
              <>
                {/* 상단 헤더 영역 (제목 & 날짜 정보) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  
                  {/* 좌측: 아이콘, 제목, 작성자 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <CompassOutlined style={{ fontSize: '35px', marginTop: '4px' }} />
                    <div>
                      <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#111' }}>
                        {loungeInfo?.tripDetail?.name}
                      </div>
                      <div style={{ fontSize: '13px', color: '#888', marginTop: '2px' }}>
                        작성자: {loungeInfo?.nickname}
                      </div>
                    </div>
                  </div>

                  {/* 우측: 여행일 및 게시일 정보 */}
                  <div style={{ textAlign: 'right', fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                    <div>여행일 {loungeInfo?.tripDetail?.startDate} ~ {loungeInfo?.tripDetail?.endDate}</div>
                    <div>
                      게시일 {loungeInfo?.createdAt 
                        ? loungeInfo.createdAt.replace('T', ' ').substring(0, 16) 
                        : '-'}
                    </div>
                  </div>
                </div>

                {/* 구분선 */}
                <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '16px 0 20px 0' }} />

                {/* 하단 영역 (좌측: 카테고리 태그 / 우측: 액션 버튼) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  
                  {/* 좌측: KEYWORD_OPTIONS 활용한 키워드 태그 렌더링 */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {keywordTags.length > 0 ? (
                      keywordTags.map((tagId, idx) => {
                        const keywordObj = KEYWORD_OPTIONS.find(opt => opt.id === tagId);
                        if (!keywordObj) return null;
                        const IconComponent = keywordObj.icon;

                        return (
                          <span 
                            key={idx} 
                            style={{ 
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              fontSize: '12px', 
                              backgroundColor: '#f1f5f9', 
                              color: '#475569', 
                              padding: '4px 10px', 
                              borderRadius: '6px', 
                              fontWeight: '600',
                              border: '1px solid #e2e8f0'
                            }}
                          >
                            {IconComponent && <IconComponent size={14} color={keywordObj.iconColor} />}
                          </span>
                        );
                      })
                    ) : (
                      <span style={{ fontSize: '13px', color: '#aaa' }}/>
                    )}
                  </div>

                  {/* 우측: 액션 버튼 영역 (좋아요, 복사, 다운로드) */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {/* 좋아요 버튼 */}
                    <button 
                      onClick={handleLike}
                      disabled={isLoading || isMyPlan || isLikeLoading}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        gap: '6px', 
                        padding: '0 16px', 
                        height: '40px', 
                        minWidth: '65px',
                        border: isMyPlan ? '1px solid #e5e7eb' : (isLiked ? '1px solid #4f46e5' : '1px solid #d9d9d9'), 
                        borderRadius: '8px', 
                        background: isMyPlan ? '#f9fafb' : (isLiked ? '#eef2ff' : '#fff'), 
                        color: isMyPlan ? '#9ca3af' : (isLiked ? '#4f46e5' : '#333'),
                        cursor: (isMyPlan || isLikeLoading) ? 'not-allowed' : 'pointer',
                        fontWeight: isLiked ? '600' : 'normal',
                        boxShadow: isLiked ? '0 2px 4px rgba(79, 70, 229, 0.1)' : 'none'
                      }}
                      title={isMyPlan ? "본인의 여행 계획에는 좋아요를 누를 수 없습니다." : "좋아요"}
                    >
                      {isLikeLoading ? (
                        <Spin size="small" />
                      ) : (
                        <>
                          <ThumbsUp size={18} color={isMyPlan ? '#9ca3af' : (isLiked ? '#4f46e5' : 'currentColor')} />
                          <span>{likeCount}</span>
                        </>
                      )}
                    </button>

                    {/* 내 여행으로 담기(복사) 버튼 */}
                    <button 
                      onClick={handleCopyPlan}
                      disabled={isCopyLoading}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        width: '40px', 
                        height: '40px', 
                        border: '1px solid #d9d9d9', 
                        borderRadius: '8px', 
                        background: '#fff', 
                        cursor: isCopyLoading ? 'not-allowed' : 'pointer' 
                      }}
                      title="내 여행으로 담기"
                    >
                      {isCopyLoading ? <Spin size="small" /> : <Copy size={18} />}
                    </button>

                    <button 
                      onClick={handleDownload}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', border: '1px solid #d9d9d9', borderRadius: '8px', background: '#fff', cursor: 'pointer' }}
                      title="PDF 다운로드"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </div>

                {/* 북마크 카드 컴포넌트 */}
                <BookmarkComponent 
                  myBookmarks={myBookmarks}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />

                <div id="pdf-area" style={{ marginTop: '20px' }}>
                  {/* 여행 계획표 카드 컴포넌트 */}
                  <TripPlanComponent
                    myEntryCount={myEntryCount}
                    myPlanDates={myPlanDates}
                    myActiveDay={myActiveDay}
                    myBookmarks={myBookmarks}
                    mySchedules={mySchedules}
                  />
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default LoungeDetailPage;