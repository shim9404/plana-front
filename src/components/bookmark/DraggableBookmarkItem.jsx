import { useEffect, useState } from "react";
import BookmarkItem from "./BookmarkItem";
import { useDraggable } from "@dnd-kit/react";
import { IconButton } from "../common/PLA_Buttons";
import { CloseCircleFilled, PushpinFilled } from "@ant-design/icons";
import { FlexBox } from "../common/PLA_FlexBox";
import { usePlanBookmark } from "../../hooks/trip/PlanBookmarkContext";

const DraggableBookmarkItem = ({ bookmark }) => {
  const { ref, isDragging } = useDraggable({ id: bookmark.bookmarkId, type: "bookmark" });
  const { deleteBookmark } = usePlanBookmark();
  const [isHover, setIsHover] = useState(false);

  const handleDeleteBookmark = ()  => {
    const bookmarkId = bookmark?.bookmarkId;
    deleteBookmark(bookmarkId);
  };

  useEffect(() => {
    console.log("create bookmark:: " + bookmark)
  }, []);

  return (
    <FlexBox w="auto" h="auto" style={{position: "relative"}}
    onMouseOver={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}>
      <FlexBox style={{paddingTop: "8px"}}>

      <BookmarkItem ref={ref} bookmark={bookmark} style={{ cursor: "grab", opacity: isDragging ? 0.75 : 1, transform: "none" }}/>
      </FlexBox>

      <IconButton width="24px" height="24px" fontSize="12px" danger 
      type={bookmark.linkedCount && bookmark.linkedCount > 0 ? "default" : "primary"}
      disabled={bookmark.linkedCount && bookmark.linkedCount > 0}
      style={{  
        position: "absolute", top: "2px", right: "6px",
        margin: "0px", padding: "2px", 
        border:"solid 1px rgba(255,255,255,0.75)",
        borderRadius: "20px",
        visibility:  isHover ? "visible" : "hidden",
        // opacity: bookmark.isLinked ? 0.8 : 1,
      }}
      onClick={handleDeleteBookmark}
      >
        {
          bookmark.linkedCount && bookmark.linkedCount > 0 ? 
          <PushpinFilled style={{fontSize:"16px", color: "#"}}/>
          :
          <CloseCircleFilled style={{fontSize:"16px", color:"#FFFFFF"}}/>
        }
      </IconButton>
    </FlexBox>
  )
}

export default DraggableBookmarkItem;
