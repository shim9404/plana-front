import PageLayout from "../../components/common/PageLayout";
import { IconButton, TextButton } from "../../components/common/PLA_Buttons";
import { Empty, Layout, message, Modal } from "antd";
import { CompassOutlined, FormOutlined } from "@ant-design/icons";
import { Download, FilePenLine, MapPinned, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import '../../styles/myTripPage.css';
import BookmarkComponent from "../../components/myTripPage/BookmarkComponent";
import TripPlanComponent from "../../components/myTripPage/TripPlanComponent";
import TripTrashComponent from "../../components/myTripPage/TripTrashComponent";
import { useAuth } from "../../hooks/AuthContext";
import axiosInstance from "../../services/axiosInstance";

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
  // 회원 전역 변수
  const { memberId } = useAuth();

  // 여행 목록(간단)초기값
  const [trips, setTrips] = useState([]);
  const getTripbyMemberId = useCallback( async () => {
    if (!memberId) return;

    try {
      const uri = `/api/members/${memberId}/trips`;
      const result = await axiosInstance.get(uri, null);
      const trip = result?.data?.data?.member?.trips || [];

      setTrips(trip);
    } catch (error) {
      console.log(error);
    }
  }, [memberId]);

  useEffect(() => {

    getTripbyMemberId();
  }, [getTripbyMemberId]);
  // 여행 목록(간단) - ACTIVE(활성) 초기값
  const tripList = trips.filter((item) => item.status === "ACTIVE");
  // 여행 목록(간단) - INACTIVE(비활성-휴지통) 초기값
  const trashPlanList = trips.filter((item) => item.status === "INACTIVE");

  // 메뉴 - 여행 목록 선택
  const [selectedMenu, setSelectedMenu] = useState("");
  useEffect(() => { 
    // 메뉴 선택의 초기 선택값 설정
    if (tripList.length > 0 && !tripList.some(trip => trip.tripId === selectedMenu)) {
      setSelectedMenu(tripList[0].tripId);}
  }, [tripList]);

  // 북마크 목록 초기값
  const [bookmarks, setbookmarks] = useState([]);
  // 여행 일자 초기값
  const [tripDates, setTripDate] = useState({ startDate: "", endDate: "" });
  // 스케줄 목록 초기값
  const [schedules, setSchedules] = useState([]);
  // 북마크 색상 (색 버튼 클릭) 
  const [selectedColor, setSelectedColor] = useState("");

  const getTripByTripId = useCallback(async () => {
    if (!selectedMenu) return;

    try {
      const uri = `/api/trips/${selectedMenu}`;
      const result = await axiosInstance.get(uri, null);
      // 북마크 목록
      const bookmark = result.data.data.bookmarks;
      setbookmarks(bookmark);
      setSelectedColor("")
      // 여행 일자
      const startDate = result.data.data.startDate;
      const endDate = result.data.data.endDate;
      setTripDate({startDate: startDate, endDate: endDate});
      // 스케줄 목록
      const schedule = result.data.data.days;
      setSchedules(schedule);
    } catch (error) {
      console.log(error);
    }
  }, [selectedMenu])

  useEffect(() => {

    getTripByTripId();
  }, [getTripByTripId])
  

  // 휴지통 목록 내 여행 정보 초기값
  const[trashPlans, setTrashPlans] = useState([])

  const getTrashPlan = useCallback(async () => {
    if (!memberId) return;

    try {
      const uri = `/api/members/${memberId}/trips/trashs`;
      const result = await axiosInstance.get(uri, null);
      const trashPlan = result.data.data.member.trips;
      setTrashPlans(trashPlan);
    } catch (error) {
      console.log(error);
    }
  }, [memberId])

  useEffect(() => {
    getTrashPlan();
  }, [memberId])

  // 휴지통 목록(간단) - INACTIVE(비활성) 초기값
  const trashList = trashPlans.filter((item) => item.status === "INACTIVE");

  // ==========

  // 메뉴 하단 - 휴지통 버튼 선택
  const [selectedTrash, setSelectedTrash] = useState(false);
  // 콘텐츠 상단 - 휴지통 버튼 선택
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false); // 경고창 모달
  
  const trashshowModal = () => { // 모달 open
    if (trashPlanList.length >= 10) {
      message.warning("휴지통이 가득 찼습니다. (10 / 10)")
      return;
    }
    setIsTrashModalOpen(true);
  }; 

  const trashhandleOk = async() => { // 확인
    // 여행 계획 + 북마크 status: 비활성화(INACTIVE)
    try {
      const uri = `/api/trips/${selectedMenu}/status`;
      await axiosInstance.patch(uri, { status: "INACTIVE" });
      } catch (error) {
        console.log(error);
    }
    getTripbyMemberId();
    getTrashPlan();
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
  // const pageHeight = 297;
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
                  {/* <TextButton type="primary" width="160px" height="35px" fontSize="15px" 
                    onClickEvent={() => { navigate("/plan"); }}>
                    <FormOutlined /> 새 여행 계획하기
                  </TextButton> */}
                  <div>내 여행 포인트 : 1000</div>
                </div>
              </div>
            {/* 메뉴 */}
            {/* <div className="trip-list"> */}
            <div className="trip-list">
              {tripList.map((trip) => (
                <div
                  key={trip.tripId}
                  className={`trip-item ${selectedMenu === trip.tripId && !selectedTrash ? "active" : ""}`}
                  onClick={() => {setSelectedMenu(trip.tripId), setSelectedTrash(false)}}
                >
                  <MapPinned size={25}/>
                  <span className="menu-text">{trip.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* 하단 영역 - 추가 박스(저장량 표시 및 휴지통) */}
          <div className="menu-extra">
            {/* <div className="menu-extra-text">
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
            </TextButton> */}
            <div style={{marginTop: '30px'}}></div>
            <TextButton type="default" danger width="270px" height="35px" fontSize="15px"
              onClickEvent={() => {setSelectedTrash(true)}}
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
                  <IconButton type="default" width="50px" height="40px" onClickEvent={trashshowModal}>
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
              <BookmarkComponent 
                bookmarks = {bookmarks}
                selectedColor = {selectedColor}
                setSelectedColor = {setSelectedColor}
                />
              <div id="pdf-area">
                {/* 여행 계획표 카드 */}
                <TripPlanComponent
                  tripList={tripList}
                  tripDates={tripDates}
                  bookmarks={bookmarks}
                  schedules={schedules}
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
                getTripbyMemberId = {getTripbyMemberId}
                tripList = {tripList}
                getTrashPlan = {getTrashPlan}
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
