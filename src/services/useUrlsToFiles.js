async function urlToFile(url, filename) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  } catch (err) {
    console.error(err);
  }
}

async function useUrlsToFiles(urls) {
  try {
    const promises = urls.map((url) => {
      const skipLen = url.slice(71, url.length);
      return urlToFile(url, skipLen);
    });
    return Promise.all(promises).then((files) => {
      return files;
    });
  } catch (err) {
    console.error(err);
  }
}

export default useUrlsToFiles;
