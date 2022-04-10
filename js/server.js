export const getSimilarAds = () =>
  fetch('https://25.javascript.pages.academy/keksobooking/data');

export const pushNewAd = (form) => {
  const result = fetch('https://25.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: new FormData(form),
  });
  return result;
};
