import { createContext, useCallback, useContext, useMemo, useState } from "react";

/** === 북마크 ==================================== 
 * PlanBookmarkContext 구독 컴포넌트 목록
 * - PlanBookmarkContainer
 * - AreaBookmarkButton
 * - ScheduleDroppableItem
 =============================================== */

const PlanBookmarkContext = createContext(null);

export const PlanBookmarkProvider = ({ children }) => {
  // 북마크 데이터
  const [bookmarks, setBookmarks] = useState([]);

  const getBookmark = useCallback((id) => {
    return bookmarks.find(bookmark => bookmark.bookmarkId === id);
  }, [bookmarks]);

  const getBookmarkType = useCallback((id) => {
    const findBookmark = bookmarks.find(bookmark => bookmark.bookmarkId === id || bookmark.placeId === id || bookmark.areaId === id);
    return findBookmark? findBookmark.bookmarkType : "NONE";
  }, [bookmarks]);

  const deleteBookmark = useCallback((bookmarkId) => {
    setBookmarks((prev) => {
      return prev.filter(bookmark => bookmark.bookmarkId !== bookmarkId);
    });
  }, []);

  const setLinkedCountBookmark = useCallback((bookmarkId, changeCount) => {
    console.log("LC: ", bookmarkId);
    setBookmarks((prev) => {
      return prev.map(bookmark => bookmark.bookmarkId === bookmarkId ? 
        {...bookmark, linkedCount: Math.max((bookmark.linkedCount == null ? changeCount : bookmark.linkedCount + changeCount), 0) } 
        : bookmark);
    })
  }, []);

  const planBookmarkValue = useMemo(() => ({
    bookmarks, setBookmarks, getBookmark, getBookmarkType, deleteBookmark, setLinkedCountBookmark
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