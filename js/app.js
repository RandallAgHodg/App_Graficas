let tabs;
let tabButton;
let contents;
let nav;
let burger;
let links;
let formOpenBtn;
let formCloseBtn;
let formCameraBtn;
let formRemember;
let supportForm;

document.addEventListener("DOMContentLoaded", () => {
  console.log(
    window.location.pathname.substring(0, 6),
    window.location.pathname
  );
  const uiControl = new UI();
  if (window.location.pathname.substring(0, 6) !== "/admin") {
    nav = document.querySelector(".links-container");
    burger = document.querySelector(".burger");
    links = document.querySelectorAll(".nav-links a");

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

    uiControl.toggleFooter();

    var map = L.map("map").setView([12.12976, -86.26684], 16);

    var tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(map);

    var marker = L.marker([12.12976, -86.26684]).addTo(map);
  }

  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/houses.html" ||
    window.location.pathname === "/apartments.html"
  ) {
    const houses = document.querySelectorAll(".houses-section-house-card");
    houses.forEach((house) => {
      house.addEventListener("click", () => {
        location.href = "/detailHouse.html";
      });
    });
  }

  switch (window.location.pathname) {
    case "/":
    case "/index.html":
    case "/index.html":
      uiControl.configureBackgroundHeroImage();
      uiControl.configureCarousel();
      let video;
      let canvas;
      let context;
      formOpenBtn = document.querySelector(".hero-section-content img");
      formCloseBtn = document.querySelector(".close-support-form");
      formCameraBtn = document.querySelector("#camera-btn");
      supportForm = document.querySelector(".chat-form");

      formCameraBtn.addEventListener("click", () => {
        uiControl.enableWebCam();
      });

      formOpenBtn.addEventListener("click", () => {
        supportForm.style.display = "block";
        formOpenBtn.style.display = "none";
        video = document.querySelector("#video");
        canvas = document.querySelector("#video-canvas");
        context = canvas.getContext("2d");
      });

      formCloseBtn.addEventListener("click", () => {
        supportForm.style.display = "none";
        formOpenBtn.style.display = "block";
        uiControl.closeWebCam();
      });
      break;

    case "/contact.html":
      tabs = document.querySelector(".wrapper");
      tabButton = document.querySelectorAll(".tab-button");
      contents = document.querySelectorAll(".content");

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

      break;

    case "/detailHouse.html":
      var map = L.map("house-map").setView([12.12976, -86.26684], 16);

      var tiles = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      ).addTo(map);

      var marker = L.marker([12.12976, -86.26684]).addTo(map);

      const videoDetail = document.querySelector(".house-video");
      const btnPlay = document.querySelector("#pauseBtn");
      const stopBtn = document.querySelector("#stopBtn");
      const previousBtn = document.querySelector("#previousBtn");
      const advanceBtn = document.querySelector("#advanceBtn");

      stopBtn.addEventListener("click", () => {
        videoDetail.pause();
        videoDetail.currentTime = 0;
      });

      btnPlay.addEventListener("click", () => {
        if (videoDetail.paused) videoDetail.play();
        else videoDetail.pause();
      });

      previousBtn.addEventListener("click", () => {
        videoDetail.currentTime -= 5;
      });

      advanceBtn.addEventListener("click", () => {
        videoDetail.currentTime += 5;
      });

      break;
    case "/adminRemember.html":
    case "/adminremember":
      formRemember = document.querySelector("#rememberForm");

      formRemember.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!document.querySelector(".alert")) {
          uiControl.printAlert(
            "success",
            "Se han enviado los pasos correspondientes a la recuperación de cuenta a su correo "
          );
        }
      });
      break;
    case "/adminMain.html":
    case "/adminMain":
      uiControl.toggleSideMenu();
      setInterval(() => {
        document
          .getElementById("MyClockDisplay")
          .addEventListener("onload", uiControl.showTime());
      }, 1000);
    default:
      break;
  }
});

class UI {
  constructor() {
    this.cameraStream = null;
  }

