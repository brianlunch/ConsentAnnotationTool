function setScreenshotUrl(img,url) {
  document.getElementById('target').src = img;
  document.getElementById('target2').src = img;
  document.getElementById('url').innerText = url;
  document.getElementById('url').href = url;
  document.getElementById('time').innerText = new Date();
  console.log("ye");
}
