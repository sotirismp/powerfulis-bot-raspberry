exports.fetchWrapper = (url, timeout = 3000) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return fetch(url, { signal: controller.signal });
};
