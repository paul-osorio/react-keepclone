export const useConvertDatetoTime = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const useCalculate24hours = (then) => {
  const now = new Date();
  const msBetweenDates = Math.abs(then.getTime() - now.getTime());
  const hoursBetweenDate = msBetweenDates / (60 * 60 * 1000);

  if (hoursBetweenDate > 48) {
    const timestampdate = then.toLocaleDateString("en-us", {
      month: "long",
      day: "numeric",
    });
    return timestampdate;
  } else if (hoursBetweenDate > 24) {
    const timestamp = useConvertDatetoTime(then);
    const finaltime = "yesterday " + timestamp;
    return finaltime;
  } else {
    const timestamp = useConvertDatetoTime(then);
    return timestamp;
  }
};
