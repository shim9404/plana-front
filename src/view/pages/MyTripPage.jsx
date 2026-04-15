import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/common/PageLayout";
import { Layout } from "antd";
import { CompassOutlined, FormOutlined } from "@ant-design/icons";
import '../../styles/myTripPage.css';
import { TextButton } from "../../components/common/PLA_Buttons";
import { MapPinned, Trash2 } from "lucide-react";

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
    { tripId: "T5", name: "비활성환 부분들은", entryCount: 1, status: "INACTIVE" },
    { tripId: "T6", name: "목록에 안뜸", entryCount: 1, status: "INACTIVE" },
    { tripId: "T7", name: "휴지통에 보여질거임", entryCount: 1, status: "INACTIVE" }
  ]);

  // 여행 목록(간단) - ACTIVE(활성) 초기값
  const [tripList, setTripList] = useState(
    tripItem.filter((item) => item.status === "ACTIVE"),
  );

  // 여행 목록(간단) - INACTIVE(비활성-휴지통) 초기값
  const [trashPlanList, setTrashPlanList] = useState(
    tripItem.filter((item) => item.status === "INACTIVE"),
  );

  // ==========
  // 메뉴 - 여행 목록 선택
  const [selectedMenu, setSelectedMenu] = useState("");

  // 메뉴 선택의 초기 선택값 설정
  useEffect(() => {
    if (tripList.length > 0) {
      setSelectedMenu(tripList[0].tripId);
    }
  }, [tripList]);

  // 메뉴 - 휴지통 버튼 선택
  const [selectedTrash, setSelectedTrash] = useState(false);

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
                    onClickEvent={() => { navigate("/Plan"); }}>
                    <FormOutlined /> 새 여행 계획하기
                  </TextButton>
                </div>
              </div>
            {/* 메뉴 */}
            <div className="trip-list">
              {tripList.map((trip) => (
                <div
                  key={trip.tripId}
                  className={`trip-item ${selectedMenu === trip.tripId ? "active" : ""}`}
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
        <Content style={contentStyle} >
        </Content>
      </Layout>
    </PageLayout>
  );
};

export default MyTripPage;
