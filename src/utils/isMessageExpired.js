const EXPIRED_MESSAGE_THRESHOLD_IN_SECONDS = 5;

export const isMessageExpired = (date) => {
  const DateNow = Math.floor(Date.now() / 1000);
  return DateNow - date > EXPIRED_MESSAGE_THRESHOLD_IN_SECONDS ? true : false;
};
