import { createContext, useContext, useMemo, useState } from "react";

/** === 북마크 ==================================== 
 * PlanBookmarkContext 구독 컴포넌트 목록
 * - PlanBookmarkContainer
 * - AreaItem => AreaBookmarkButton 북마크 버튼 컴포넌트 분리
 * - SortableScheduleItem => ScheduleDroppableItem 컴포넌트 분리
 =============================================== */

const PlanBookmarkContext = createContext(null);

export const PlanBookmarkProvider = ({ children }) => {
  // 북마크 데이터
  const [bookmarks, setBookmarks] = useState([]);

  const getBookmark = (id) => {
    return bookmarks.find(bookmark => bookmark.bookmarkId === id);
  };

  const planBookmarkValue = useMemo(() => ({
    bookmarks, setBookmarks, getBookmark
  }), [bookmarks]);

  return (
    <PlanBookmarkContext.Provider value={planBookmarkValue}>
      {children}
    </PlanBookmarkContext.Provider>
  )
}

export const usePlanBookmark = () => {
  const context = useContext(PlanBookmarkContext);
  if (!context) throw new Error("usePlanBookmark must be used within PlanBookmarkContext");
  return context;
}