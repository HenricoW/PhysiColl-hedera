export const uploadImages = async (imgFiles: File[], verifImg: File | undefined) => {
  if (!verifImg) {
    console.log("upload fn: no verification image");
    return;
  }
  if (imgFiles.length < 1) {
    console.log("upload fn: empty image list");
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < imgFiles.length; i++) {
    formData.append("image-" + i, imgFiles[i], imgFiles[i].name);
  }
  if (verifImg) formData.append("image-v", verifImg, verifImg.name);

  const resp = await fetch("/api/uploadimages", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  console.log("client resp: ", resp);
};
