const getSimilarAds = () =>
  fetch('https://25.javascript.pages.academy/keksobooking/data');

const pushNewAd = (form) => {
  const result = fetch('https://25.javascript.pages.academy/keksobooking/data', {
    method: 'POST',
    body: new FormData(form),
  });
  return result;
};

export const server = { getSimilarAds, pushNewAd };
