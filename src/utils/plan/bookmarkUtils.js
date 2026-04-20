import { BOOKMARK_COLOR } from '../../Constants/bookmarkColor';

export const getBookmarkColor = (type) => {
  switch (type) {
    case "RED": 
      return BOOKMARK_COLOR.RED.bg;
    case "YELLOW":
      return BOOKMARK_COLOR.YELLOW.bg;
    case "GREEN":
      return BOOKMARK_COLOR.GREEN.bg;
    case "BLUE":
      return BOOKMARK_COLOR.BLUE.bg;
    case "PURPLE":
      return BOOKMARK_COLOR.PURPLE.bg;
    default:
      return "#A8A8A8";
  }
}

export const getBookmarkActiveColor = (type) => {
  switch (type) {
    case "RED": 
      return BOOKMARK_COLOR.RED.color;
    case "YELLOW":
      return BOOKMARK_COLOR.YELLOW.color;
    case "GREEN":
      return BOOKMARK_COLOR.GREEN.color;
    case "BLUE":
      return BOOKMARK_COLOR.BLUE.color;
    case "PURPLE":
      return BOOKMARK_COLOR.PURPLE.color;
    default:
      return "#A8A8A8";
  }
}