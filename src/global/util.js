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

export const getFetchData = (url, options) => {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log("fetch", data)
      resolve(data);
    } catch (e) {
      alert(e);
      console.error(e);
    }
  })
}