document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    console.log("Hello World!");
    document.body.style.border = "15px solid red";
    const sessionToken = window.TMGLiveVideo.Session.getSessionToken()
    console.log("sessionToken: ", sessionToken)

  },5000)
});
console.log("Hello World!");
document.body.style.border = "15px solid red";
console.log(window)
const sessionToken = window.TMGLiveVideo.Session.getSessionToken()
console.log("sessionToken: ", sessionToken)
