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
          alert("unable to access camera: " + err);
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

  openCardInfo(isAdmin) {
    const card = document.querySelectorAll(".house-card");
    card.forEach((card) => {
      card.addEventListener("click", () => {
        const isVideo = document.querySelector(".video-container");
        const isButtons = document.querySelector(".action-btns-container");
        if (isVideo || isButtons) {
          isVideo.remove();
          isButtons.remove();
          return;
        }
        const videoContainer = document.createElement("div");
        const buttonsContainer = document.createElement("div");
        const video = document.createElement("video");
        const acceptBtn = document.createElement("button");
        const rejectBtn = document.createElement("button");
        video.src = "/videos/production ID_3770033.mp4";
        video.style.width = "100%";
        video.controls = true;
        video.play();
        videoContainer.classList.add("video-container");
        videoContainer.appendChild(video);
        buttonsContainer.classList.add("action-btns-container");
        buttonsContainer.appendChild(acceptBtn);
        buttonsContainer.appendChild(rejectBtn);
        if (isAdmin) {
          acceptBtn.innerText = "Editar";
          acceptBtn.classList.add("edit-btn");
          rejectBtn.innerText = "Dar de baja";
          acceptBtn.classList.add("reject-btn");
          acceptBtn.addEventListener("click", () => {
            location.href = "/adminEditProperty.html";
          });
        } else {
          acceptBtn.innerText = "Aceptar";
          rejectBtn.innerText = "rechazar";
        }
        acceptBtn.style.backgroundColor = "green";
        acceptBtn.classList.add("action-btn");
        rejectBtn.style.backgroundColor = "crimson";
        rejectBtn.classList.add("action-btn");
        card.appendChild(videoContainer);
        card.appendChild(buttonsContainer);
      });
    });
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

  createModal() {
    const body = document.querySelector("body");
    const modal = document.createElement("div");
    if (document.querySelector(".mask"))
      document.querySelector(".mask").style.filter = "blur(8px)";
    modal.classList.add("modal");
    body.appendChild(modal);

    modal.innerHTML = `
    <img
      id="close-modal-btn"
      src="imgs/iconmonstr-x-mark-thin-240.png"
      alt="Close icon"
    />
    <div class="houses-section-house-card">
      <img src="imgs/casa-humilde.jpg" alt="casa bonita" />
      <div class="houses-section-house-card-info">
        <div class="houses-section-house-card-content">
          <div class="houses-section-house-card-title">
            <div class="dot"></div>
            <h3>Casa Bonita</h3>
          </div>
          <h4>350m²</h4>
          <p>De la uca 1c arriba 1c abajo</p>
        </div>
        <div class="houses-section-house-card-state renta">
          <img src="imgs/ic_outline-sell.svg" alt="etiqueta icono" />
          <h3 class="renta">En renta</h3>
          <h4 class="house-card-state-discount">50%</h4>
        </div>
      </div>
    </div>
    <div class="countDown">
      <div class="column">
        <div id="Days" class="item">0</div>
        <div class="text" id="textDays">Dias</div>
      </div>

      <div class="column">
        <div id="Hours" class="item">0</div>
        <div class="text" id="textHours">Horas</div>
      </div>

      <div class="column">
        <div id="Minutes" class="item">0</div>
        <div class="text" id="textDays">Minutos</div>
      </div>
      <div class="column">
        <div id="Seconds" class="item">0</div>
        <div class="text" id="textDays">Segundos</div>
      </div>
    </div>
    <h1 class="discount-text">
      !!!!Adquiere esta casa en las colinas con un <span>50%</span> de
      descuento antes de que la oferta acabe!!!
    </h1>`;
    this.initCountDown();
  }

  closeModal() {
    const closeModalBtn = document.querySelector("#close-modal-btn");
    closeModalBtn.addEventListener("click", () => {
      document.querySelector(".modal").remove();
      document.querySelector(".mask").style.filter = "blur(0)";
      document
        .querySelector("body")
        .removeEventListener("wheel", this.preventScroll, {
          passive: false,
        });
    });
  }

  showAdvancedSearchFields() {
    const container = document.querySelector("#advanced-search-fields");
    const button = document.querySelector(".advanced-search-btn");
    button.addEventListener("click", () => {
      container.classList.toggle("advanced-search-fields");
    });
  }

  validateInputs() {
    const input = document.querySelectorAll(".address-field input");
    const textarea = document.querySelectorAll(".address-field textarea");
    input.forEach((element) => {
      element.addEventListener("change", (e) => {
        const label = e.target.nextElementSibling;
        if (e.target.value.length > 0) {
          label.style.outline = "none";
          label.style.fontSize = "0.6rem";
          label.style.top = "0.5rem";
        } else {
          label.style.fontSize = "1.7rem";
          label.style.top = "1.1rem";
        }
      });
    });

    textarea.forEach((element) => {
      element.addEventListener("change", (e) => {
        const label = e.target.nextElementSibling;
        if (e.target.value.length > 0) {
          label.style.outline = "none";
          label.style.fontSize = "0.6rem";
          label.style.top = "0.5rem";
        } else {
          label.style.fontSize = "1.7rem";
          label.style.top = "1.1rem";
        }
      });
    });

    const resetBtns = document.querySelectorAll("input[type=reset]");
    resetBtns.forEach((button) => {
      button.addEventListener("click", () => {
        input.forEach((element) => {
          const label = element.nextElementSibling;
          label.style.fontSize = "1.7rem";
          label.style.top = "1.1rem";
        });

        textarea.forEach((element) => {
          element.addEventListener("change", (e) => {
            const label = element.nextElementSibling;
            if (element.value.length > 0) {
              label.style.outline = "none";
              label.style.fontSize = "0.6rem";
              label.style.top = "0.5rem";
            } else {
              label.style.fontSize = "1.7rem";
              label.style.top = "1.1rem";
            }
          });
        });
      });
    });
  }

  initCountDown() {
    let date = new Date("Jul 5, 2022 12:00:00");

    let CountDay = document.getElementById("Days");
    let CountHour = document.getElementById("Hours");
    let CountMinutes = document.getElementById("Minutes");
    let CountSeconds = document.getElementById("Seconds");
    let Int = setInterval(UpdateTime, 1);

    function UpdateTime() {
      let Now = new Date().getTime();
      let distance = date - Now;

      CountDay.innerHTML = Math.floor(distance / (1000 * 60 * 60 * 24));

      CountHour.innerHTML = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      CountMinutes.innerHTML = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );

      CountSeconds.innerHTML = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(Int);
        document.getElementById("Days").innerHTML = "this";
        document.getElementById("Hours").innerHTML = "pen";
        document.getElementById("Minutes").innerHTML = "is";
        document.getElementById("Seconds").innerHTML = "Exp";
      }
    }
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
      if (window.innerWidth > 1024) {
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

  configuereNumberInputs() {
    /*
     *
     * Custom quantity input
     * Element requires following HTML structure
     * <div class="quantity"><input type="number"/></div>
     *
     *
     */

    function quantityInput(element, options) {
      const spinner = element;

      const defaultOptions = {
        min: 1,
        max: 250,
        value: 1,
      };

      options = Object.assign({}, defaultOptions, options);

      const obj = {
        input: spinner.querySelector('input[type="number"]'),
        init() {
          this.setup();
          this.events();
          return this;
        },
        setup() {
          this.input.value = options.value;
          this.max = options.max;
          this.min = options.min;

          const qNav = document.createElement("div");
          const qUp = document.createElement("div");
          const qDown = document.createElement("div");

          qNav.setAttribute("class", "quantity-nav");
          qUp.setAttribute("class", "quantity-button quantity-button--up");
          qDown.setAttribute("class", "quantity-button quantity-button--down");

          qUp.innerHTML = "+";
          qDown.innerHTML = "-";
          qNav.appendChild(qUp);
          qNav.appendChild(qDown);
          spinner.appendChild(qNav);

          this.btnUp = spinner.querySelector(".quantity-button--up");
          this.btnDown = spinner.querySelector(".quantity-button--down");
        },
        trigger() {
          const event = document.createEvent("HTMLEvents");
          event.initEvent("change", true, false);
          return event;
        },
        events() {
          this.btnUp.addEventListener("click", () => {
            const oldValue = parseFloat(this.input.value);
            let newVal;
            if (oldValue >= this.max) {
              newVal = oldValue;
            } else {
              newVal = oldValue + 1;
            }
            this.input.value = newVal;
            this.input.dispatchEvent(this.trigger());
          });

          this.btnDown.addEventListener("click", () => {
            const oldValue = parseFloat(this.input.value);
            let newVal;
            if (oldValue <= this.min) {
              newVal = oldValue;
            } else {
              newVal = oldValue - 1;
            }
            this.input.value = newVal;
            this.input.dispatchEvent(this.trigger());
          });
          this.input.addEventListener("change", () => {
            if (parseInt(this.input.value, 16) < this.min) {
              this.input.value = this.min;
            }
            if (parseInt(this.input.value, 16) > this.max) {
              this.input.value = this.max;
            }
          });
        },
      };
      return obj.init();
    }

    const numberInputs = document.querySelectorAll(".quantity");

    if (numberInputs.length > 0) {
      numberInputs.forEach((el, index) => {
        quantityInput(el, {
          min: 0,
          max: 4,
          value: 0,
        });
      });
    }
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

    setTimeout(this.showTime, 1000);
  }

  preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();

    return false;
  }

  printAlert(type, message, formParent) {
    if (document.querySelector(".alert")) return;
    const messageContainer = document.createElement("h1");
    messageContainer.classList.add("alert");

    if (type === "error") messageContainer.style.backgroundColor = "crimson";
    else messageContainer.style.backgroundColor = "green";

    messageContainer.textContent = message;
    formParent.appendChild(messageContainer);

    setTimeout(() => {
      messageContainer.remove();
    }, 3000);
  }
}

