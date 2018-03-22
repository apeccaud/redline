export const handleError = (reject, err) => {
  if (err.status === 401) {
    const authUrl = err.response.body.authUrl;
    window.location.replace(
      `${authUrl}?redirect=${encodeURIComponent(document.location.href)}`
    );
  }
  return reject(err);
};
