import BookmarkItem from "./BookmarkItem";
import { useDraggable } from "@dnd-kit/react";

const DragableBookmarkItem = ({ bookmark }) => {
  const {ref} = useDraggable({id: bookmark.bookmarkId});
  return (
    <BookmarkItem ref={ref} bookmark={bookmark} style={{cursor: "grab"}}/>
  )
}

export default DragableBookmarkItem;
