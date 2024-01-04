exports.isMessageExpired = (date) => {
  const DateNow = Math.floor(Date.now() / 1000);
  return DateNow - date > 5 ? true : false;
};
