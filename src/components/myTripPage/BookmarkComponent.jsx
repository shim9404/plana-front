import React, { useState } from 'react'
import { Button, Card, Empty } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import '../../styles/myTripPage.css';
import { BOOKMARK_COLOR } from "../../Constants/bookmarkColor";
import BookmarkItem from '../bookmark/BookmarkItem';


{/* 북마크 카드*/}
const BookmarkComponent = ({bookmarks}) => {
  // 색상 (색 버튼 클릭) 
  const [selectedColor, setSelectedColor] = useState("");

  // 색상 별 리스트
  const filteredList = selectedColor? 
    bookmarks.filter(item => item.bookmarkType === selectedColor)
    : bookmarks; // 전체

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
            <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingLeft: "10px", paddingRight: "10px"}}>
              <Button className="bookmark-extra-text" onClick={()=>setSelectedColor("")}>전체</Button>
              <Button className="bookmark-card-colors" style={{ background: BOOKMARK_COLOR.RED.bg }}
                onClick={()=>setSelectedColor("RED")}/>
              <Button className="bookmark-card-colors" style={{ background: BOOKMARK_COLOR.ORANGE.bg }}
                onClick={()=>setSelectedColor("ORANGE")}/>
              <Button className="bookmark-card-colors" style={{ background: BOOKMARK_COLOR.YELLOW.bg }}
                onClick={()=>setSelectedColor("YELLOW")}/>
              <Button className="bookmark-card-colors" style={{ background: BOOKMARK_COLOR.GREEN.bg }}
                onClick={()=>setSelectedColor("GREEN")}/>
              <Button className="bookmark-card-colors" style={{ background: BOOKMARK_COLOR.BLUE.bg }}
                onClick={()=>setSelectedColor("BLUE")}/>
              <Button className="bookmark-card-colors" style={{ background: BOOKMARK_COLOR.PURPLE.bg }}
                onClick={()=>setSelectedColor("PURPLE")}/>
            </div>
          </div>} >

        {/* 내용 */}
        {filteredList.length === 0 ? ( // 북마크 리스트 여부
          <div className="bookmark-list" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Empty description={"북마크가 없습니다."}/>
          </div>
          ) : (
            <div className="bookmark-list">
              {filteredList?.map((item) => {
                return (
                <BookmarkItem
                  bookmark={item}
                  id={item.bookmarkId}
                />
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
