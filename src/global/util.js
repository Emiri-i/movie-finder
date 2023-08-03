export const formatNumber = (number) => {
  let formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
  });
  let formattedNumber = formatter.format(number);
  return formattedNumber;
}

export const getYear = (dt) => {
  return dt.substr(0, dt.indexOf("-"));
}