const uiControl = new UI();

document.addEventListener("DOMContentLoaded", () => {
  const uiControl = new UI();
  window.moveTo(0, 0);
  if (document.querySelector(".address-field input"))
    uiControl.validateInputs();

  if (window.location.pathname.substring(0, 6) !== "/admin") {
    if (window.innerWidth > 1024) {
      const visit = localStorage.getItem("visit");
      if (!visit) {
        uiControl.createModal();
        uiControl.closeModal();
        localStorage.setItem("visit", 1);
        document
          .querySelector("body")
          .addEventListener("wheel", uiControl.preventScroll, {
            passive: false,
          });
      } else {
        setInterval(() => {
          if (document.querySelector(".modal")) return;
          uiControl.createModal();
          document
            .querySelector("body")
            .addEventListener("wheel", uiControl.preventScroll, {
              passive: false,
            });
          uiControl.closeModal();
        }, 10800000);
      }
    }
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

  if (document.querySelector(".quantity")) uiControl.configuereNumberInputs();

  switch (window.location.pathname) {
    case "/":
    case "/index.html":
    case "/index.html":
      uiControl.configureBackgroundHeroImage();
      uiControl.configureCarousel();
      document
        .querySelector(".hero-section-button")
        .addEventListener("click", () => {
          location.href = "./contact.html";
        });
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

    case "/houses.html":
    case "/houses":
    case "/apartments.html":
    case "/apartments":
      uiControl.showAdvancedSearchFields();
      document.querySelector(".submit-btn").addEventListener("click", (e) => {
        if (document.querySelector("#search").value === "") {
          e.preventDefault();

          uiControl.printAlert(
            "error",
            "Formulario inválido",
            document.querySelector("#search-form")
          );
        }
      });
      break;

    case "/contact.html":
      tabs = document.querySelector(".wrapper");
      tabButton = document.querySelectorAll(".tab-button");
      contents = document.querySelectorAll(".content");
      const labels = document.querySelectorAll("label");
      const resetButtons = document.querySelectorAll("input[type=reset]");
      const textInput = document.querySelectorAll("input[type=text]");
      const textArea = document.querySelectorAll("textarea");
      resetButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          labels.forEach((input) => {
            input.style = "";
          });
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

      break;

    case "/detailHouse.html":
    case "/detailHouse":
    case "/detailHouse.html".toLowerCase():
    case "/detailHouse".toLowerCase():
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
    case "/adminlogin":
    case "/adminLogin.html":
      document
        .querySelector("#registerForm input[type=submit]")
        .addEventListener("click", (e) => {
          e.preventDefault();
          location.href = "adminMain.html";
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
            "Se han enviado los pasos correspondientes a la recuperación de cuenta a su correo ",
            formRemember
          );
        }
      });
      break;
    case "/adminMain.html":
    case "/adminMain":
    case "/adminMain.html".toLowerCase():
    case "/adminMain".toLowerCase():
      uiControl.toggleSideMenu();
      setInterval(() => {
        document
          .getElementById("MyClockDisplay")
          .addEventListener("onload", uiControl.showTime());
      }, 1000);
      break;
    case "/adminAddHouses.html":
    case "/adminaddhouses":
    case "/adminAddApartments.html":
    case "/adminaddapartments":
    case "/adminCrudHouses.html":
    case "/admincrudhouses":
    case "/adminCrudApartments.html":
    case "/admincrudapartments":
      uiControl.toggleSideMenu();
      uiControl.openCardInfo(
        window.location.pathname === "/admincrudhouses" ||
          window.location.pathname === "/adminCrudHouses.html" ||
          window.location.pathname === "/admincrudapartments" ||
          window.location.pathname === "/adminCrudApartments.html"
      );
      if (document.querySelector("#state"))
        document.querySelector("#state").addEventListener("click", () => {
          return false;
        });
      break;
    default:
      break;
  }
});

document.addEventListener("click", (e) => {
  const ui = new UI();
  if (document.querySelector(".modal")) {
    if (
      e.target?.classList.contains("modal") ||
      e.target?.parentNode.classList.contains("modal") ||
      e.target?.parentNode.parentNode.parentNode.classList.contains("modal")
    ) {
      return;
    }
    const modal = document.querySelector(".modal");
    modal.remove();
    document.querySelector(".mask").style.filter = "blur(0px)";
    document
      .querySelector("body")
      .removeEventListener("wheel", ui.preventScroll, {
        passive: false,
      });
  }
});
