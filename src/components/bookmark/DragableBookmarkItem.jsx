import BookmarkItem from "./BookmarkItem";
import { useDraggable } from "@dnd-kit/react";

const DragableBookmarkItem = ({ bookmark }) => {
  const {ref, isDragging} = useDraggable({id: bookmark.bookmarkId, type: "bookmark"});
  return (
    <BookmarkItem ref={ref} bookmark={bookmark} style={{cursor: "grab", opacity: isDragging ? 0.75 : 1, transform: "none" }}/>
  )
}

export default DragableBookmarkItem;
