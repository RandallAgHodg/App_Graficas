const tabs = document.querySelector(".wrapper");
const tabButton = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".content");
const nav = document.querySelector(".links-container");
const burger = document.querySelector(".burger");
const links = document.querySelectorAll(".nav-links a");
const formOpenBtn = document.querySelector(".hero-section-content img");
const formCloseBtn = document.querySelector(".close-support-form");
const formCameraBtn = document.querySelector("#camera-btn");
const video = document.querySelector("#video");
const canvas = document.querySelector("#video-canvas");
const context = canvas.getContext("2d");
const formRemember = document.querySelector("#rememberForm");
const supportForm = document.querySelector(".chat-form");

class UI {
  enableWebCam() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("nyaa");
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObj = stream;
        video.play();
      });
    }
  }

  printAlert(type, message) {
    const messageContainer = document.createElement("h1");
    messageContainer.classList.add("alert");

    if (type === "error") messageContainer.style.backgroundColor = "crimson";
    else messageContainer.style.backgroundColor = "green";

    messageContainer.textContent = message;
    formRemember.appendChild(messageContainer);

    setTimeout(() => {
      messageContainer.remove();
    }, 3000);
  }
}

const uiControl = new UI();

formCameraBtn.addEventListener("click", () => {
  uiControl.enableWebCam();
});
formRemember?.addEventListener("submit", (e) => {
  e.preventDefault();

  uiControl.printAlert(
    "success",
    "Se han enviado los pasos correspondientes a la recuperación de cuenta a su correo "
  );
});

formOpenBtn.addEventListener("click", () => {
  supportForm.style.display = "block";
  formOpenBtn.style.display = "none";
});

formCloseBtn.addEventListener("click", () => {
  supportForm.style.display = "none";
  formOpenBtn.style.display = "block";
});
document.addEventListener("click", (e) => {
  console.log(e.target);
});

burger.addEventListener("click", () => {
  nav.classList.toggle("nav-open");
  burger.classList.toggle("toggle");
  burger.classList.toggle("border-none");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    burger.classList.toggle("toggle");
  });
});

tabs.onclick = (e) => {
  const id = e.target.dataset.id;
  if (id) {
    tabButton.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");

    contents.forEach((content) => {
      content.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
};
