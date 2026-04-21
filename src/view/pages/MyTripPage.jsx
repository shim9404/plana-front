import PageLayout from "../../components/common/PageLayout";
import { IconButton, TextButton } from "../../components/common/PLA_Buttons";
import { Empty, Layout, message, Modal } from "antd";
import { CompassOutlined, FormOutlined } from "@ant-design/icons";
import { Download, FilePenLine, MapPinned, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import '../../styles/myTripPage.css';
import BookmarkComponent from "../../components/myTripPage/BookmarkComponent";
import TripPlanComponent from "../../components/myTripPage/TripPlanComponent";
import TripTrashComponent from "../../components/myTripPage/TripTrashComponent";

const { Sider, Content } = Layout;

const layoutStyle = {
  display: "flex",
  minHeight: '100%'
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '24px',
  padding: '48px',
  background: '#ffffff',
  borderRadius: '15px',
  boxShadow: '0 3px 5px rgba(0,0,0,0.5)',
  height: 'calc(100vh - 150px)',
  overflowY: 'auto'
}

const MyTripPage = () => {
  // 경로 설정
  const navigate = useNavigate();

  // 여행 목록(간단)초기값
  const [tripItem, setTripItem] = useState([
    { tripId: "T1", name: "여행을 떠나요", entryCount: 2, status: "ACTIVE" },
    { tripId: "T2", name: "즐거운 마음으로", entryCount: 2, status: "ACTIVE" },
    { tripId: "T3", name: "모두 함께 떠나요 ~ ! 예예예예예예예예예예예예", entryCount: 2, status: "ACTIVE" },
    { tripId: "T4", name: "글자 수량 제한이 꼭 꼭 필요합니다. 20?30?글자 제한 필요합니다!!얍얍", entryCount: 1, status: "ACTIVE" },
    { tripId: "T9", name: "집에 보내줘요", entryCount: 1, status: "INACTIVE" },
    { tripId: "T11", name: "나 말리지마", entryCount: 1, status: "INACTIVE" },
    { tripId: "T50", name: "노는게 제일 좋아~ 뽀로로 언제나! 노는게!!!!!", entryCount: 1, status: "INACTIVE" },
    { tripId: "T51", name: "집에 보내줘", entryCount: 1, status: "INACTIVE" },
    { tripId: "T52", name: "집에 보내줘요", entryCount: 1, status: "INACTIVE" },
    { tripId: "T53", name: "집에 보내줘요", entryCount: 1, status: "INACTIVE" },
    { tripId: "T54", name: "집에 보내줘요", entryCount: 1, status: "INACTIVE" }
  ]);

  // 여행 목록(간단) - ACTIVE(활성) 초기값
  const tripList = tripItem.filter((item) => item.status === "ACTIVE");

  // 여행 목록(간단) - INACTIVE(비활성-휴지통) 초기값
  const trashPlanList = tripItem.filter((item) => item.status === "INACTIVE");

  // 북마크 목록(전부) 초기값
  const [bookmarkList, setBookmarkList] = useState([
    {bookmarkId: "BM1", areaId: "A1", areaCategory: "FD6", // 음식점
      title: "맛있는 초밥집", address: "대구 수성구 달구벌대로489안길 40-1", link: "http://naver.com", telephon: "0000-000-0000", bookmarkType: "YELLOW"},
    {bookmarkId: "BM2", areaId: "A1", areaCategory: "CE7",  // 카페
      title: "성심당 본점 랄랄랄랄랄랄랄랄랄랄", address: "대전광역시 중구 대종로480번길 15", link: "http://naver.com", telephon: "0000-000-0000", bookmarkType: "YELLOW"},
    {bookmarkId: "BM3", areaId: "A32", areaCategory: "AT4", // 관광명소
      title: "미륵원지", address: "대전광역시 동구 냉천로152번길 80 (마산동)", link: "http://naver.com", telephon: "0000-000-0000",bookmarkType: "GREEN"},
    {bookmarkId: "BM4", areaId: "A33", areaCategory: "etc", // 기타
      title: "커피사피엔스 가산어반워크점", address: "대전광역시 동구 냉천로152번길 80 (마산동)", bookmarkType: "ORANGE"},
    {bookmarkId: "BM5", areaId: "A34", areaCategory: "PK6", // 주차장
      title: "예시2-주차장", address: "대전광역시 동구 냉천로152번길 80 (마산동)", bookmarkType: "BLUE"},
    {bookmarkId: "BM6", areaId: "A35", areaCategory: "PO3", // 공공기관
      title: "예시3-공공기관", address: "대전광역시 동구 냉천로152번길 80 (마산동)", bookmarkType: "PURPLE"},
    {bookmarkId: "BM7", areaId: "A36", areaCategory: "AT4", // 관광명소
      title: "예시4-관광명소", address: "대전광역시 동구 냉천로152번길 80 (마산동)", bookmarkType: "PURPLE"},
    {bookmarkId: "BM8", areaId: "A37", areaCategory: "SC4", // 학교
      title: "예시5-학교", address: "대전광역시 동구 냉천로152번길 80 (마산동)", bookmarkType: "PURPLE"},
    {bookmarkId: "BM9", areaId: "A38", areaCategory: "AD5", // 숙박
      title: "예시6-숙박", address: "대전광역시 동구 냉천로152번길 80 (마산동)", bookmarkType: "PURPLE"}
  ]);
  
  // 여행 일자 초기값
  const [tripDate, setTripDate] = useState({
    startDate: "2026-04-01",
    endDate: "2026-04-02"
  });

  // 스케줄 목록(전부) 초기값
  const [schedulelist, setScheduleList] = useState([
    {
      tripDayId: "TD14",
      indexSort: 1,
      schedules: [
        {tripScheduleId: "TS123", indexSort: 1, context: "부산으로 ㄱㄱ", startTime: "10:00", endTime: "13:00", category: "이동", price: 10000, memo: "택시 타기"},
        {tripScheduleId: "TS365", indexSort: 2, bookmarkId: "BM1", startTime: "14:00", endTime: "15:00", category: "식사", price: 50000, memo: "방문 전 예약 필수! 예약 실패 시, 1시간 대기",}
      ]
    },
    {
      tripDayId: "TD27",
      indexSort: 2,
      schedules: [
        {tripScheduleId: "TS257", indexSort: 1, bookmarkId: "BM2", startTime: "10:00", endTime: "11:00", category: "이동", memo: ""},
        {tripScheduleId: "TS258", indexSort: 2, bookmarkId: "BM3", startTime: "13:00", endTime: "14:00", category: "카페", price: 30000, memo: "딸기라떼 + 티라미수 필수"},
        {tripScheduleId: "TS260", indexSort: 3, bookmarkId: "BM4", startTime: "14:00", endTime: "15:00", category: "관광명소", memo: "사진 찍기"},
        {tripScheduleId: "TS261", indexSort: 4, context: "", startTime: "15:00", endTime: "16:00", category: "기타", memo: "소화 시킬겸 주변 공원 산책"},
        {tripScheduleId: "TS262", indexSort: 5, bookmarkId: "BM5", startTime: "16:00", endTime: "17:00", category: "주차장", price: 3000, memo: ""},
        {tripScheduleId: "TS263", indexSort: 6, context: "미정", startTime: "18:00", endTime: "19:00", category: "", price: "", memo: ""},
        {tripScheduleId: "TS264", indexSort: 7, bookmarkId: "BM9", startTime: "20:00", endTime: "21:00", category: "숙박", price: 190000, memo: "꿈나라"},
        {tripScheduleId: "TS265", indexSort: 8, bookmarkId: "BM9", startTime: "20:00", endTime: "21:00", category: "숙박", price: 190000, memo: "꿈나라"},        
        {tripScheduleId: "TS266", indexSort: 9, bookmarkId: "BM9", startTime: "20:00", endTime: "21:00", category: "숙박", price: 190000, memo: "꿈나라"}
      ]
    },
    {
      tripDayId: "TD28",
      indexSort: 3,
      schedules: [
        {tripScheduleId: "TS300", indexSort: 1, bookmarkId: "BM2", startTime: "10:00", endTime: "11:00", category: "이동", memo: ""},
        {tripScheduleId: "TS301", indexSort: 2, bookmarkId: "BM3", startTime: "13:00", endTime: "14:00", category: "카페", price: 30000, memo: "딸기라떼 + 티라미수 필수"},
        {tripScheduleId: "TS302", indexSort: 3, bookmarkId: "BM4", startTime: "14:00", endTime: "15:00", category: "관광명소", memo: "사진 찍기"},
        {tripScheduleId: "TS303", indexSort: 4, context: "", startTime: "15:00", endTime: "16:00", category: "기타", memo: "소화 시킬겸 주변 공원 산책"}
      ]
    }
  ]);

  // 휴지통 목록 내 여행 정보 초기값
  const[trashPlanItem, setTrashPlanItem] = useState([
    {tripId: "T9", name: "집에 보내줘요", status: "INACTIVE", startDate: "2026-04-01", endDate: "2026-04-02", latestDate: "2026-03-10", remainDate: 22, scheduleCount: 9999, bookmarkCount: 9999},
    {tripId: "T11", name: "나 말리지마", status: "INACTIVE", startDate: "2026-04-03", endDate: "2026-04-05", latestDate: "2026-03-15", remainDate: 3, scheduleCount: 6, bookmarkCount: 0},
    {tripId: "T50", name: "노는게 제일 좋아~ 뽀로로 언제나! 노는게!!!!!", status: "INACTIVE", startDate: "2026-04-01", endDate: "2026-04-02", latestDate: "2026-03-10", remainDate: 15, scheduleCount: 0, bookmarkCount: 0},
    {tripId: "T51", name: "집에 보내줘요", status: "INACTIVE", startDate: "2026-04-01", endDate: "2026-04-02", latestDate: "2026-03-10", remainDate: 7, scheduleCount: 3, bookmarkCount: 5},
    {tripId: "T52", name: "집에 보내줘요", status: "INACTIVE", startDate: "2026-04-01", endDate: "2026-04-02", latestDate: "2026-03-10", remainDate: 5, scheduleCount: 3, bookmarkCount: 5},
    {tripId: "T53", name: "집에 보내줘요", status: "INACTIVE", startDate: "2026-04-01", endDate: "2026-04-02", latestDate: "2026-03-10", remainDate: 3, scheduleCount: 3, bookmarkCount: 5},
    {tripId: "T54", name: "집에 보내줘요", status: "INACTIVE", startDate: "2026-04-01", endDate: "2026-04-02", latestDate: "2026-03-10", remainDate: 3, scheduleCount: 3, bookmarkCount: 5}
  ])

  // 휴지통 목록(간단) - INACTIVE(비활성) 초기값
  const trashList = trashPlanItem.filter((item) => item.status === "INACTIVE");

  // ==========
  // 메뉴 - 여행 목록 선택
  const [selectedMenu, setSelectedMenu] = useState("");

  // 메뉴 선택의 초기 선택값 설정
  useEffect(() => {
    if (tripList.length > 0 && !tripList.some(trip => trip.tripId === selectedMenu)) {
      setSelectedMenu(tripList[0].tripId);}
  }, [tripList, selectedMenu]);

  // 메뉴 하단 - 휴지통 버튼 선택
  const [selectedTrash, setSelectedTrash] = useState(false);

  // 콘텐츠 상단 - 휴지통 버튼 선택
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false); // 경고창 모달
  const [selectedTrashTripId, setSelectedTrashTripId] = useState(""); // 휴지통에 보낼 여행 목록 id
  const trashshowModal = (tripId) => { // 모달 open
    if (trashPlanList.length >= 10) {
      message.warning("휴지통이 가득 찼습니다. (10 / 10)")
      return;
    }
    setSelectedTrashTripId(tripId);
    setIsTrashModalOpen(true);
  }; 
  const trashhandleOk = () => { // 확인
    setTripItem(prev =>
      prev.map(item =>
        item.tripId === selectedTrashTripId? { ...item, status: "INACTIVE" }: item));
    setIsTrashModalOpen(false);
  }; 
  const trashhandleCancel = () => { // 취소
    setIsTrashModalOpen(false);
  }; 

  // 콘텐츠 상단 - 다운로드 버튼 선택
  const handleDownloadPdf = async () => { // PDF 저장
  // 캡처 전 스타일 변경
  document.body.classList.add("pdf-mode");
  const element = document.getElementById("pdf-area");
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  // 캡처 후 바로 복구
  document.body.classList.remove("pdf-mode");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  
  window.open(pdf.output("bloburl")) // 미리보기
};


  return (
    <PageLayout>
      <Layout style={layoutStyle}>
        {/* == 사이드 영역 == */}
        <Sider width={'300px'} theme="light">
        {/* 상단 영역 */}
          <div className="top-area">
            {/* 여행 박스 */}
            <div className="trip-box">
                <CompassOutlined style={{ fontSize: "60px" }} />
                <div className="trip-info">
                  <div className="trip-name">내 여행 계획</div>
                  <TextButton type="primary" width="160px" height="35px" fontSize="15px" 
                    onClickEvent={() => { navigate("/plan"); }}>
                    <FormOutlined /> 새 여행 계획하기
                  </TextButton>
                </div>
              </div>
            {/* 메뉴 */}
            <div className="trip-list">
              {tripList.map((trip) => (
                <div
                  key={trip.tripId}
                  className={`trip-item ${selectedMenu === trip.tripId && !selectedTrash ? "active" : ""}`}
                  onClick={() => setSelectedMenu(trip.tripId)}
                >
                  <MapPinned size={25}/>
                  <span className="menu-text">{trip.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* 하단 영역 - 추가 박스(저장량 표시 및 휴지통) */}
          <div className="menu-extra">
            <div className="menu-extra-text">
              저장 여행 {tripList.length} / 5개
            </div>
            <TextButton type="default" width="270px" height="35px" fontSize="15px" 
              onClickEvent={() => setSelectedTrash(false)}
            >
              <div
                className="menu-extra-button-fill"
                style={{ width: `${(tripList.length / 5) * 100}%` }}
              />
              <div className="menu-extra-button-position">
                <CompassOutlined style={{ zIndex: 1, fontSize: "18px" }} />
                <span style={{ zIndex: 1 }}>
                  {tripList.length}개 사용 중
                </span>
              </div>
            </TextButton>
            <div style={{marginTop: '30px'}}></div>
            <TextButton type="default" danger width="270px" height="35px" fontSize="15px"
              onClickEvent={() => setSelectedTrash(true)}
            >
              <div
                className="menu-extra-button-fill-trash"
                style={{ width: `${(trashPlanList.length / 10) * 100}%` }}
              />
              <div className="menu-extra-button-position">
                <Trash2 size={18} style={{ zIndex: 1 }} />
                <span style={{ zIndex: 1 }}>
                  휴지통 ({trashPlanList.length} / 10)
                </span>
              </div>
            </TextButton>
          </div>
        </Sider>
        {/* == 콘텐츠 영역 == */}
        {selectedTrash === false ? ( // 휴지통 버튼 클릭 여부
          <Content style={contentStyle}>
            {tripList.length === 0 ? ( // 여행 목록 없는 경우
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 300px)'}}>
                <Empty description={"여행 계획이 없습니다."}/>
              </div>
            ) : (
              <>
              {/* 콘텐츠 상단 */}
              <div className="trip-content-space">
                <div className="trip-content-header">
                  <CompassOutlined style={{fontSize: '35px'}} />
                  <span className="trip-content-header__title">
                    {tripList.find((trip) => trip.tripId === selectedMenu)?.name}
                  </span>
                </div>
                <div className="trip-content-header_button">
                  <IconButton type="default" width="50px" height="40px" onClickEvent={()=>trashshowModal(selectedMenu)}>
                    <Trash2 size={20} />
                  </IconButton>
                  <IconButton type="default" width="50px" height="40px"
                    onClickEvent={() => navigate("/plan")}>
                    <FilePenLine size={20} />
                  </IconButton>
                  <IconButton type="default" width="50px" height="40px" onClickEvent={handleDownloadPdf}>
                    <Download size={20} />
                  </IconButton>
                </div>
              </div>
              {/* 북마크 카드 */}
              <BookmarkComponent bookmarkList = {bookmarkList}/>
              <div id="pdf-area">
                {/* 여행 계획표 카드 */}
                <TripPlanComponent
                  tripList={tripList}
                  tripDate={tripDate}
                  bookmarkList={bookmarkList}
                  schedulelist={schedulelist}
                  selectedMenu={selectedMenu}
                />
              </div>
              </>
            )}
          </Content>
          ) : (
            <Content style={contentStyle}>
              {/* 콘텐츠 상단 */}
              <div className="trip-content-space">
                <div className="trip-content-header">
                  <Trash2 size={35} />
                  <span className="trip-content-header__title">
                    휴지통
                      <div style={{ fontSize: "12px", fontWeight: "500" }}>
                        휴지통은 버려진 여행 계획을 30일 동안 보관하고 이후에는 영원히 삭제됩니다.
                      </div>
                  </span>
                </div>
              </div>
              {/* 휴지통 리스트 */}
              <TripTrashComponent 
                setTripItem = {setTripItem}
                tripList = {tripList}
                setTrashPlanItem = {setTrashPlanItem}
                trashList = {trashList} 
              />
            </Content>
          )
        }
      </Layout>

      <Modal
        title="알림창"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isTrashModalOpen}
        onOk={trashhandleOk}
        onCancel={trashhandleCancel}
        okText="확인"
        cancelText="취소"
        okButtonProps={{ danger: true }}
      >
        <p>이 여행 목록을 휴지통에 버리겠습니까?</p>
      </Modal>

    </PageLayout>
  );
};

export default MyTripPage;
