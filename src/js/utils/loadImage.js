function lazyLoadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      resolve(img.src);
    };
    img.onerror = (e) => {
      reject(e);
    };
  });
}

export default lazyLoadImage;
