export const handleFileChange = (e,setImages) => {
    const newFiles = Array.from(e.target.files);

    setImages((prev) => {
      const existingKeys = new Set(
        prev.map((f) => f.lastModified + "-" + f.size)
      );

      const filtered = newFiles.filter(
        (file) => !existingKeys.has(file.lastModified + "-" + file.size)
      );

      return [...prev, ...filtered];
    });
  };