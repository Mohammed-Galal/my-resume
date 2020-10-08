window.onload = function () {
  $("#ftco-loader")
    .css({ opacity: "0" })
    .on("transitionend", function () {
      this.remove();
    });
};

/*===================   navbar opacity   ====================*/
const body = $("body").style,
  screenHeight = window.innerHeight;

updateScroll = () => body.setProperty("--currentScroll", $("main").scrollTop);

body.setProperty("--SH", screenHeight);
body.setProperty("--currentScroll", $("main").scrollTop);

$("main").onscroll = updateScroll;

/*===================   words animation   ====================*/
const el = $("#text-break"),
  words = [
    "full-stack web developer",
    "front-end web developer",
    "back-end web developer",
  ];

var wordIndex = 0,
  effectDuration = 600,
  width = 0;

function updateContent() {
  wordIndex !== words.length - 1 ? wordIndex++ : (wordIndex = 0);
  el.innerHTML = words[wordIndex];

  setTimeout(expand, 5);
}

function expand() {
  el.animate([{ width: "0px" }, { width: el.scrollWidth + 10 + "px" }], {
    duration: effectDuration,
    easing: "ease-in-out",
    fill: "forwards",
  });

  setTimeout(collapse, 2500);
}

function collapse() {
  el.animate([{ width: el.scrollWidth + "px" }, { width: "0px" }], {
    duration: effectDuration,
    easing: "ease-in-out",
    fill: "forwards",
  });

  setTimeout(updateContent, effectDuration);
}

updateContent();
/*===============    SCROLBUTTON    =======================*/
/** @navBar */
const Nav = $("nav.navbar .navbar-nav");
$$("section").forEach((el) => {
  Nav.insertAdjacentHTML(
    "beforeend",
    `
<li class="nav-item">
  <a class="nav-link" scroll-to="#${el.id}">${el.id}</a>
</li>
`
  );
});

const ISO = new IntersectionObserver(
  (entries, observe) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $("nav").has("a.nav-link.active") &&
          $("a.nav-link.active").removeClass("active");
        $(`a.nav-link[scroll-to="#${entry.target.id}"]`).addClass("active");
      }
    });
  },
  {
    root: $("main"),
    rootMargin: "0px",
    threshold: 0.7,
  }
);
$$("section").forEach(($) => {
  ISO.observe($);
});

$$("[scroll-to]").on("click", function () {
  $("main").scrollTop = $(this.attr("scroll-to")["scroll-to"]).offsetTop;
});

/*** @Carousel */
const carouselInner = $(".bs-carousel-is-sucks > .carousel-inner");
fetch(
  "https://raw.githubusercontent.com/Mohammed-Galal/my-projects-json/master/projects.json"
)
  .then((D) => D.json())
  .then(($) => {
    $.forEach((ele) => {
      carouselInner.insertAdjacentHTML(
        "beforeend",
        `
      <div class="item">
        <img src="${ele.img}" />
        <div>
        <a href="${ele.link}" target="blank">
        ${ele.name}
        </a>
        </div>
        </div>
      `
      );
    });
  })
  .then(() => {
    let current = 0;
    const CIC = carouselInner.children.length;

    $(".bs-carousel-is-sucks .length").innerText = CIC;
    updateUI = function () {
      $(".bs-carousel-is-sucks .current").innerText = current + 1;
    };

    $(".bs-carousel-is-sucks .prev").on("click", function () {
      if (current === 0) {
        current = CIC - 1;
      } else {
        current--;
      }

      $(".bs-carousel-is-sucks > .carousel-inner > .item:first-child").css({
        "margin-left": current * -100 + "%",
      });

      updateUI();
      return false;
    });

    $(".bs-carousel-is-sucks .next").on("click", function () {
      if (current === CIC - 1) {
        current = 0;
      } else {
        current++;
      }

      $(".bs-carousel-is-sucks > .carousel-inner > .item:first-child").css({
        "margin-left": current * -100 + "%",
      });

      updateUI();
      return false;
    });
  });
