export function useNoteColor(color) {
  switch (color) {
    case "red":
      return "#F28B82";
    case "orange":
      return "#FBBC04";
    case "yellow":
      return "#FFF475";
    case "green":
      return "#CCFF90";
    case "teal":
      return "#A7FFEB";
    case "blue":
      return "#CBF0F8";
    case "darkblue":
      return "#AECBFA";
    case "purple":
      return "#D7AEFB";
    case "pink":
      return "#FDCFE8";
    case "brown":
      return "#E6C9A8";
    case "gray":
      return "#E8EAED";
    default:
      return "white";
  }
}
