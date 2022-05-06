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

  try {
    const resp = await fetch("/api/uploadimages", {
      method: "POST",
      body: formData,
    });

    if (resp.status >= 400) {
      console.log(`Request error code: ${resp.status} (${resp.statusText}): ${(await resp.json()).message}`);
    } else {
      console.log("Images uploaded successfully");
    }
  } catch (err) {
    console.log(err);
  }
};
