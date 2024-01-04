exports.fetchWrapper = (url) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 3000);
  return fetch(url, { signal: controller.signal });
};
