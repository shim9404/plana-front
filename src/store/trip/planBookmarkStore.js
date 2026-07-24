import { create } from "zustand";

/** === 북마크 ==================================== 
 * planBookmarkStore 구독 컴포넌트 목록
 * - PlanBookmarkContainer
 * - AreaBookmarkButton
 * - ScheduleDroppableItem
 =============================================== */

const planBookmarkStore = create((set, get) => ({
  // 북마크 데이터
  bookmarks: [],
  setBookmarks: (value) => {
    if (typeof value === "function") {
      set((state) => ({
        bookmarks: value(state.bookmarks)
      }));
    } else {
      set({
        bookmarks: value
      });
    }
  },

  getBookmark: (id) => {
    const { bookmarks } = get();
    return bookmarks.find(bookmark => bookmark.bookmarkId === id);
  },

  getBookmarkType: (id) => {
    const { bookmarks } = get();
    const findBookmark = bookmarks.find(bookmark => bookmark.bookmarkId === id || bookmark.placeId === id || bookmark.areaId === id);
    return findBookmark? findBookmark.bookmarkType: "NONE";
  },

  deleteBookmark: (bookmarkId) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter(bookmark => bookmark.bookmarkId !== bookmarkId)
    }));
  },

  setLinkedCountBookmark: (bookmarkId, changeCount) => {
    set((state) => ({
      bookmarks: state.bookmarks.map(bookmark => bookmark.bookmarkId === bookmarkId ? 
        {...bookmark, linkedCount: Math.max((bookmark.linkedCount == null ? changeCount : bookmark.linkedCount + changeCount), 0)}
          : bookmark)
    }));
  }
}));

export default planBookmarkStore;