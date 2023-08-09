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

export const getFetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (e) {
    alert(e);
    console.error(e);
  }
}