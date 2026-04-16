import React from 'react'
import { Card } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import '../../styles/myTripPage.css';
import { CATEGORY_ICON } from "../../Constants/categoryIcon";
import { BOOKMARK_COLOR } from "../../Constants/bookmarkColor";


{/* 북마크 카드*/}
const BookmarkComponent = ({bookmarkList}) => {
  return (
    <>
      <Card
        className="bookmark_head"
        style={{ borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)" }}
        // 제목(상단)
        title={
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <StarOutlined style={{ fontSize: "20px" }} />
              <span style={{ fontWeight: 600 }}>북마크</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingLeft: "10px"}}>
              <span className="bookmark-extra-text">전체</span>
              <div className="bookmark-card-colors"style={{ background: BOOKMARK_COLOR.RED.bg }}/>
              <div className="bookmark-card-colors"style={{ background: BOOKMARK_COLOR.ORANGE.bg }}/>
              <div className="bookmark-card-colors"style={{ background: BOOKMARK_COLOR.YELLOW.bg }}/>
              <div className="bookmark-card-colors"style={{ background: BOOKMARK_COLOR.GREEN.bg }}/>
              <div className="bookmark-card-colors"style={{ background: BOOKMARK_COLOR.BLUE.bg }}/>
              <div className="bookmark-card-colors"style={{ background: BOOKMARK_COLOR.PURPLE.bg }}/>
            </div>
          </div>} >
        {/* 내용 */}
        {bookmarkList.length === 0 ? ( // 북마크 리스트 여부
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <div className="bookmark-card"
              style={{ background: BOOKMARK_COLOR.default }}>
              <div className="bookmark-card_title">북마크가 없습니다.</div>
              <div className="bookmark-card_icon-box">
                <div className="bookmark-card_icon">
                  <CATEGORY_ICON.default size={50} />
                </div>
              </div>
            </div>
          </div>
          ) : (
            <div className="bookmark-list">
              {bookmarkList.map((item) => {
                const Icon = CATEGORY_ICON[item.areaCategory] || CATEGORY_ICON.default;
                const colorData = BOOKMARK_COLOR[item.bookmarkType] || BOOKMARK_COLOR.default;
                return (
                  <div key={item.id} className="bookmark-card" style={{ background: colorData.bg }}>
                    <div className="bookmark-card_title">
                      {item.title}
                    </div>
                    <div className="bookmark-card_title_full" style={{ background: colorData.bg }}>
                      {item.title}
                    </div>
                    <div className="bookmark-card_icon-box">
                      <div className="bookmark-card_icon">
                        <Icon size={50} />
                      </div>
                    </div>
                    <div className="bookmark-card_address" style={{ background: colorData.bg2 }}>
                      {item.address}
                    </div>
                    <div className="bookmark-card_address_full" style={{ background: colorData.bg2 }}>
                      <div>{item.address}</div>
                      <div>T. {item.telephon}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        }
      </Card>
    </>
  )
}

export default BookmarkComponent
