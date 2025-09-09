async function urlToFile(url, filename) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

async function useUrlsToFiles(urls) {
  const promises = urls.map((url) => {
    const skipLen = url.slice(71, url.length);
    return urlToFile(url, skipLen);
  });
  return Promise.all(promises).then((files) => {
    console.log("the images are here loaded : ", files);
    return files;
  });
}

export default useUrlsToFiles;