  enableWebCam() {
    const mediaSupport = "mediaDevices" in navigator;
    if (mediaSupport && null === this.cameraStream) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          this.cameraStream = mediaStream;
          video.srcObject = mediaStream;
          video.play();
        })
        .catch(function (err) {
          console.log("unable to access camera: " + err);
        });
    } else {
      alert("Su navegador no soporta el dispositivo de camara.");
      return;
    }
  }

  closeWebCam() {
    if (null !== this.cameraStream) {
      this.cameraStream.getTracks().forEach((track) => {
        track.stop();
        video.load();
      });

      this.cameraStream = null;
    }
  }

  configureBackgroundHeroImage() {
    const imageHero = document.querySelector(".mask");

    let i = 0;
    let tiempo = 600;

    const imagenes = ["arriba2.jpg", "arriba.jpg"];

    setInterval(() => {
      imageHero.style.backgroundPositionY = `-${tiempo}px`;
      if (tiempo > 40) {
        tiempo = 0;
        imageHero.style.backgroundImage = `url(../imgs/${imagenes[i]})`;

        if (i === imagenes.length - 1) {
          i = 0;
        } else {
          i++;
        }
      } else {
        tiempo++;
      }
    }, 100);
  }

  configureCarousel() {
    var carousel = document.querySelector(".carousel");
    var carouselContent = document.querySelector(".carousel-content");
    var slides = document.querySelectorAll(".slide");
    var arrayOfSlides = Array.prototype.slice.call(slides);
    var carouselDisplaying;
    var screenSize;
    setScreenSize();
    var lengthOfSlide;

    function addClone() {
      var lastSlide = carouselContent.lastElementChild.cloneNode(true);
      lastSlide.style.left = -lengthOfSlide + "px";
      carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
    }
    // addClone();

    function removeClone() {
      var firstSlide = carouselContent.firstElementChild;
      firstSlide.parentNode.removeChild(firstSlide);
    }

    function moveSlidesRight() {
      var slides = document.querySelectorAll(".slide");
      var slidesArray = Array.prototype.slice.call(slides);
      var width = 0;

      slidesArray.forEach(function (el, i) {
        el.style.left = width + "px";
        width += lengthOfSlide;
      });
      addClone();
    }
    moveSlidesRight();

    function moveSlidesLeft() {
      var slides = document.querySelectorAll(".slide");
      var slidesArray = Array.prototype.slice.call(slides);
      slidesArray = slidesArray.reverse();
      var maxWidth = (slidesArray.length - 1) * lengthOfSlide;

      slidesArray.forEach(function (el, i) {
        maxWidth -= lengthOfSlide;
        el.style.left = maxWidth + "px";
      });
    }

    window.addEventListener("resize", setScreenSize);

    function setScreenSize() {
      if (window.innerWidth >= 1020) {
        carouselDisplaying = 3;
      } else {
        carouselDisplaying = 1;
      }
      getScreenSize();
    }

    function getScreenSize() {
      var slides = document.querySelectorAll(".slide");
      var slidesArray = Array.prototype.slice.call(slides);
      lengthOfSlide = carousel.offsetWidth / carouselDisplaying;
      var initialWidth = -lengthOfSlide;
      slidesArray.forEach(function (el) {
        el.style.left = initialWidth + "px";
        initialWidth += lengthOfSlide;
      });
    }

    var rightNav = document.querySelector(".nav-right");
    rightNav.addEventListener("click", moveLeft);

    var moving = true;
    function moveRight() {
      if (moving) {
        moving = false;
        var lastSlide = carouselContent.lastElementChild;
        lastSlide.parentNode.removeChild(lastSlide);
        carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
        removeClone();
        var firstSlide = carouselContent.firstElementChild;
        firstSlide.addEventListener("transitionend", activateAgain);
        moveSlidesRight();
      }
    }

    function activateAgain() {
      var firstSlide = carouselContent.firstElementChild;
      moving = true;
      firstSlide.removeEventListener("transitionend", activateAgain);
    }

    var leftNav = document.querySelector(".nav-left");
    leftNav.addEventListener("click", moveRight);

    // var moveLeftAgain = true;

    function moveLeft() {
      if (moving) {
        moving = false;
        removeClone();
        var firstSlide = carouselContent.firstElementChild;
        firstSlide.addEventListener("transitionend", replaceToEnd);
        moveSlidesLeft();
      }
    }

    function replaceToEnd() {
      var firstSlide = carouselContent.firstElementChild;
      firstSlide.parentNode.removeChild(firstSlide);
      carouselContent.appendChild(firstSlide);
      firstSlide.style.left = (arrayOfSlides.length - 1) * lengthOfSlide + "px";
      addClone();
      moving = true;
      firstSlide.removeEventListener("transitionend", replaceToEnd);
    }

    carouselContent.addEventListener("mousedown", seeMovement);

    var initialX;
    var initialPos;
    function seeMovement(e) {
      initialX = e.clientX;
      getInitialPos();
      carouselContent.addEventListener("mousemove", slightMove);
      document.addEventListener("mouseup", moveBasedOnMouse);
    }

    function slightMove(e) {
      if (moving) {
        var movingX = e.clientX;
        var difference = initialX - movingX;
        if (Math.abs(difference) < lengthOfSlide / 4) {
          slightMoveSlides(difference);
        }
      }
    }

    function getInitialPos() {
      var slides = document.querySelectorAll(".slide");
      var slidesArray = Array.prototype.slice.call(slides);
      initialPos = [];
      slidesArray.forEach(function (el) {
        var left = Math.floor(parseInt(el.style.left.slice(0, -2)));
        initialPos.push(left);
      });
    }

    function slightMoveSlides(newX) {
      var slides = document.querySelectorAll(".slide");
      var slidesArray = Array.prototype.slice.call(slides);
      slidesArray.forEach(function (el, i) {
        var oldLeft = initialPos[i];
        el.style.left = oldLeft + newX + "px";
      });
    }

    function moveBasedOnMouse(e) {
      var finalX = e.clientX;
      if (initialX - finalX > 0) {
        moveRight();
      } else if (initialX - finalX < 0) {
        moveLeft();
      }
      document.removeEventListener("mouseup", moveBasedOnMouse);
      carouselContent.removeEventListener("mousemove", slightMove);
    }
  }

  toggleFooter() {
    const btnFlotante = document.querySelector(".info-button");
    if (btnFlotante) {
      btnFlotante.addEventListener("click", (e) => {
        e.preventDefault();

        const footer = document.querySelector(".footer-container");

        if (footer.classList.contains("activo")) {
          footer.classList.remove("activo");
          btnFlotante.classList.remove("activo");
          btnFlotante.innerText = "Mas información";
        } else {
          footer.classList.add("activo");
          btnFlotante.classList.add("activo");
          btnFlotante.innerText = "X cerrar";
        }
      });
    }
  }

  toggleSideMenu() {
    const menuIzquierdo = document.querySelector(".menu-izquierdo");

    menuIzquierdo.addEventListener("click", (e) => {
      const claseMenu = e.target.classList;

      // Selecciona el contenedor
      const contenedor = document.querySelector(".pagina"),
        flechaIzq = document.querySelector(".fa-arrow-left"),
        flechaDer = document.querySelector(".fa-arrow-right");

      if (claseMenu.contains("fa-arrow-left")) {
        // cerrar el menú lateral
        contenedor.classList.add("no-menu");
        e.target.style.display = "none";
        flechaDer.style.display = "block";
      } else if (claseMenu.contains("fa-arrow-right")) {
        contenedor.classList.remove("no-menu");
        e.target.style.display = "none";
        flechaIzq.style.display = "block";
      }
    });
  }

  showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";

    if (h == 0) {
      h = 12;
    }

    if (h > 12) {
      h = h - 12;
      session = "PM";
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 1000);
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

document.addEventListener("click", (e) => {
  console.log(e.target);
});
